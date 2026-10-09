import * as React from "react";
import { cleanWpHtml, wpPlainText } from "../home/RichText";
import { mediaUrl, mediaAlt, splitParagraphs } from "../../utils/acf";

// Page-builder layout: "image_text_rows"
// Fields: rows (Repeater: heading [WYSIWYG, bold = cyan], paragraphs [Text Area], image)
// Rows alternate automatically: 1st = image on the right, 2nd = image on the left, and so on.
const AboutCompanyTypes = ({ rows = [] }) => (
  <section className="w-full overflow-hidden bg-brand-bg py-12 md:py-16 lg:py-20">
    {rows.map(({ heading, paragraph, image }, index) => {
      const reverse = index % 2 === 1;
      const verticalShift = index === 0 ? "z-0" : "z-10";

      return (
        <div key={index} className={`relative ${verticalShift}`}>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-0">
            {/* Text Column */}
            <div
              className={`flex items-center px-4 sm:px-6 lg:px-6 xl:px-10 2xl:px-14 ${
                reverse ? "lg:order-2 lg:justify-start" : "lg:order-1 lg:justify-end"
              }`}
            >
              <div className="w-full max-w-[760px]">
                <h2
                  className="mb-10 text-display-hero font-medium text-brand-slate sm:text-display-hero-sm md:text-display-hero-md lg:text-display-hero-lg 2xl:text-display-hero-2xl [&_strong]:font-black [&_strong]:text-brand-cyan"
                  dangerouslySetInnerHTML={{ __html: cleanWpHtml(heading) }}
                />

                <div className="space-y-4 max-w-[760px] text-justify text-base leading-[1.7] text-brand-body-muted sm:text-lg">
                  {splitParagraphs(paragraph).map((text, idx) => (
                    <p key={idx}>{text}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Image Column */}
            <div className={`w-full ${reverse ? "lg:order-1" : "lg:order-2"}`}>
              <img
                src={mediaUrl(image)}
                alt={mediaAlt(image, wpPlainText(heading))}
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

export default AboutCompanyTypes;
