import * as React from "react";
import { photographyCategories, photographyGallery } from "../../data/photography";

const PhotographySection = ({ activeCategory, setActiveCategory }) => {
  const [isLetsTalkHovered, setIsLetsTalkHovered] = React.useState(false);

  return (
    <section className="relative w-full bg-brand-bg py-16 sm:py-20 lg:py-24">
      <button
        type="button"
        aria-label="Let's talk"
        className="photography-cta section-three-cta absolute right-4 top-2 z-20 sm:right-8 sm:top-4 md:right-6 lg:right-12 xl:right-[12%] 2xl:right-[18%]"
        onMouseEnter={() => setIsLetsTalkHovered(true)}
        onMouseLeave={() => setIsLetsTalkHovered(false)}
      >
        <img
          src={isLetsTalkHovered ? "/figma/icons/lets-talk-hvr.svg" : "/figma/icons/lets-talk.svg"}
          alt="Let's talk"
          className="h-[96px] w-[96px] object-contain drop-shadow-[0_8px_20px_rgba(23,156,189,0.28)] sm:h-[104px] sm:w-[104px] md:h-[110px] md:w-[110px] lg:h-[116px] lg:w-[116px]"
        />
      </button>

      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <div className="flex items-center gap-3">
          <img
            src="/figma/icons/icon-shutter.svg"
            alt="Photography shutter icon"
            className="h-8 w-8 object-contain md:h-10 md:w-10"
          />
          <h2 className="text-2xl font-medium tracking-tight text-brand-slate md:text-3xl">
            Photography
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 items-center gap-4 md:grid-cols-12 md:gap-2 lg:gap-4">
          <div className="order-2 md:order-1 md:col-span-5 lg:col-span-4">
            <div className="flex flex-col border-t border-black/10">
              {photographyCategories.map((category) => {
                const isActive = activeCategory === category.key;
                const label = isActive ? `View ${category.label}` : category.label;

                return (
                  <button
                    key={category.key}
                    type="button"
                    onMouseEnter={() => setActiveCategory(category.key)}
                    onFocus={() => setActiveCategory(category.key)}
                    className={`flex w-full items-center justify-start border-b border-black/10 py-3 text-left text-[1.4rem] font-black tracking-[-0.04em] transition-all duration-150 sm:text-[1.65rem] md:text-[2rem] ${
                      isActive
                        ? "text-brand-yellow"
                        : "text-brand-slate hover:text-brand-yellow"
                    }`}
                  >
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="order-1 w-full md:order-2 md:col-span-7 lg:col-span-8">
            <div className="relative ml-0 overflow-hidden md:ml-[7rem] md:w-[calc(100%+12rem)] lg:ml-[9rem] lg:w-[calc(100%+14rem)]">
              <img
                src={photographyGallery[activeCategory]}
                alt={`${activeCategory} photography showcase`}
                className="block h-[300px] w-full object-cover object-center transition-all duration-300 sm:h-[360px] md:h-[560px] md:max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotographySection;
