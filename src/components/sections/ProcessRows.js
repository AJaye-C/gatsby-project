import * as React from "react";
import RichText from "../../utils/RichText";
import { mediaAlt, mediaUrl, splitParagraphs } from "../../utils/acf";

// Page-builder layout: "process_rows"
// Fields: anchor_id, heading (WYSIWYG: bold = teal, italic = yellow),
//         process_steps (Repeater: title, subtitle, text Text Area, image)  -> queried as `steps`
// The image side alternates automatically: right, left, right ...
const ProcessRows = ({ anchorId, heading, steps = [] }) => (
  <section id={anchorId || undefined} className="services-video-process">
    <div className="mx-auto max-w-[1440px] px-4 pb-16 pt-16 sm:px-6 md:pb-20 md:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
      {heading && (
        <RichText
          as="h2"
          html={heading}
          weight="extrabold"
          className="max-w-[720px] text-[clamp(2.2rem,4.17vw,5rem)] font-extrabold leading-none tracking-[-0.05em] lg:max-w-none lg:whitespace-nowrap"
        />
      )}
    </div>

    <div className="services-video-process-rows w-full pb-20 sm:pb-28 md:pb-36 lg:pb-44">
      {(steps || []).map((step, index) => {
        const imageSide = index % 2 === 0 ? "right" : "left";
        const isImageLeft = imageSide === "left";
        const src = mediaUrl(step.image);

        // Stacked (below lg): text first, image second.
        // Desktop (lg+): image-left rows swap so the image sits on the left.
        const text = (
          <div
            className={`services-video-process-copy ${
              imageSide === "right" ? "services-video-process-copy-align-end" : ""
            } ${isImageLeft ? "order-1 lg:order-2" : "order-1 lg:order-1"}`}
          >
            {step.title && <h3>{step.title}</h3>}
            {step.subtitle && <h4>{step.subtitle}</h4>}
            {splitParagraphs(step.text).map((line, lineIndex) => (
              <p key={lineIndex}>{line}</p>
            ))}
          </div>
        );

        const image = (
          <div
            className={`services-video-process-image services-video-process-image-${imageSide} ${
              isImageLeft ? "order-2 lg:order-1" : "order-2 lg:order-2"
            }`}
          >
            {/* Figma size is 1039 x 479 (~2.17:1). Locked here so any uploaded image is cropped to fit.
                The ! prefixes beat the global .services-video-process-image img rules. */}
            {src && (
              <img
                src={src}
                alt={mediaAlt(step.image, step.title || "")}
                className="block !aspect-[1039/479] !h-auto !w-full !object-cover"
              />
            )}
          </div>
        );

        return (
          <div
            key={`${step.title}-${index}`}
            className={`services-video-process-row services-video-process-row-image-${imageSide}`}
          >
            {isImageLeft ? image : text}
            {isImageLeft ? text : image}
          </div>
        );
      })}
    </div>
  </section>
);

export default ProcessRows;