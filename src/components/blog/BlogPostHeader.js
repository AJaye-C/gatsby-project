import * as React from "react";
import { Link } from "gatsby";
import { formatBlogDateLong, getBlogCategory } from "../../utils/blog";

const BlogPostHeader = ({ post, location }) => {
  const search = location?.state?.blogListSearch || "";
  return (
    <header className="mx-auto max-w-[1440px] px-6 pb-9 pt-36 sm:px-10 lg:px-12">
      <Link to={`/blog/${search}`} className="inline-flex items-center text-base font-medium tracking-[-0.8px] text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2">
        <span aria-hidden="true" className="mr-1 text-xl">‹</span> Go back to blogs
      </Link>
      <h1 className="mt-10 max-w-[1335px] text-[clamp(2.75rem,4.167vw,5rem)] font-bold leading-none tracking-[-0.05em] text-brand-slate">{post.title}</h1>
      <div className="mt-6 flex flex-wrap items-center gap-3 text-[20px] font-medium tracking-[-1px] text-brand-teal">
        <span>{post.author || "Pocket Creatives"}</span>
        {post.date && <><span aria-hidden="true">•</span><span>{formatBlogDateLong(post.date)}</span></>}
        {post.categories.map((key) => (
          <span key={key} className="rounded-[10px] bg-brand-accent-yellow px-8 py-2 text-black">{getBlogCategory(key)?.label || key}</span>
        ))}
      </div>
      <img src={post.image} alt="" width="1440" height="503" loading="eager" className="mt-8 aspect-[1440/503] w-full object-cover" />
    </header>
  );
};

export default BlogPostHeader;
