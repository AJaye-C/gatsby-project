import * as React from "react";

const BlogLikeBar = ({ count }) => (
  <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-[14px] pb-12 sm:px-10 lg:px-12">
  <button type="button" className="h-12 min-w-[117px] bg-brand-accent-yellow px-6 text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2">
      <span aria-hidden="true">♡</span> Like
    </button>
    {count != null && <><span className="h-12 w-px bg-brand-slate/40" /><span className="font-bold text-brand-teal">👍 {count}</span></>}
    <span className="h-px flex-1 bg-brand-slate/30" />
  </div>
);

export default BlogLikeBar;
