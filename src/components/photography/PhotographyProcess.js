import * as React from "react";

export const photographyRows = [
  {
    heading: "How we work",
    image: "/figma/images/photo/we-work.png",
    alt: "Black-and-white studio photography shoot",
    paragraphs: [
      "We try to make the consultation process for our photography services as simple as possible – understanding your requirements as quickly as possible.",
      <React.Fragment key="quote">Quoting is relatively easy, as <strong className="font-bold text-brand-teal">we charge based on time and resources</strong> (rather than per-image).</React.Fragment>,
      "You can book our photography agency for as little as one hour – ideal when you need a handful of simple images, and are happy for us to work remotely.",
      "We also offer either half day or full day slots, with full pre-planning consultation. We can help with props, backgrounds, locations and models where required. We have numerous shoot location options as well, including the possibility to come to you.",
      "We like to think we have a solution to satisfy most challenges!",
    ],
  },
  {
    heading: "Technically speaking",
    image: "/figma/images/photo/speak.png",
    alt: "Photographer holding a Nikon camera",
    paragraphs: [
      "We shoot on high resolution Nikon cameras, capable of delivering clean, crisp imagery with acres of detail.",
      "Our lens options include Nikon’s two workhorse focal length ranges (24-70mm and 70-200mm), and we support macro lenses for close-up work and ultra-wide, as wide as 12mm, for dramatic wide angles.",
      "We use both studio lighting and portable battery-powered flash, which makes us a photography company able to shoot in all locations. Post-production is completed through Adobe Raw and Photoshop.",
    ],
  },
  {
    heading: "The whole package",
    image: "/figma/images/photo/pack.png",
    alt: "Street outside a photography studio with a tree and studio sign",
    paragraphs: [
      "We try to make the consultation process for our photography services as simple as possible – understanding your requirements as quickly as possible.",
      "Quoting is relatively easy, as we charge based on time and resources (rather than per-image).",
      "You can book our photography agency for as little as one hour – ideal when you need a handful of simple images, and are happy for us to work remotely.",
      "We also offer either half day or full day slots, with full pre-planning consultation. We can help with props, backgrounds, locations and models where required. We have numerous shoot location options as well, including the possibility to come to you.",
      <strong key="last" className="font-bold text-brand-teal">We like to think we have a solution to satisfy most challenges!</strong>,
    ],
  },
];

const PhotographyProcess = ({ rows = photographyRows, variant = "photography" }) => {
  const isVideography = variant === "videography";

  return (
    <section
      className={`bg-brand-bg px-8 py-14 sm:px-12 sm:py-20 md:px-16 lg:px-[clamp(64px,4.5vw,150px)] min-[1920px]:px-0 ${
        isVideography ? "xl:min-h-[1090px] xl:py-[207px]" : "xl:py-[106px]"
      }`}
    >
      {/* Same row spacing and text styling for both pages. Row 2 gives its image the wider column (text narrower). */}
      <div className="mx-auto max-w-[1400px] space-y-12 sm:space-y-16 lg:space-y-[45px]">
        {rows.map(({ heading, image, alt, paragraphs }, index) => (
          <div
            key={heading}
            className={`grid grid-cols-1 items-center gap-6 sm:gap-8 ${
              isVideography ? "lg:gap-[clamp(32px,3.75vw,54px)]" : "lg:gap-[clamp(32px,3.9vw,56px)]"
            } ${
              index === 1
                ? "lg:grid-cols-[minmax(0,0.52fr)_minmax(0,1fr)] lg:[&>img]:order-2 lg:[&>div]:order-1"
                : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
            }`}
          >
            <img
              src={image}
              alt={alt}
              width="700"
              height={isVideography ? "405" : "428"}
              loading="lazy"
              className={`aspect-[4/3] h-auto w-full object-cover sm:aspect-[16/10] lg:aspect-auto ${
                isVideography ? "lg:h-[405px]" : "lg:h-[428px]"
              }`}
            />
            <div className="max-w-[800px] text-base font-medium leading-[1.4] tracking-[-0.5px] text-brand-slate sm:text-lg sm:tracking-[-1px] xl:text-xl xl:leading-none">
              <h2 className="mb-4 text-3xl font-bold leading-none tracking-[-1px] sm:mb-6 sm:text-4xl sm:tracking-[-2px]">
                {heading}
              </h2>
              <div className="space-y-4 sm:space-y-5">
                {paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// TODO: confirm duplicated Row 3 copy with the Figma owner.
export default PhotographyProcess;
