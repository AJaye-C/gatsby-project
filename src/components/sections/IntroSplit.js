import * as React from "react";
import RichText from "../../utils/RichText";

// Page-builder layout: "intro_split"  (fields: heading, text, image)
// heading: Bold = teal, Italic = yellow (RichText convention).
const IntroSplit = ({ heading = "", text = "", image }) => {
  const imageUrl = image?.node?.mediaItemUrl;

  return (
    <section className="bg-brand-bg px-8 py-14 sm:px-12 sm:py-20 md:px-16 lg:px-[clamp(64px,4.5vw,150px)] xl:min-h-[570px] xl:py-[118px] min-[1920px]:px-0">
      <div className="mx-auto grid max-w-[1386px] items-center gap-10 sm:gap-12 xl:grid-cols-[minmax(0,911fr)_minmax(0,331fr)] xl:gap-[clamp(48px,7.4vw,106px)]">
        <div>
          <h2 className="relative z-0 text-2xl font-medium leading-[1.14] tracking-[-1px] text-brand-slate sm:text-3xl lg:text-4xl lg:tracking-[-2px] xl:text-[40px]">
            <span className="absolute bottom-[-4px] left-0 right-0 -z-10 h-5 bg-[rgba(23,156,189,0.1)]" />
            <RichText html={heading} weight="bold" />
          </h2>

          {text && (
            <RichText
              as="div"
              html={text}
              weight="bold"
              className="mt-6 text-base font-medium leading-[1.4] tracking-[-0.5px] text-brand-slate sm:mt-8 sm:text-lg sm:tracking-[-1px] xl:text-[20px] xl:leading-[1.14]"
            />
          )}
        </div>

        {imageUrl && (
          <img
            src={imageUrl}
            alt={image?.node?.altText || ""}
            width="331"
            height="351"
            className="mx-auto h-auto w-[clamp(140px,17.24vw,331px)] object-contain"
          />
        )}
      </div>
    </section>
  );
};

export default IntroSplit;
