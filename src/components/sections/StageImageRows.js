import * as React from "react";
import { mediaUrl, mediaAlt, splitParagraphs } from "../../utils/acf";
import { stageNumeralSrc } from "../../utils/stageNumeral";

// Page-builder layout: "stage_image_rows"
// (fields: stageNumber, stageRows [heading, text (one paragraph per line), image]).
// Images bleed to the viewport edge; text keeps the shared gutter. Rows alternate:
// 1st, 3rd ... image left; 2nd, 4th ... image right.
// lg+: proportional version of the 1920 Figma layout (percentages of a container capped at 1920):
//   image-left row:  755 image | 136 gap | 741 text | 288 right margin
//   image-right row: 191 left margin | 816 text | 195 gap | 718 image
// Below lg: image above its text, edge to edge, text inside the gutter.
const TEXT_GUTTER = "px-[clamp(24px,8vw,150px)] lg:px-0";

const StageImageRows = ({ stageNumber, stageRows = [] }) => {
  const rows = (stageRows || []).filter((row) => row && (row.heading || row.text || mediaUrl(row.image)));
  const numeral = stageNumeralSrc(stageNumber);

  if (!rows.length) return null;

  return (
    <section className="relative isolate overflow-hidden bg-brand-bg py-20 text-brand-slate lg:py-[223px]">
      {numeral && (
        <img src={numeral} alt="" aria-hidden="true" className="pointer-events-none absolute left-[35%] top-[2%] -z-10 h-[86%] max-w-[53%] object-contain" />
      )}

      <div className="relative mx-auto max-w-[1920px]">
        {rows.map((row, index) => {
          const imageLeft = index % 2 === 0;
          const image = mediaUrl(row.image);
          const paragraphs = splitParagraphs(row.text || "");
          const spacing = index ? "mt-20 lg:mt-[118px]" : "";

          const imageEl = image ? (
            <img
              src={image}
              alt={mediaAlt(row.image, row.heading || "")}
              width={imageLeft ? "755" : "718"}
              height="529"
              loading={index === 0 ? "eager" : "lazy"}
              className={imageLeft ? "aspect-[755/529] h-auto w-full object-cover" : "order-1 aspect-[718/529] h-auto w-full object-cover lg:order-2"}
            />
          ) : null;

          const textEl = (
            <div className={imageLeft ? `max-w-[741px] ${TEXT_GUTTER} lg:py-6` : `order-2 max-w-[816px] ${TEXT_GUTTER} lg:order-1`}>
              {row.heading && <h2 className="text-[clamp(2rem,2.083vw,2.5rem)] font-extrabold leading-none tracking-[-2px]">{row.heading}</h2>}
              {paragraphs.length > 0 && (
                <div className="mt-8 space-y-5 text-[20px] font-medium leading-[1.2] tracking-[-1px]">
                  {paragraphs.map((paragraph, paragraphIndex) => <p className="text-justify [hyphens:auto]" key={paragraphIndex}>{paragraph}</p>)}
                </div>
              )}
            </div>
          );

          return imageLeft ? (
            <div key={index} className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-[755fr_741fr] lg:gap-x-[8.333%] lg:pr-[15%] ${spacing}`}>
              {imageEl}
              {textEl}
            </div>
          ) : (
            <div key={index} className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-[816fr_718fr] lg:gap-x-[11.28%] lg:pl-[9.948%] ${spacing}`}>
              {textEl}
              {imageEl}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StageImageRows;
