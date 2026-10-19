import * as React from "react";
import { mediaUrl, mediaAlt } from "../../../utils/acf";

// Used by the Works page-builder sections (see WorksCategorySection.js etc.).
// Props: heading, categories (names), items (reel cards for the selected category),
// selectedCategory, onCategoryChange.

// Full class names so Tailwind / the stylesheet keep them.
const reelShapeClasses = {
  landscape: "works-reel-video",
  portrait: "works-reel-portrait",
  square: "works-reel-square",
};

const WorksCategoryReel = ({ heading = "", categories = [], items = [], selectedCategory = "", onCategoryChange = () => {} }) => {
  const [isPaused, setIsPaused] = React.useState(false);
  const reelItems = items.map((item) => {
    const videoSrc = mediaUrl(item.video);
    const shape = Array.isArray(item.shape) ? item.shape[0] : item.shape;
    return {
      name: item.name,
      type: item.typeLabel,
      src: videoSrc || mediaUrl(item.image),
      kind: videoSrc ? "video" : "image",
      alt: mediaAlt(item.image, item.name),
      aspect: reelShapeClasses[shape] || reelShapeClasses.landscape,
    };
  });
  const duplicatedItems = [...reelItems, ...reelItems, ...reelItems];
  const updateCategory = onCategoryChange;

  return (
    <section className="w-full overflow-hidden bg-brand-bg pb-16 pt-24 sm:pb-20 lg:pb-24 lg:pt-32">
      <div className="mx-auto max-w-layout-shell px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-[clamp(2rem,2.08vw,2.5rem)] font-extrabold leading-none tracking-[-0.05em] text-brand-teal max-[767px]:text-brand-text-dark">
          {heading}
        </h1>

        <nav className="mx-auto mt-8 flex max-w-[1100px] flex-wrap justify-center gap-6" aria-label="Work categories">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={isSelected}
                onClick={() => updateCategory(category)}
                className={`text-base transition-colors duration-200 ${
                  isSelected
                    ? "text-brand-yellow font-bold"
                    : "text-brand-slate hover:text-brand-yellow font-medium"
                }`}
              >
                {category}
              </button>
            );
          })}
        </nav>
      </div>

      {duplicatedItems.length > 0 && (
      <div className="works-reel-viewport mt-10 w-screen overflow-hidden">
        <div
          className="works-category-marquee flex gap-6"
          style={{
            animationPlayState: isPaused ? "paused" : "running",
            animationDuration: `${Math.max(11, reelItems.length * 3.7)}s`,
          }}
        >
          {duplicatedItems.map((item, index) => (
            <article 
              key={`${item.name}-${index}`} 
              className={`works-reel-card flex flex-col flex-shrink-0 bg-brand-bg ${item.aspect}`}
            >
              <div className="w-full flex-1 overflow-hidden">
                {item.kind === "video" ? (
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                    aria-label={`${item.name} preview video`}
                  />
                ) : (
                  <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
                )}
              </div>

              <div className="pt-2 flex items-center justify-between gap-4 bg-brand-bg text-sm font-medium text-brand-slate">
                <span>{item.name}</span>
                <span>{item.type}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
      )}

      <div className="relative mx-auto mt-10 flex max-w-layout-shell items-center justify-between px-4 sm:px-6 lg:mt-14 lg:px-8">
        <h2 className="text-[clamp(3rem,4.17vw,5rem)] font-extrabold leading-none tracking-[-0.05em] text-brand-teal">
          {selectedCategory.toUpperCase()}
        </h2>

        <button
          type="button"
          aria-label={isPaused ? "Play category reel" : "Pause category reel"}
          aria-pressed={isPaused}
          onClick={() => setIsPaused((current) => !current)}
          className="transition-transform active:scale-95 focus:outline-none"
        >
          <img
            src={isPaused ? "/figma/icons/media/icon-pause.svg" : "/figma/icons/media/icon-play-works.svg"}
            alt={isPaused ? "Play" : "Pause"}
            className="h-8 w-8"
          />
        </button>
      </div>

      <p className="mt-4 px-4 text-center text-sm font-medium italic text-brand-text-muted md:hidden">
        Tap on a Video/Photo for larger view
      </p>
    </section>
  );
};

export default WorksCategoryReel;