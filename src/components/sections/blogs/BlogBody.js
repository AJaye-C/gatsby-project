import * as React from "react";

// Renders the WordPress post HTML (already processed by processPostContent) with the same look
// the old block renderer had. Content comes from our own WordPress, so it is rendered as-is.
const BlogBody = ({ html = "" }) => (
  <div
    className="min-w-0 text-[clamp(1rem,1.042vw,1.25rem)] leading-[1.15] tracking-[-1px] text-brand-slate [&_a]:underline [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-accent-yellow [&_blockquote]:pl-4 [&_figure]:my-6 [&_h2]:mt-10 [&_h2]:text-[1em] [&_h2]:font-bold [&_h3]:mt-5 [&_h3]:text-[1em] [&_h4]:mt-5 [&_h4]:text-[1em] [&_[data-toc]]:mt-10 [&_[data-toc]]:scroll-mt-[var(--blog-sticky-top)] [&_[data-toc]]:font-bold [&_img]:h-auto [&_img]:max-w-full [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-8 [&_p]:my-4 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-8"
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

export default BlogBody;
