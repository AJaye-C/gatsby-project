import * as React from "react";
import { mediaUrl, mediaAlt, splitParagraphs } from "../../utils/acf";

// Page-builder layout: "badge_cards"  (fields: cardItems[{ title, text, badge }])
// Cards sit two per row from lg. The badge alternates: top-left on the 1st card, bottom-right
// on the 2nd, then repeats. A card without a badge image uses the static pound icons.

// Full class literals (gotcha 11). Smaller and pulled in on mobile so a badge never causes horizontal scroll.
const badgePositions = [
  "-left-3 -top-8 h-[72px] w-[72px] sm:-left-8 sm:-top-12 sm:h-[100px] sm:w-[100px] lg:-left-10 lg:-top-16 lg:h-[127px] lg:w-[127px]",
  "-bottom-8 -right-3 h-[76px] w-[76px] sm:-bottom-12 sm:-right-8 sm:h-[104px] sm:w-[104px] lg:-bottom-16 lg:-right-16 lg:h-[137px] lg:w-[137px]",
];

const fallbackBadges = ["/figma/icons/pound-2.svg", "/figma/icons/pound-3.svg"];

const BadgeCards = ({ cardItems = [] }) => {
  const cards = (cardItems || []).filter((card) => card && (card.title || card.text));
  if (cards.length === 0) return null;

  return (
    <section className="overflow-x-clip bg-brand-bg px-6 pb-14 pt-6 sm:px-10 md:pb-24 md:pt-0 lg:px-10 lg:pb-[116px] lg:pt-11 min-[1440px]:px-0">
      {/* Extra side margin on tablet/laptop so the overhanging badges stay on screen; back to full width at 1700px+ */}
      <div className="mx-auto grid max-w-[1380px] grid-cols-1 gap-14 lg:mx-10 lg:grid-cols-2 lg:gap-10 min-[1440px]:mx-12 min-[1440px]:gap-[74px] min-[1700px]:mx-auto">
        {cards.map((card, index) => {
          const badgeSrc = mediaUrl(card.badge) || fallbackBadges[index % fallbackBadges.length];
          const paragraphs = splitParagraphs(card.text);

          return (
            <article
              key={`${card.title}-${index}`}
              className="relative flex flex-col justify-center bg-brand-teal px-6 py-12 text-white sm:px-14 sm:py-16 lg:min-h-[547px] lg:px-10 min-[1440px]:px-[62px]"
            >
              <img
                src={badgeSrc}
                alt={mediaAlt(card.badge, "")}
                aria-hidden="true"
                className={`pointer-events-none absolute z-10 max-w-none ${badgePositions[index % badgePositions.length]}`}
              />
              {card.title && (
                <h3 className="relative z-0 text-center text-2xl font-bold leading-[1.23] tracking-[-1px] sm:text-4xl sm:tracking-[-1.5px] lg:text-[40px] lg:tracking-[-2px]">
                  {card.title}
                </h3>
              )}
              {paragraphs.length > 0 && (
                <div className="relative z-0 mt-6 space-y-4 text-lg font-medium leading-snug tracking-[-0.5px] sm:mt-10 sm:text-xl sm:tracking-[-1px] lg:mt-16 lg:leading-[1.23]">
                  {paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default BadgeCards;
