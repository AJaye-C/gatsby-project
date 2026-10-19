// Data-driven blog helpers. Every helper takes the `posts` array (already passed through
// normalizePost) instead of importing static data.

export const POSTS_PER_PAGE = 9;
export const RELATED_POSTS_LIMIT = 8;
export const FEATURED_POSTS_LIMIT = 5;

const DEFAULT_AUTHOR = "Pocket Creatives";
// WordPress author names that should show the default author instead.
const GENERIC_AUTHORS = ["admin"];

const NAMED_ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…",
  ndash: "–", mdash: "—", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
};

// WPGraphQL returns titles / term names HTML-encoded ("What&#8217;s", "Food &amp; Drink").
export const decodeEntities = (text = "") =>
  String(text).replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] === "#") {
      const code = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      return Number.isFinite(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
    }
    return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
  });

// "company" (all lowercase in WordPress) -> "Company". Names with any capital are left alone.
const tidyCategoryName = (name) => {
  const decoded = decodeEntities(name).trim();
  return decoded === decoded.toLowerCase() ? decoded.charAt(0).toUpperCase() + decoded.slice(1) : decoded;
};

// WPGraphQL node -> the post shape the blog components use.
export const normalizePost = (node) => {
  const categoryItems = (node.categories?.nodes || [])
    .filter((category) => category?.slug)
    .map((category) => ({ key: category.slug, label: tidyCategoryName(category.name || category.slug) }));
  const authorName = node.author?.node?.name?.trim();

  return {
    id: node.id,
    slug: node.slug,
    title: decodeEntities(node.title || ""),
    date: node.date ? node.date.slice(0, 10) : "", // YYYY-MM-DD, what the date helpers expect
    sortKey: node.date || "", // full timestamp, so posts on the same day keep their order
    author: authorName && !GENERIC_AUTHORS.includes(authorName.toLowerCase()) ? authorName : DEFAULT_AUTHOR,
    image: node.featuredImage?.node?.mediaItemUrl || "",
    categories: categoryItems.map((category) => category.key),
    categoryItems,
    sticky: Boolean(node.isSticky),
  };
};

export const formatBlogDate = (date) => {
  if (!date) return "";

  const parsedDate = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) return "";

  const day = parsedDate.getDate();
  const suffix = day >= 11 && day <= 13 ? "TH" : ({ 1: "ST", 2: "ND", 3: "RD" }[day % 10] || "TH");
  const month = parsedDate.toLocaleDateString("en-GB", { month: "long" }).toUpperCase();
  return `${day}${suffix} ${month} ${parsedDate.getFullYear()}`;
};

export const formatBlogDateLong = (date) => {
  if (!date) return "";
  const parsedDate = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) return "";
  const day = parsedDate.getDate();
  const suffix = day >= 11 && day <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" }[day % 10] || "th");
  const month = parsedDate.toLocaleDateString("en-GB", { month: "long" });
  return `${day}${suffix} ${month} ${parsedDate.getFullYear()}`;
};

// Newest first.
const comparePosts = (a, b) => b.sortKey.localeCompare(a.sortKey);

// Featured = WordPress sticky posts (newest first). If none are sticky, the latest posts.
export const getFeaturedPosts = (posts, limit = FEATURED_POSTS_LIMIT) => {
  const sorted = [...posts].sort(comparePosts);
  const sticky = sorted.filter((post) => post.sticky);
  return (sticky.length ? sticky : sorted).slice(0, limit);
};

export const getPostsByCategory = (posts, key) => posts
  .filter((post) => post.categories.includes(key))
  .sort(comparePosts);

// Only categories that have at least one post, A to Z.
export const getCategories = (posts) => {
  const byKey = new Map();
  posts.forEach((post) => post.categoryItems.forEach((item) => {
    if (!byKey.has(item.key)) byKey.set(item.key, item);
  }));
  return [...byKey.values()].sort((a, b) => a.label.localeCompare(b.label));
};

export const paginate = (posts, page, perPage = POSTS_PER_PAGE) => {
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * perPage;
  return posts.slice(start, start + perPage);
};

export const getRelatedPosts = (posts, slug, limit = RELATED_POSTS_LIMIT) => {
  const current = posts.find((post) => post.slug === slug);
  if (!current) return [];
  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => ({ post, shared: post.categories.filter((key) => current.categories.includes(key)).length }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared || comparePosts(a.post, b.post))
    .slice(0, limit)
    .map(({ post }) => post);
};

export const slugifyHeading = (text) => text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

// WordPress `content` HTML -> { html, headings }. The table of contents uses the top-most
// heading level the post actually contains (h2, else h3, else h4). Each of those headings gets
// an id, tabindex="-1" and data-toc (BlogBody styles data-toc as the bold section title), with
// duplicate ids suffixed. Regex only, no DOM, so it is safe during the Gatsby build.
const TOC_LEVELS = [2, 3, 4];

export const processPostContent = (html = "") => {
  const level = TOC_LEVELS.find((lvl) => new RegExp(`<h${lvl}[\\s>]`, "i").test(html));
  if (!level) return { html, headings: [] };

  const usedIds = {};
  const headings = [];
  const pattern = new RegExp(`<h${level}([^>]*)>([\\s\\S]*?)<\\/h${level}>`, "gi");
  const processed = html.replace(pattern, (match, attrs, inner) => {
    const text = decodeEntities(inner.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();
    const baseId = slugifyHeading(text);
    if (!baseId) return match;
    const count = usedIds[baseId] || 0;
    usedIds[baseId] = count + 1;
    const id = count ? `${baseId}-${count + 1}` : baseId;
    headings.push({ id, text });
    const cleanAttrs = attrs.replace(/\sid=("[^"]*"|'[^']*')/i, "");
    return `<h${level}${cleanAttrs} id="${id}" tabindex="-1" data-toc>${inner}</h${level}>`;
  });
  return { html: processed, headings };
};