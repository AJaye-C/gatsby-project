import * as React from "react";
import { Link } from "gatsby";
import { mediaAlt, mediaUrl } from "../../utils/acf";

// Page-builder layout: "image_text_band"  (yellow band with alternating image + text rows)
// Fields: band_items (Repeater: heading [Text], text [Text Area], chip_label [Text], chip_link [Text],
//         image [Image], badge [Image, optional], badge_hover [Image, optional], badge_link [Text, optional])
// Rows alternate: 1st = image left, 2nd = image right, 3rd = image left ... (the two looks are tuned to the design).
// Links are Text fields (gotcha 33): internal paths use Gatsby Link; mailto:/URLs use a plain <a>.
// A row with a badge_link but no badge image falls back to the static "See our works" badge pair.
const FALLBACK_BADGE = "/figma/icons/cta/our-works.svg";
const FALLBACK_BADGE_HOVER = "/figma/icons/cta/our-works-hvr.svg";

const isInternal = (href = "") => href.startsWith("/") && !href.startsWith("//");

const chipClassName =
  "mt-[26px] inline-flex bg-brand-teal px-[15px] py-[8px] text-xl font-extrabold leading-[1.2] tracking-[-1px] text-white";

// Two looks, written out in full so the class names are kept (gotcha 11).
const rowStyles = [
  {
    mediaFirst: true,
    row: "flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-0 xl:pl-[12.45%]",
    media: "relative w-full max-w-[731px] xl:w-[38.07vw] xl:shrink-0",
    image: "h-auto w-full object-cover xl:aspect-[731/415]",
    copy: "xl:ml-[5.26vw] xl:mt-[3.18vw] xl:w-[clamp(300px,22.76vw,437px)] xl:shrink-0 min-[1920px]:ml-[101px] min-[1920px]:mt-[61px]",
    paragraph: "mt-[40px] text-xl font-medium leading-[1.2] tracking-[-1px]",
  },
  {
    mediaFirst: false,
    row: "flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-0 xl:pl-[19.11%]",
    media: "relative order-1 ml-auto w-full max-w-[804.591px] xl:order-2 xl:ml-[clamp(48px,6.59vw,126.578px)] xl:w-[41.9vw] xl:shrink-0",
    image: "h-auto w-full object-cover xl:aspect-[805/415]",
    copy: "order-2 xl:order-1 xl:w-[clamp(336px,19.83vw,380.832px)] xl:shrink-0",
    paragraph: "mt-[58px] text-xl font-medium leading-[1.2] tracking-[-1px]",
  },
];

const badgeClassName =
  "group absolute -right-[36px] -top-[76px] z-10 h-[125px] w-[125px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2";

const Chip = ({ label, link }) => {
  if (!label) return null;
  if (!link) return <div className={chipClassName}>{label}</div>;
  return isInternal(link) ? (
    <Link to={link} className={chipClassName}>
      {label}
    </Link>
  ) : (
    <a href={link} className={chipClassName}>
      {label}
    </a>
  );
};

const Badge = ({ badge, badgeHover, link }) => {
  const badgeSrc = mediaUrl(badge) || (link ? FALLBACK_BADGE : "");
  if (!badgeSrc || !link) return null;

  const hoverSrc = mediaUrl(badgeHover) || (mediaUrl(badge) ? "" : FALLBACK_BADGE_HOVER);
  const label = mediaAlt(badge, "") || "See our works";
  const images = (
    <>
      <img src={badgeSrc} alt="" className={`absolute inset-0 h-full w-full ${hoverSrc ? "group-hover:hidden" : ""}`} />
      {hoverSrc && <img src={hoverSrc} alt="" className="absolute inset-0 hidden h-full w-full group-hover:block" />}
    </>
  );

  return isInternal(link) ? (
    <Link to={link} aria-label={label} className={badgeClassName}>
      {images}
    </Link>
  ) : (
    <a href={link} aria-label={label} className={badgeClassName}>
      {images}
    </a>
  );
};

const ImageTextBand = ({ bandItems = [] }) => {
  const items = (bandItems || []).filter((item) => item && (item.heading || item.text || mediaUrl(item.image)));

  if (!items.length) return null;

  return (
    <section className="relative overflow-hidden bg-brand-accent-yellow text-black">
      <div className="mx-auto flex max-w-[1920px] flex-col gap-16 px-6 py-16 sm:px-10 md:px-16 xl:gap-0 xl:p-0 xl:pb-[4.3vw] xl:pt-[7.08vw] min-[1920px]:pb-[83px] min-[1920px]:pt-[136px]">
        {items.map((item, index) => {
          const style = rowStyles[index % rowStyles.length];
          const imageSrc = mediaUrl(item.image);

          const media = (
            <div className={style.media}>
              {imageSrc && <img src={imageSrc} alt={mediaAlt(item.image, "")} className={style.image} />}
              <Badge badge={item.badge} badgeHover={item.badgeHover} link={item.badgeLink} />
            </div>
          );

          const copy = (
            <div className={style.copy}>
              {item.heading && <h2 className="text-4xl font-extrabold leading-none tracking-[-2px]">{item.heading}</h2>}
              {item.text && <p className={`whitespace-pre-line ${style.paragraph}`}>{item.text}</p>}
              <Chip label={item.chipLabel} link={item.chipLink} />
            </div>
          );

          return (
            <div
              key={`${item.heading || "row"}-${index}`}
              className={`${style.row} ${index > 0 ? "xl:mt-[7.2vw] min-[1920px]:mt-[138px]" : ""}`}
            >
              {style.mediaFirst ? (
                <>
                  {media}
                  {copy}
                </>
              ) : (
                <>
                  {copy}
                  {media}
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ImageTextBand;
