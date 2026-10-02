import * as React from "react";

const BlogBody = ({ blocks = [], headings = [] }) => {
  let headingIndex = 0;
  return (
    <div className="min-w-0 text-[clamp(1rem,1.042vw,1.25rem)] leading-[1.15] tracking-[-1px] text-brand-slate">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const id = headings[headingIndex]?.id;
          headingIndex += 1;
          return <h2 key={index} id={id} tabIndex="-1" className="mt-10 scroll-mt-[var(--blog-sticky-top)] text-[1em] font-bold">{block.text}</h2>;
        }
        if (block.type === "subheading") return <h3 key={index} className="mt-5 text-[1em]">{block.text}</h3>;
        if (block.type === "list") return <ul key={index} className="my-3 list-disc pl-8">{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
        return <p key={index} className="my-4">{block.text}</p>;
      })}
    </div>
  );
};

export default BlogBody;
