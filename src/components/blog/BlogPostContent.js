import * as React from "react";
import { addHeadingIdsToHtml, getPostHeadingsFromHtml } from "../../utils/blog";

const UPDATE_HASH_ON_TOC_CLICK = true;

const BlogPostContent = ({ content = "" }) => {
  const headings = getPostHeadingsFromHtml(content);
  const safeContent = addHeadingIdsToHtml(content);

  const handleTocClick = (event, id) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    target.focus({ preventScroll: true });
    if (UPDATE_HASH_ON_TOC_CLICK) window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 pb-12 sm:px-10 md:grid-cols-1 lg:grid-cols-[clamp(220px,20.9vw,301px)_minmax(0,1046px)] lg:gap-[40px] lg:px-12 [--blog-sticky-top:120px]">
      {headings.length > 0 && (
        <aside className="row-start-1 max-md:hidden lg:row-auto">
          <nav className="static max-h-[calc(100vh-var(--blog-sticky-top)-24px)] overflow-y-auto bg-brand-accent-yellow p-8 lg:sticky lg:top-[var(--blog-sticky-top)]" aria-label="Table of contents">
            <p className="mb-6 text-[20px] font-bold tracking-[-1px] text-black">Table of Contents</p>
            <ul className="space-y-5 text-[20px] leading-none tracking-[-1px] text-black">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`} onClick={(event) => handleTocClick(event, heading.id)} className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
      <div className="prose max-w-none">
        <div className="blog-content text-[clamp(1rem,1.042vw,1.25rem)] leading-[1.15] tracking-[-1px] text-brand-slate" dangerouslySetInnerHTML={{ __html: safeContent }} />
      </div>
    </div>
  );
};

export default BlogPostContent;
