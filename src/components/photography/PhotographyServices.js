import * as React from "react";

const leftParagraphs = [
  <React.Fragment key="left-1">
    Our professional photography services are{" "}
    <strong className="font-bold text-brand-teal">
      flexible and affordably priced
    </strong>
    , so that you can scale up or down depending on your requirements. We
    create eye-catching results for use in advertising campaigns, product
    listings and e-commerce, and for social media.
  </React.Fragment>,
  "Here, you’ll see our extensive portfolio. It covers a range of subjects so whatever you’re here for, we’re sure you’ll find something to pique your interest.",
];

const rightParagraphs = [
  "Our photography agency is commissioned by a wonderfully diverse range of clients including food producers, beauty brands, new product releases, events needing expert coverage, fashion brands and jewellery & watch brands.",
  "We work with clients of all sizes, making the most of your budget to reach your goals. We’re here to build a strong working relationship, where you want to come back to us time and again because you trust what we can deliver.",
  <React.Fragment key="right-3">
    We have now opened our brand new{" "}
    <strong className="font-bold text-brand-teal">
      photography studio in London Waterloo
    </strong>
    , which gives us a great space to base our photography services from – and
    makes booking new projects easier than ever.
  </React.Fragment>,
];

const leftImages = [
  [
    "/figma/images/photo/photo-1.png",
    "Woman in a red patterned outfit holding flowers",
  ],
  ["/figma/images/photo/photo-2.png", "Man standing beside scooters"],
  ["/figma/images/photo/photo-3.png", "Hand adjusting a wristwatch"],
  [
    "/figma/images/photo/photo-4.png",
    "Gold sun pendant necklace above water",
  ],
];

const rightImages = [
  ["/figma/images/photo/serv-1.png", "Sushi arranged on a board"],
  ["/figma/images/photo/serv-2.png", "Eye with a makeup brush"],
  ["/figma/images/photo/serv-3.png", "DJ in a neon-lit setup"],
  ["/figma/images/photo/serv-4.png", "Cosmetic tube on a pink background"],
];

const ImageGrid = ({ images }) => (
  <div className="grid grid-cols-2 gap-3 sm:gap-[31px_33px]">
    {images.map(([src, alt]) => (
      <img
        key={src}
        src={src}
        alt={alt}
        width="307"
        height="307"
        className="aspect-square w-full object-cover"
        loading="lazy"
      />
    ))}
  </div>
);

const Copy = ({ paragraphs }) => (
  <div className="space-y-4 text-base font-medium leading-[1.4] tracking-[-0.5px] text-brand-slate sm:space-y-5 sm:text-lg sm:tracking-[-1px] xl:text-xl xl:leading-[1.22]">
    {paragraphs.map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ))}
  </div>
);

// Scales from ~44px on phones to the original 80px on desktop
const bannerText =
  "text-center text-[clamp(2.75rem,5.56vw,5rem)] font-extrabold leading-none tracking-[-1.6px]";

// Stacked (below xl): banner → copy → images. Side by side (xl+): the original layout.
const PhotographyServices = () => (
  <section className="relative overflow-hidden bg-brand-bg px-8 py-14 sm:px-12 sm:py-20 md:px-16 lg:px-[clamp(64px,4.5vw,150px)] xl:min-h-[1356px] xl:py-[140px] min-[1920px]:px-0">
    <h2 className="sr-only">Photography Services</h2>

    <div className="mx-auto grid max-w-[1316px] grid-cols-1 gap-14 sm:gap-16 xl:grid-cols-2 xl:gap-[34px]">
      {/* Photography */}
      <div className="flex flex-col">
        <div className="flex min-h-[96px] items-center justify-center bg-brand-accent-yellow px-4 py-4 sm:min-h-[122px] sm:px-6 xl:h-[122px] xl:py-0">
          <span aria-hidden="true" className={`${bannerText} text-black`}>
            Photography
          </span>
        </div>

        <div className="mt-6 sm:mt-8 xl:mt-[60px]">
          <Copy paragraphs={leftParagraphs} />
        </div>

        {/* Lowered further to align with Services bottom */}
        <div className="mt-8 sm:mt-10 xl:mt-[140px]">
          <ImageGrid images={leftImages} />
        </div>
      </div>

      {/* Services */}
      <div className="flex flex-col">
        <div className="order-3 mt-8 sm:mt-10 xl:order-1 xl:mt-0">
          <ImageGrid images={rightImages} />
        </div>

        <div className="order-2 mt-6 sm:mt-8 xl:mt-[56px]">
          <Copy paragraphs={rightParagraphs} />
        </div>

        {/* Keep the 60px space below the paragraph on desktop */}
        <div className="order-1 xl:order-3 xl:mt-[60px]">
          <div className="flex min-h-[72px] items-center justify-center bg-brand-teal px-4 py-3 sm:min-h-[88px] sm:px-6 xl:h-[88px] xl:py-0">
            <span aria-hidden="true" className={`${bannerText} text-white`}>
              Services
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PhotographyServices;
