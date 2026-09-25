import * as React from "react";

const blocks = [
  {
    eyebrow: "We’re a",
    highlight: "video production",
    suffix: "company,",
    paragraphs: [
      "As a video production company, we deliver high quality and engaging content for commercial, corporate, and promotional use. We create TV adverts, brand films, promotional videos, crowdfunding campaign videos, and video content for social media. Our professional video team knows how to craft the right elements together to convey your messages and tell your story.",
      "What are you looking for in a video production company? If it’s a creative team who are trustworthy, knowledgeable, enjoyable to work with and well-priced, then we might just be the right fit for you."
    ],
    image: "/figma/images/vidprod-about-1.png",
    imageAlt: "Video production team capturing a branded shoot",
    reverse: false,
  },
  {
    eyebrow: "and a",
    highlight: "photography",
    suffix: "company too...",
    paragraphs: [
      "As a photography company, we’re able to squeeze every pixel to deliver images that perform. A photographer must know how to communicate, and view a project from different perspectives, knowing how to create images that jump out and catch attention. We strive to do just that. We offer product photography, people photography and lifestyle photography across a wide range of sectors.",
      "As a content creation company, we know how to give you the best of both worlds: through the use of video production to tell a story across multiple shots, or where a single photograph has to say it all."
    ],
    image: "/figma/images/vidprod-about-2.png",
    imageAlt: "Photography team capturing a lifestyle commercial image",
    reverse: true,
  },
];

const AboutCompanyTypes = () => {
  return (
    <section className="w-full overflow-hidden bg-brand-bg py-12 md:py-16 lg:py-20">
      {blocks.map(({ eyebrow, highlight, suffix, paragraphs, image, imageAlt, reverse }, index) => {
        // Eased-back negative margin for a subtle overlap
        const verticalShift = index === 0 ? "z-0" : "-mt-4 sm:-mt-6 lg:-mt-12 z-10";

        return (
          <div key={highlight} className={`relative ${verticalShift}`}>
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-0">
              {/* Text Column */}
              <div
                className={`flex items-center px-4 sm:px-6 lg:px-6 xl:px-10 2xl:px-14 ${
                  reverse ? "lg:order-2 lg:justify-start" : "lg:order-1 lg:justify-end"
                }`}
              >
                <div className="w-full max-w-[760px]">
                  <h2 className="mb-10 text-display-hero font-bold sm:text-display-hero-sm md:text-display-hero-md lg:text-display-hero-lg 2xl:text-display-hero-2xl">
                    <span className="font-medium text-brand-slate">{eyebrow}</span>{" "}
                    <span className="font-black text-brand-cyan">{highlight}</span>{" "}
                    <span className="font-medium text-brand-slate">{suffix}</span>
                  </h2>

                  <div className="space-y-4 max-w-[760px] text-justify text-base leading-[1.7] text-brand-body-muted sm:text-lg">
                    {paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image Column */}
              <div className={`w-full ${reverse ? "lg:order-1" : "lg:order-2"}`}>
                <img
                  src={image}
                  alt={imageAlt}
                  className={`h-[300px] w-full object-cover sm:h-[380px] lg:h-[520px] xl:h-[580px] lg:max-w-[85%] ${
                    reverse ? "mr-auto" : "ml-auto"
                  }`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default AboutCompanyTypes;