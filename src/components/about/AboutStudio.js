import * as React from "react";
import { cleanWpHtml } from "../home/RichText";
import { mediaUrl, mediaAlt } from "../../utils/acf";

// Page-builder layout: "studio_intro"
// Fields: heading (Text), body (WYSIWYG: bold = white), button_label, button_link, image, badge
const AboutStudio = ({ heading, body, buttonLabel, buttonLink, image, badge }) => {
  const [isMailHovered, setIsMailHovered] = React.useState(false);

  const ButtonTag = buttonLink ? "a" : "button";
  const buttonProps = buttonLink ? { href: buttonLink } : { type: "button" };
  const badgeSrc = mediaUrl(badge) || "/figma/icons/us-about.svg";

  return (
    <section className="w-full bg-brand-teal py-16 text-white lg:py-20">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-[1453px] text-[clamp(2.5rem,4vw,5rem)] font-extrabold leading-[1] tracking-[-0.04em] text-white">
          {heading}
        </h2>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="pr-0 lg:pr-4">
            <div
              className="max-w-copy-video text-body-copy text-black [&_strong]:font-bold [&_strong]:text-white"
              dangerouslySetInnerHTML={{ __html: cleanWpHtml(body) }}
            />

            {buttonLabel && (
              <ButtonTag
                {...buttonProps}
                aria-label={buttonLabel}
                className="group mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full bg-brand-yellow text-left text-brand-text-dark shadow-[0_4px_10px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out"
                onMouseEnter={() => setIsMailHovered(true)}
                onMouseLeave={() => setIsMailHovered(false)}
                onFocus={() => setIsMailHovered(true)}
                onBlur={() => setIsMailHovered(false)}
                style={{
                  width: isMailHovered ? "230px" : "70px",
                  height: "71px",
                  padding: isMailHovered ? "0 24px 0 0" : "0",
                }}
              >
                <span className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full bg-brand-yellow text-brand-text-dark">
                  <img src="/figma/icons/msg-us.svg" alt="" aria-hidden="true" className="h-[22px] w-[22px] object-contain" />
                </span>

                <span
                  className={`whitespace-nowrap text-[0.82rem] font-black uppercase tracking-[0.08em] text-brand-text-dark transition-opacity duration-300 ${
                    isMailHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {buttonLabel}
                </span>
              </ButtonTag>
            )}
          </div>

          <div className="relative mx-auto w-full max-w-[689px] lg:mx-0">
            <div className="relative aspect-[689/399] overflow-hidden rounded-[22px] shadow-[0_10px_18px_rgba(0,0,0,0.12)]">
              <img
                src={mediaUrl(image)}
                alt={mediaAlt(image, "Pocket Creatives team")}
                className="h-full w-full object-cover"
              />
            </div>

            <img
              src={badgeSrc}
              alt={mediaAlt(badge, "This is us!")}
              className="absolute -left-8 -top-8 z-10 h-[109px] w-[109px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStudio;
