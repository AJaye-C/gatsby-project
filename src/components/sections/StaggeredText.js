import * as React from "react";
import { splitParagraphs } from "../../utils/acf";

// Page-builder layout: "staggered_text"  (fields: staggerBlocks[{ heading, text }])
// Blocks alternate: 1st flush left, 2nd shifted right (heading) with its copy pulled back to the left edge,
// 3rd flush left again, and so on. text = Text Area, one paragraph per line.

const headingClass =
  "flex w-full items-center justify-center bg-brand-accent-yellow px-4 py-4 text-center text-[clamp(1.875rem,8.5vw,4rem)] font-bold leading-[1.15] tracking-[-0.04em] text-black sm:px-6 xl:h-[128px] xl:px-[23px] xl:py-0 xl:text-[80px] xl:leading-[1.23] xl:tracking-[-4px]";

// Full class literals (gotcha 11). Even index = left block, odd index = shifted block.
// Every block after the first also gets the gap (blockGap).
const blockGap = "mt-12 md:mt-14 xl:mt-[39px]";

const blockClasses = [
  {
    wrapper: "",
    heading: "max-w-[849px]",
    copy: "mt-6 max-w-[1234px] sm:mt-8 xl:mt-10",
  },
  {
    wrapper: "xl:ml-[387px]",
    heading: "max-w-[847px]",
    copy: "mt-6 max-w-[1205px] sm:mt-8 xl:ml-[-358px] xl:mt-10",
  },
];

const StaggeredText = ({ staggerBlocks = [] }) => {
  const blocks = (staggerBlocks || []).filter((block) => block && (block.heading || block.text));
  if (blocks.length === 0) return null;

  // The Figma height (two blocks) is kept; other counts size to their content.
  const heightClassName = blocks.length === 2 ? "xl:min-h-[1052px]" : "";

  /* The staggered layout needs ~1290px, so it starts at xl; below that the blocks stack. */
  return (
    <section className="overflow-hidden bg-brand-teal text-white">
      <div className={`mx-auto max-w-[1290px] px-6 py-14 sm:px-10 md:py-20 xl:px-0 xl:py-[105px] ${heightClassName}`}>
        {blocks.map((block, index) => {
          const classes = blockClasses[index % 2];
          const paragraphs = splitParagraphs(block.text);

          return (
            <div key={`${block.heading}-${index}`} className={`${index > 0 ? blockGap : ""} ${classes.wrapper}`}>
              {block.heading && <h2 className={`${headingClass} ${classes.heading}`}>{block.heading}</h2>}
              {paragraphs.length > 0 && (
                <div className={classes.copy}>
                  <div className="space-y-5 text-lg font-medium leading-snug tracking-[-0.5px] text-white sm:text-xl sm:tracking-[-1px] xl:space-y-6 xl:text-[20px] xl:leading-[1.23]">
                    {paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StaggeredText;
