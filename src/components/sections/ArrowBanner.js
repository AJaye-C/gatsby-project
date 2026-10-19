import * as React from "react";
import RichText from "../../utils/RichText";
import { splitParagraphs } from "../../utils/acf";

// Page-builder layout: "arrow_banner"  (fields: variant, heading, text)
// A big heading, some text and a large "scroll down" arrow. Renamed from "video_intro" in v12.
//   yellow : the Home look (yellow band, text and arrow side by side under the heading).
//            Heading highlight: bold = teal. text = one block of text.
//   teal   : the Training "How does it work?" look (teal band, heading and paragraphs on the left,
//            the arrow large on the right). Heading highlight: italic = yellow (bold teal would be
//            invisible on teal). text = one paragraph per line.
// An empty or unknown variant falls back to "yellow". Class names are complete literals (gotcha 11).
const variantKey = (variant) => {
  const raw = Array.isArray(variant) ? variant[0] : variant;
  const key = String(raw || "").trim().toLowerCase();
  return key === "teal" ? "teal" : "yellow";
};

const ArrowBanner = ({ variant = "", heading = "", text = "" }) => {
  if (variantKey(variant) === "teal") {
    return (
      <section className="relative min-h-[779px] overflow-hidden bg-brand-teal text-white">
        <div className="relative mx-auto min-h-[779px] max-w-[1920px] px-[clamp(24px,8vw,150px)] pb-20 pt-24 md:grid md:grid-cols-[minmax(0,1fr)_clamp(110px,11.15vw,214px)] md:items-start md:gap-[clamp(24px,3vw,64px)] lg:pt-[205px] min-[1920px]:block min-[1920px]:px-0">
          <div className="md:min-w-0 min-[1920px]:ml-[309px] min-[1920px]:max-w-[951px]">
            <RichText
              as="h2"
              html={heading}
              weight="bold"
              className="block text-[clamp(3.25rem,6.25vw,7.5rem)] font-bold leading-none tracking-[-0.05em]"
            />

            <div className="mt-16 max-w-[951px] space-y-5 text-base font-medium leading-none tracking-[-0.8px] sm:text-lg lg:mt-[68px] lg:text-[20px] lg:tracking-[-1px]">
              {splitParagraphs(text).map((paragraph, index) => (
                <p key={`${paragraph}-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>

          <img
            src="/figma/icons/arrows/icon-down.svg"
            alt=""
            aria-hidden="true"
            className="section-two-arrow pointer-events-none mx-auto mt-10 h-auto w-[clamp(110px,22vw,214px)] max-w-none object-contain md:mt-[clamp(150px,11vw,260px)] md:justify-self-end min-[1920px]:absolute min-[1920px]:bottom-auto min-[1920px]:left-auto min-[1920px]:right-[310px] min-[1920px]:top-[288px] min-[1920px]:mt-0"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-brand-yellow py-16 text-white sm:py-24 md:py-36 lg:py-44 xl:py-52">
      <div className="mx-auto max-w-[940px] px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:gap-10">
          {/* Yellow background: bold (teal) works here, italic (yellow) would not show */}
          <RichText as="h2" html={heading} className="max-w-content-cta text-display-banner font-black text-white" />

          <div className="flex flex-col items-start gap-6 sm:flex-row sm:gap-8 md:gap-12">
            <p className="max-w-copy-video whitespace-pre-line text-body-copy text-[#1f2937]">{text}</p>
            <div className="mt-1 flex shrink-0 items-start justify-center self-center sm:self-start">
              <img
                src="/figma/icons/arrows/icon-down.svg"
                alt="Scroll down"
                className="section-two-arrow h-20 w-20 max-w-none object-contain sm:h-28 sm:w-28 md:h-36 md:w-36"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArrowBanner;
