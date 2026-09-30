import * as React from "react";

const placeholderCopy = "Lorem ipsum dolor sit amet consectetur. Morbi mi elit vulputate aliquet amet. Consectetur imperdiet ac tortor urna. Amet convallis cras amet tortor massa odio consectetur. Nunc egestas euismod odio ullamcorper. Risus pharetra massa quam tincidunt odio senectus nunc pulvinar nisl. Commodo mattis quis mauris libero aliquet nunc quis aliquam. Ultricies.";

const ServicesProcessSection = ({ id, headingColors, rows }) => (
  <section id={id} className="services-video-process">
    <div className="mx-auto max-w-[1440px] px-4 pb-16 pt-16 sm:px-6 md:pb-20 md:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
      <h2 className="max-w-[720px] text-[clamp(2.2rem,4.17vw,5rem)] font-extrabold leading-none tracking-[-0.05em] lg:max-w-none lg:whitespace-nowrap">
        <span className={headingColors.first}>{"The process: "}</span>
        <span className={headingColors.second}>making it easy for you</span>
      </h2>
    </div>

    <div className="services-video-process-rows w-full pb-20 sm:pb-28 md:pb-36 lg:pb-44">
      {rows.map((row) => {
        const isImageLeft = row.imageSide === "left";

        // Stacked (below lg): text is always first, image second.
        // Desktop (lg+): image-left rows swap so the image sits on the left.
        const text = (
          <div
            className={`services-video-process-copy ${
              row.imageSide === "right" ? "services-video-process-copy-align-end" : ""
            } ${isImageLeft ? "order-1 lg:order-2" : "order-1 lg:order-1"}`}
          >
            <h3>{row.title}</h3>
            <h4>{row.subtitle}</h4>
            <p>{row.copy || placeholderCopy}</p>
          </div>
        );

        const image = (
          <div
            className={`services-video-process-image services-video-process-image-${row.imageSide} ${
              isImageLeft ? "order-2 lg:order-1" : "order-2 lg:order-2"
            }`}
          >
            <img src={row.image} alt={row.alt} />
          </div>
        );

        return (
          <div
            key={row.title}
            className={`services-video-process-row services-video-process-row-image-${row.imageSide}`}
          >
            {isImageLeft ? image : text}
            {isImageLeft ? text : image}
          </div>
        );
      })}
    </div>
  </section>
);

export default ServicesProcessSection;