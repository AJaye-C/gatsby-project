import * as React from "react";
import { Link } from "gatsby";
import { mediaUrl, mediaAlt, splitParagraphs } from "../../utils/acf";

// Page-builder layout: "page_hero"
// Fields: heading_text, heading_logo, video, paragraph,
//         chat_button_label, chat_button_tooltip, chat_button_link,
//         secondary_button_label, secondary_button_link
const isInternal = (href = "") => href.startsWith("/") && !href.startsWith("//");

const AboutHero = ({
  headingText,
  headingLogo,
  video,
  paragraph,
  chatButtonLabel,
  chatButtonTooltip,
  chatButtonLink,
  secondaryButtonLabel,
  secondaryButtonLink,
}) => {
  const [isChatHovered, setIsChatHovered] = React.useState(false);
  const [isHeroMuted, setIsHeroMuted] = React.useState(true);

  const videoSrc = mediaUrl(video);
  const logoSrc = mediaUrl(headingLogo) || "/figma/images/logo-long.png";
  const ChatTag = chatButtonLink ? "a" : "button";
  const chatProps = chatButtonLink ? { href: chatButtonLink } : { type: "button" };

  const secondaryClasses =
    "inline-flex items-center bg-brand-accent-yellow px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-black shadow-[0_6px_18px_rgba(0,0,0,0.18)] transition-colors duration-200 hover:bg-brand-teal hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2";

  return (
    <section className="mx-auto max-w-layout-shell px-4 pb-14 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div>
        <p className="text-[clamp(2.8rem,4vw,4.3rem)] font-medium leading-none tracking-[-0.06em] text-brand-slate">
          {headingText}
        </p>
        <img
          src={logoSrc}
          alt={mediaAlt(headingLogo, "Pocket Creatives")}
          className="mt-1 h-[44px] w-auto object-contain sm:h-[58px] lg:h-[72px] 2xl:h-[84px]"
        />
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          {videoSrc && (
            <>
              <div className="overflow-hidden border border-brand-line shadow-[0_12px_22px_rgba(0,0,0,0.08)]">
                <video
                  src={videoSrc}
                  autoPlay
                  loop
                  muted={isHeroMuted}
                  playsInline
                  onClick={() => setIsHeroMuted((current) => !current)}
                  aria-label="Page hero video"
                  role="button"
                  className="h-[240px] w-full object-cover sm:h-[320px] lg:h-[380px]"
                />
              </div>
              <p className="mt-3 text-left text-micro-note font-medium italic text-brand-subtle-muted">
                *Click on Video to toggle sound
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col items-end text-right">
          {splitParagraphs(paragraph).map((text, index) => (
            <p
              key={index}
              className="ml-auto max-w-[31rem] text-base leading-[1.75] text-brand-body-muted sm:text-lg"
            >
              {text}
            </p>
          ))}

          <div className="mt-8 flex flex-wrap justify-end gap-3">
            {chatButtonLabel && (
              <ChatTag
                {...chatProps}
                className="group relative inline-flex items-center gap-3 bg-brand-cyan px-5 py-3 text-sm font-black font-medium uppercase tracking-[0.08em] text-brand-text-dark shadow-[0_6px_18px_rgba(0,102,153,0.18)] transition-all duration-200 hover:bg-[#0d9ec6]"
                onMouseEnter={() => setIsChatHovered(true)}
                onMouseLeave={() => setIsChatHovered(false)}
                onFocus={() => setIsChatHovered(true)}
                onBlur={() => setIsChatHovered(false)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                  <path d="M3 6.25A2.25 2.25 0 0 1 5.25 4h13.5A2.25 2.25 0 0 1 21 6.25v11.5A2.25 2.25 0 0 1 18.75 20H5.25A2.25 2.25 0 0 1 3 17.75V6.25Zm2.1-.25 6.9 5.5 6.9-5.5H5.1Zm13.15 1.2-6.47 5.17a1 1 0 0 1-1.16 0L5.75 7.2v10.55h12.5V7.2Z" />
                </svg>
                {chatButtonLabel}

                {chatButtonTooltip && (
                  <span
                    className={`pointer-events-none absolute bottom-[calc(100%+0.75rem)] left-1/2 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-[18px] bg-brand-cyan px-3.5 py-2.5 text-[0.72rem] font-medium normal-case leading-[1.3] tracking-normal text-white shadow-[0_10px_22px_rgba(0,0,0,0.12)] transition-all duration-200 ${
                      isChatHovered ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                    }`}
                  >
                    <span className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[8px] border-b-0 border-t-[10px] border-x-transparent border-t-brand-cyan" />
                    {chatButtonTooltip}
                  </span>
                )}
              </ChatTag>
            )}

            {secondaryButtonLabel &&
              secondaryButtonLink &&
              (isInternal(secondaryButtonLink) ? (
                <Link to={secondaryButtonLink} className={secondaryClasses}>
                  {secondaryButtonLabel}
                </Link>
              ) : (
                <a href={secondaryButtonLink} className={secondaryClasses}>
                  {secondaryButtonLabel}
                </a>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
