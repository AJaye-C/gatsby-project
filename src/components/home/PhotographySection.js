import * as React from "react";
import { photographyCategories, photographyGallery } from "../../data/photography";

const LetsTalkButton = ({ className = "" }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      type="button"
      aria-label="Let's talk"
      className={`section-three-cta ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={isHovered ? "/figma/icons/lets-talk-hvr.svg" : "/figma/icons/lets-talk.svg"}
        alt="Let's talk"
        className="h-[96px] w-[96px] object-contain drop-shadow-[0_8px_20px_rgba(23,156,189,0.28)] sm:h-[104px] sm:w-[104px] md:h-[110px] md:w-[110px] lg:h-[116px] lg:w-[116px]"
      />
    </button>
  );
};

const PhotographySection = ({ activeCategory, setActiveCategory }) => {
  return (
    <section className="relative w-full overflow-x-clip bg-brand-bg py-16 sm:py-20 lg:py-24">
      {/* sm+: floating top-right as before (hidden on mobile) */}
      <LetsTalkButton className="photography-cta absolute right-8 top-4 z-20 hidden sm:block md:right-6 lg:right-12 xl:right-[12%] 2xl:right-[18%]" />

      <div className="mx-auto max-w-layout-shell px-6 sm:px-10 lg:px-12">
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

        <div className="mt-10 grid grid-cols-1 items-center gap-4 lg:grid-cols-12 lg:gap-4">
          <div className="order-2 lg:order-1 lg:col-span-4">
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
                    onClick={() => setActiveCategory(category.key)}
                    className={`flex min-h-[48px] w-full items-center justify-start border-b border-black/10 py-3 text-left text-photo-menu font-black transition-all duration-150 sm:text-photo-menu-sm md:text-photo-menu-md ${
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

          <div className="order-1 w-full lg:order-2 lg:col-span-8">
            <div className="relative ml-0 overflow-hidden rounded-[16px] lg:ml-[9rem] lg:w-[calc(100%+14rem)] lg:rounded-none">
              <img
                src={photographyGallery[activeCategory]}
                alt={`${activeCategory} photography showcase`}
                className="block h-[300px] w-full object-cover object-center transition-all duration-300 sm:h-[380px] md:h-[460px] lg:h-[560px] lg:max-w-none"
              />
            </div>
          </div>
        </div>

        {/* Mobile only: CTA stacked at the bottom of the section */}
        <div className="mt-8 flex justify-center sm:hidden">
          <LetsTalkButton />
        </div>
      </div>
    </section>
  );
};

export default PhotographySection;