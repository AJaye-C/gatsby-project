import * as React from "react";
import { splitParagraphs } from "../../utils/acf";

// Page-builder layout: "testimonials_intro"  (fields: heading, text, introLayout)
// text:        Text Area, one paragraph per line.
// introLayout: Select "split" (heading left, text right) | "stacked" (heading, then text below). Empty = stacked.
const pick = (value) => String((Array.isArray(value) ? value[0] : value) || "").trim().toLowerCase();

const TestimonialsIntro = ({ heading = "", text = "", introLayout = "" }) => {
  const isSplit = pick(introLayout).includes("split");
  const paragraphs = splitParagraphs(text);

  return (
    <section className="bg-brand-bg px-8 pb-10 pt-32 sm:px-12 md:px-16 lg:px-[clamp(24px,8vw,150px)] min-[1920px]:px-0 min-[1920px]:pb-0 min-[1920px]:pt-[211px]">
      <div
        className={`mx-auto max-w-[1440px] ${
          isSplit
            ? "grid grid-cols-1 gap-8 sm:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,min(722px,50%))] xl:gap-[68px] min-[1440px]:grid-cols-[minmax(0,1fr)_minmax(0,722px)]"
            : ""
        }`}
      >
        <h1
          className={`break-words text-[clamp(2.5rem,5vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em] text-brand-slate min-[1920px]:text-[96px] min-[1920px]:tracking-[-4px] ${
            isSplit ? "max-w-[730px]" : ""
          }`}
        >
          {heading}
        </h1>

        {paragraphs.length > 0 && (
          <div
            className={`whitespace-pre-line text-base font-medium leading-[1.4] tracking-[-0.5px] text-brand-slate sm:text-lg sm:tracking-[-1px] lg:text-xl lg:leading-none min-[1920px]:text-[20px] ${
              isSplit ? "mt-0 xl:mt-0" : "mt-8 max-w-[1440px] sm:mt-10"
            }`}
          >
            {paragraphs.map((paragraph, index) => (
              <p key={`${index}-${paragraph.slice(0, 20)}`} className="mb-5 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsIntro;
