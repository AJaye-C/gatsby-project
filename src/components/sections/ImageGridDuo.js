import * as React from "react";
import RichText from "../../utils/RichText";

// Page-builder layout: "image_grid_duo"
// Fields: leftBanner, leftText, leftImages, rightBanner, rightText, rightImages
// Left column: yellow banner -> copy -> image grid. Right column: image grid -> copy -> teal banner (xl+).
// Below xl the order is banner -> copy -> images for both columns.
// leftImages / rightImages are ACF Gallery fields: { nodes { mediaItemUrl altText } }.
const bannerText =
  "text-center text-[clamp(2.75rem,5.56vw,5rem)] font-extrabold leading-none tracking-[-1.6px]";

const copyClass =
  "text-base font-medium leading-[1.4] tracking-[-0.5px] text-brand-slate sm:text-lg sm:tracking-[-1px] xl:text-xl xl:leading-[1.22]";

const ImageGrid = ({ images }) => {
  const nodes = images?.nodes || [];
  if (!nodes.length) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-[31px_33px]">
      {nodes.map((node, index) => (
        <img
          key={`${node.mediaItemUrl}-${index}`}
          src={node.mediaItemUrl}
          alt={node.altText || ""}
          width="307"
          height="307"
          loading="lazy"
          className="aspect-square w-full object-cover"
        />
      ))}
    </div>
  );
};

const ImageGridDuo = ({
  leftBanner = "",
  leftText = "",
  leftImages,
  rightBanner = "",
  rightText = "",
  rightImages,
}) => (
  <section className="relative overflow-hidden bg-brand-bg px-8 py-14 sm:px-12 sm:py-20 md:px-16 lg:px-[clamp(64px,4.5vw,150px)] xl:min-h-[1356px] xl:py-[140px] min-[1920px]:px-0">
    <div className="mx-auto grid max-w-[1316px] grid-cols-1 gap-14 sm:gap-16 xl:grid-cols-2 xl:gap-[34px]">
      <div className="flex flex-col">
        <div className="flex min-h-[96px] items-center justify-center bg-brand-accent-yellow px-4 py-4 sm:min-h-[122px] sm:px-6 xl:h-[122px] xl:py-0">
          <h2 className={`${bannerText} text-black`}>{leftBanner}</h2>
        </div>

        <div className="mt-6 sm:mt-8 xl:mt-[60px]">
          <RichText as="div" html={leftText} weight="bold" className={copyClass} />
        </div>

        <div className="mt-8 sm:mt-10 xl:mt-[140px]">
          <ImageGrid images={leftImages} />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="order-3 mt-8 sm:mt-10 xl:order-1 xl:mt-0">
          <ImageGrid images={rightImages} />
        </div>

        <div className="order-2 mt-6 sm:mt-8 xl:mt-[56px]">
          <RichText as="div" html={rightText} weight="bold" className={copyClass} />
        </div>

        <div className="order-1 xl:order-3 xl:mt-[60px]">
          <div className="flex min-h-[72px] items-center justify-center bg-brand-teal px-4 py-3 sm:min-h-[88px] sm:px-6 xl:h-[88px] xl:py-0">
            <h2 className={`${bannerText} text-white`}>{rightBanner}</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ImageGridDuo;
