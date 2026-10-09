import * as React from "react";
import { Link } from "gatsby";
import { formatBlogDate, POSTS_PER_PAGE, paginate } from "../../utils/blog";
import BlogCategoryDropdown from "./BlogCategoryDropdown";

const BlogListing = ({ posts = [] }) => {
  const categoriesRef = React.useRef(null);
  const postsRef = React.useRef(null);
  const [category, setCategory] = React.useState("all");
  const [page, setPage] = React.useState(1);

  const categoryOptions = React.useMemo(() => {
    const options = [{ key: "all", label: "All" }];
    posts.forEach((post) => {
      (post.categories?.nodes || []).forEach(({ name }) => {
        const key = name.toLowerCase().replace(/\s+/g, "-");
        if (!options.some((option) => option.key === key)) {
          options.push({ key, label: name });
        }
      });
    });
    return options;
  }, [posts]);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedCategory = params.get("category");
    const requestedPage = Number.parseInt(params.get("page") || "1", 10);
    if (categoryOptions.some((option) => option.key === requestedCategory)) {
      setCategory(requestedCategory);
    }
    if (Number.isFinite(requestedPage) && requestedPage > 0 && window.matchMedia("(min-width: 768px)").matches) {
      setPage(requestedPage);
    }
  }, [categoryOptions]);

  React.useEffect(() => {
    const syncMobilePage = () => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        setPage(1);
        const params = new URLSearchParams(window.location.search);
        if (params.has("page")) {
          params.delete("page");
          window.history.replaceState({}, "", `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`);
        }
      }
    };
    syncMobilePage();
    window.addEventListener("resize", syncMobilePage);
    return () => window.removeEventListener("resize", syncMobilePage);
  }, []);

  const filteredPosts = category === "all"
    ? posts
    : posts.filter((post) => (post.categories?.nodes || []).some(({ name }) => name.toLowerCase().replace(/\s+/g, "-") === category));
  const pageCount = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const visiblePosts = paginate(filteredPosts, currentPage);

  const handleCategoryChange = (nextCategory) => {
    setCategory(nextCategory);
    setPage(1);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      params.set("category", nextCategory);
      if (window.matchMedia("(min-width: 768px)").matches) params.set("page", "1");
      window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
    }
    requestAnimationFrame(() => postsRef.current?.scrollTo({ left: 0, behavior: "auto" }));
  };

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      params.set("category", category);
      params.set("page", String(nextPage));
      window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
    }
    requestAnimationFrame(() => {
      if (categoriesRef.current) {
        const topPos = categoriesRef.current.getBoundingClientRect().top + window.pageYOffset - 140;
        window.scrollTo({ top: topPos, behavior: "auto" });
      }
    });
  };

  return (
    <section className="bg-brand-bg px-6 pb-20 pt-16 sm:px-10 lg:px-12 lg:pt-24">
      <h1 tabIndex="-1" className="mb-12 text-center text-5xl font-bold tracking-[-2px] text-brand-teal outline-none sm:text-6xl">
        Our Blogs
      </h1>

      <div ref={categoriesRef} className="mx-auto mb-14 hidden max-w-[1390px] gap-x-8 gap-y-5 overflow-x-auto pb-2 text-[20px] font-medium tracking-[-1px] text-brand-slate md:flex lg:flex-wrap lg:justify-center lg:overflow-visible">
        {categoryOptions.filter((option) => option.key !== "all").map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => handleCategoryChange(option.key)}
            aria-pressed={category === option.key}
            className={`shrink-0 uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 ${category === option.key ? "text-brand-accent-yellow" : "hover:text-brand-teal"}`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <BlogCategoryDropdown categories={categoryOptions.filter((option) => option.key !== "all")} selected={category} onSelect={handleCategoryChange} />

      {visiblePosts.length ? (
        <div ref={postsRef} role="region" aria-label="Blog posts" tabIndex={0} className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 outline-none focus-visible:ring-2 focus-visible:ring-brand-teal md:grid-cols-2 xl:grid-cols-3 max-md:ml-1 max-md:flex max-md:w-[calc(100vw-28px)] max-md:max-w-none max-md:gap-[22px] max-md:overflow-x-scroll max-md:overscroll-x-contain max-md:touch-pan-x max-md:snap-x max-md:snap-mandatory max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
          {visiblePosts.map((post, index) => {
            const categories = (post.categories?.nodes || []).map(({ name }) => name);
            const image = post.featuredImage?.node?.sourceUrl || "";
            return (
              <article key={post.id} className="flex min-h-[598px] flex-col border-[3px] border-brand-slate bg-brand-bg p-[12px] max-md:w-[clamp(300px,77vw,350px)] max-md:shrink-0 max-md:snap-start md:w-auto">
                {image && <img src={image} alt="" width="419" height="314" className="h-auto aspect-[419/314] w-full object-cover" loading={index < 2 ? "eager" : "lazy"} />}
                <h2 className="mt-5 line-clamp-2 text-[20px] font-bold leading-[1.2] tracking-[-1px] text-brand-slate">{post.title}</h2>
                {categories.length > 0 && <p className="mt-5 inline-block w-fit bg-brand-accent-yellow px-1 text-[14px] font-medium italic text-black">{categories.join(", ")}</p>}
                <p className="mt-5 text-[14px] font-bold uppercase tracking-[-0.5px] text-brand-teal">
                  Pocket Creatives
                  {formatBlogDate(post.date) && <span className="font-normal text-brand-slate"> {formatBlogDate(post.date)}</span>}
                </p>
                <Link
                  to={`/blog/${post.slug}/`}
                  state={{ blogListSearch: typeof window !== "undefined" ? window.location.search : "" }}
                  className="mt-auto pt-8 text-[20px] font-medium tracking-[-1px] text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
                >
                  Read More <span aria-hidden="true">→</span>
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="py-20 text-center text-xl font-medium text-brand-teal">No blogs are available in this category yet.</p>
      )}

      {pageCount > 1 && (
        <nav aria-label="Blog pagination" className="mt-16 flex items-center justify-center gap-8 text-[20px] font-medium tracking-[-1px] text-black max-md:hidden">
          <button type="button" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="disabled:opacity-40">‹ Prev</button>
          <span aria-live="polite">{currentPage} of {pageCount}</span>
          <button type="button" disabled={currentPage === pageCount} onClick={() => handlePageChange(currentPage + 1)} className="disabled:opacity-40">Next ›</button>
        </nav>
      )}
      <p className="sr-only md:hidden" aria-live="polite">Showing {filteredPosts.length} posts in {categoryOptions.find((option) => option.key === category)?.label || category}</p>
      <p className="sr-only hidden md:block" aria-live="polite">{currentPage} of {pageCount}</p>
    </section>
  );
};

export default BlogListing;
