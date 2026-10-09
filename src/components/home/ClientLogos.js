import * as React from "react";
import { firstSlide, secondSlide } from "../../data/clients";

// `slides` = array of arrays of { name, src, alt }. Falls back to the static data file.
// A single slide is repeated once so the marquee can loop.
const ClientLogos = ({ slides, className = "" }) => {
  const slideList = slides && slides.length ? slides : [firstSlide, secondSlide];
  const isRepeated = slideList.length === 1;
  const renderedSlides = isRepeated ? [slideList[0], slideList[0]] : slideList;

  return (
  <div className={`carousel-viewport mx-auto pb-1 pt-1 xl:mx-0 ${className}`}>
    <div className="client-marquee">
      {renderedSlides.map((slide, slideIndex) => (
        <div key={slideIndex} className="flex-shrink-0" aria-hidden={isRepeated && slideIndex > 0 ? "true" : undefined}>
          <div className="logo-grid">
            {slide.map((logo, logoIndex) => (
              <div
                key={`${slideIndex}-${logo.name}-${logoIndex}`}
                className="flex h-[95px] items-center justify-center rounded-[18px] border border-brand-soft bg-white p-3 shadow-[0_5px_14px_rgba(0,0,0,0.06)]"
              >
                <img src={logo.src} alt={logo.alt || logo.name} className="max-h-[44px] w-auto max-w-[82%] object-contain" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default ClientLogos;
