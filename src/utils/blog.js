import { blogCategories, blogPosts } from "../data/blogs";
import { blogBodies, getGeneratedBody } from "../data/blogBodies";

export const POSTS_PER_PAGE = 9;

export const formatBlogDate = (date) => {
  if (!date) return "";

  const parsedDate = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) return "";

  const day = parsedDate.getDate();
  const suffix = day >= 11 && day <= 13 ? "TH" : ({ 1: "ST", 2: "ND", 3: "RD" }[day % 10] || "TH");
  const month = parsedDate.toLocaleDateString("en-GB", { month: "long" }).toUpperCase();
  return `${day}${suffix} ${month} ${parsedDate.getFullYear()}`;
};

const comparePosts = (a, b) => {
  if (a.date && b.date && a.date !== b.date) return b.date.localeCompare(a.date);
  if (a.date && !b.date) return -1;
  if (!a.date && b.date) return 1;
  return blogPosts.indexOf(a) - blogPosts.indexOf(b);
};

export const getFeaturedPosts = () => blogPosts
  .filter((post) => post.featured)
  .sort((a, b) => a.featuredOrder - b.featuredOrder);

export const getPostsByCategory = (key) => blogPosts
  .filter((post) => post.categories.includes(key))
  .sort(comparePosts);

export const paginate = (posts, page, perPage = POSTS_PER_PAGE) => {
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * perPage;
  return posts.slice(start, start + perPage);
};

export const getBlogCategory = (key) => blogCategories.find((category) => category.key === key);

export const RELATED_POSTS_LIMIT = 8;

export const slugifyHeading = (text) => text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

export const getPostBySlug = (slug) => blogPosts.find((post) => post.slug === slug);

export const getAllPostSlugs = () => blogPosts.map((post) => post.slug);

export const getPostBody = (slug) => {
  const post = getPostBySlug(slug);
  return post ? (blogBodies[slug] || getGeneratedBody(post)) : [];
};

export const getPostHeadings = (slug) => {
  const usedIds = {};
  return getPostBody(slug).filter((block) => block.type === "heading").map((block) => {
    const baseId = slugifyHeading(block.text);
    const count = usedIds[baseId] || 0;
    usedIds[baseId] = count + 1;
    return { id: count ? `${baseId}-${count + 1}` : baseId, text: block.text };
  });
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

export const getRelatedPosts = (slug, limit = RELATED_POSTS_LIMIT) => {
  const current = getPostBySlug(slug);
  if (!current) return [];
  return blogPosts
    .filter((post) => post.slug !== slug)
    .map((post, index) => ({ post, shared: post.categories.filter((key) => current.categories.includes(key)).length, index }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared || comparePosts(a.post, b.post) || a.index - b.index)
    .slice(0, limit)
    .map(({ post }) => post);
};
