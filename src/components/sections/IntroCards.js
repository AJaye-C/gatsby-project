import * as React from "react";
import { Link } from "gatsby";
import { cleanWpHtml } from "../../utils/RichText";
import { mediaUrl, splitParagraphs } from "../../utils/acf";

// Page-builder layout: "intro_cards"
// (fields: heading WYSIWYG [bold = teal, italic = bold dark], text, buttonLabel, buttonLink,
//  introCardItems [heading (lines), text, icon]). Cards alternate teal / yellow; the first card
// has the large heading.
const BUTTON_CLASS =
  "group mx-auto mt-[68px] flex h-[48px] w-fit min-w-[199px] items-center gap-[7px] rounded-[16px] bg-brand-accent-yellow px-[13px] py-3 text-[18px] font-medium leading-none tracking-[-0.36px] text-black shadow-talk transition-colors duration-200 hover:bg-brand-teal hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 lg:mx-0";

const IntroCards = ({ heading, text, buttonLabel, buttonLink, introCardItems = [] }) => {
  const cards = (introCardItems || []).filter(Boolean);
  const paragraphs = splitParagraphs(text || "");

  const buttonContent = (
    <>
      <img
        src="/figma/icons/contact-email.svg"
        alt=""
        aria-hidden="true"
        className="h-6 w-6 transition duration-200 group-hover:brightness-0 group-hover:invert"
      />
      <span>{buttonLabel}</span>
    </>
  );

  return (
    <section className="bg-brand-bg px-[clamp(24px,8vw,150px)] pb-20 pt-[128px] lg:min-h-[826px] lg:pb-[clamp(72px,8vw,120px)] lg:pt-[172px] min-[1920px]:px-0 min-[1920px]:pb-0">
      <div className="mx-auto grid max-w-[1510px] grid-cols-1 gap-14 lg:items-center xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] xl:gap-[5vw] min-[1920px]:grid-cols-[minmax(0,598px)_minmax(0,794px)] min-[1920px]:gap-[70px]">
        <div className="lg:pt-[123px]">
          {heading && (
            <h1
              className="max-w-[598px] text-[clamp(2.5rem,2.083vw,2.5rem)] font-normal leading-[1.24] tracking-[-2px] text-brand-slate [&_em]:font-extrabold [&_em]:not-italic [&_strong]:font-extrabold [&_strong]:text-brand-teal"
              dangerouslySetInnerHTML={{ __html: cleanWpHtml(heading) }}
            />
          )}

          {paragraphs.length > 0 && (
            <div className="mt-[68px] max-w-[598px] space-y-4 text-[20px] font-medium leading-[1.3] tracking-[-1px] text-brand-slate">
              {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          )}

          {buttonLabel && buttonLink && (
            buttonLink.startsWith("/") ? (
              <Link to={buttonLink} className={BUTTON_CLASS}>{buttonContent}</Link>
            ) : (
              <a href={buttonLink} className={BUTTON_CLASS}>{buttonContent}</a>
            )
          )}
        </div>

        <div className="flex flex-col gap-[27px]">
          {cards.map((card, index) => {
            const lead = index === 0;
            // Default to the respective hard-coded icon and dimensions from HowWeWorkIntro if blank[cite: 2]
            const defaultIcon = lead ? "/figma/icons/stairs.svg" : "/figma/icons/flag.svg";
            const icon = mediaUrl(card.icon) || defaultIcon;
            const iconClassName = lead ? "h-[77px] w-[87px] shrink-0" : "h-[79px] w-[69px] shrink-0";
            
            const lines = splitParagraphs(card.heading || "");
            const cardParagraphs = splitParagraphs(card.text || "");
            
            return (
              <article
                key={index}
                className={`relative px-[75px] pb-8 ${index % 2 === 0 ? "bg-brand-teal text-white" : "bg-brand-accent-yellow text-black"} ${lead ? "min-h-[266px] pt-[25px]" : "min-h-[278px] pt-[37px]"}`}
              >
                <div className={`flex items-center ${lead ? "gap-[12px]" : "gap-[16px]"}`}>
                  {icon && <img src={icon} alt="" aria-hidden="true" className={iconClassName} />}
                  <h2 className={lead ? "text-[clamp(3.5rem,4.167vw,5rem)] font-bold leading-[1.26] tracking-[-4px]" : "max-w-[500px] text-[clamp(2rem,2.083vw,2.5rem)] font-bold leading-[1.26] tracking-[-2px]"}>
                    {lines.map((line, lineIndex) => (
                      <React.Fragment key={lineIndex}>
                        {lineIndex > 0 && <br />}
                        {line}
                      </React.Fragment>
                    ))}
                  </h2>
                </div>
                {cardParagraphs.length > 0 && (
                  <div className={`max-w-[647px] space-y-4 text-[20px] font-medium leading-[1.26] tracking-[-1px] ${lead ? "mt-[27px]" : "mt-[25px]"}`}>
                    {cardParagraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IntroCards;