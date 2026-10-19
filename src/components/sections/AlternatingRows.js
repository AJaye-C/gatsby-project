import * as React from "react";
import RichText from "../../utils/RichText";

// Page-builder layout: "alternating_rows"
// Fields: variant, rowItems { heading, image, rowLayout, content }
//
// `variant` (Select): "photography" (default) | "video" - only changes section padding and image height.
// `rowLayout` (Select, per row): "image left" | "image right wide" (image right + wider, text left).
//   Empty or unknown alternates automatically (row 2, 4... = image right).
// content: WYSIWYG. Bold = teal, Italic = yellow.
const variants = {
  photography: {
    section: "xl:py-[106px]",
    gap: "lg:gap-[clamp(32px,3.9vw,56px)]",
    imageHeight: "lg:h-[428px]",
    imageAttrHeight: "428",
  },
  video: {
    section: "xl:min-h-[1090px] xl:py-[207px]",
    gap: "lg:gap-[clamp(32px,3.75vw,54px)]",
    imageHeight: "lg:h-[405px]",
    imageAttrHeight: "405",
  },
};

const pick = (value) => String((Array.isArray(value) ? value[0] : value) || "").trim().toLowerCase();

// Row layout columns. WordPress may return the select as "image_right_wide" or "image right wide",
// so match on the word "right" / "left". Empty or unknown alternates by position (row 2, 4... = right).
const rowLayouts = {
  left: "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]",
  right:
    "lg:grid-cols-[minmax(0,0.52fr)_minmax(0,1fr)] lg:[&>img]:order-2 lg:[&>div]:order-1",
};

const resolveLayout = (value, index) => {
  const raw = pick(value);
  if (raw.includes("right")) return "right";
  if (raw.includes("left")) return "left";
  return index % 2 === 1 ? "right" : "left";
};

const AlternatingRows = ({ variant = "", rowItems = [] }) => {
  const v = variants[pick(variant)] || variants.photography;

  return (
    <section
      className={`bg-brand-bg px-8 py-14 sm:px-12 sm:py-20 md:px-16 lg:px-[clamp(64px,4.5vw,150px)] min-[1920px]:px-0 ${v.section}`}
    >
      <div className="mx-auto max-w-[1400px] space-y-12 sm:space-y-16 lg:space-y-[45px]">
        {rowItems.map((row, index) => {
          const imageUrl = row?.image?.node?.mediaItemUrl;
          const cols = rowLayouts[resolveLayout(row?.rowLayout, index)];

          return (
            <div
              key={`${row?.heading}-${index}`}
              className={`grid grid-cols-1 items-center gap-6 sm:gap-8 ${v.gap} ${cols}`}
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={row?.image?.node?.altText || ""}
                  width="700"
                  height={v.imageAttrHeight}
                  loading="lazy"
                  className={`aspect-[4/3] h-auto w-full object-cover sm:aspect-[16/10] lg:aspect-auto ${v.imageHeight}`}
                />
              )}

              <div className="max-w-[800px] text-base font-medium leading-[1.4] tracking-[-0.5px] text-brand-slate sm:text-lg sm:tracking-[-1px] xl:text-xl xl:leading-none">
                <h2 className="mb-4 text-3xl font-bold leading-none tracking-[-1px] sm:mb-6 sm:text-4xl sm:tracking-[-2px]">
                  {row?.heading}
                </h2>
                <RichText as="div" html={row?.content} weight="bold" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AlternatingRows;