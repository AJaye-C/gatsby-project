import * as React from "react";
import { Link } from "gatsby";

const BlogRelatedPosts = ({ posts }) => {
  if (!posts.length) return null;
  return (
    <section className="mx-auto max-w-[1440px] px-[14px] pb-44 sm:px-10 lg:px-12">
      <h2 className="mb-8 text-[20px] font-bold text-black lg:text-brand-slate">Related News</h2>
      <div className="grid max-w-[1210px] grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:ml-[100px] lg:grid-cols-3 max-md:gap-0">
        {posts.map((post) => <Link key={post.slug} to={`/blog/${post.slug}/`} state={{ blogListSearch: typeof window !== "undefined" ? window.location.search : "" }} className="flex min-h-[109px] items-center gap-[18px] py-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 md:block md:min-h-0 md:py-0">
          <img src={post.image} alt="" width="365" height="179" className="aspect-[128/88] w-[128px] shrink-0 object-cover md:aspect-[365/179] md:w-full" loading="lazy" />
          <span className="flex min-h-[88px] flex-1 items-center border-b border-brand-slate/40 text-[15px] font-normal leading-tight text-black md:mt-3 md:min-h-0 md:border-0 md:text-[16px] md:font-bold md:text-brand-slate">{post.title}</span>
        </Link>)}
      </div>
    </section>
  );
};

export default BlogRelatedPosts;
