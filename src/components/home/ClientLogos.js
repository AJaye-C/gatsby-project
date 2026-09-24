import * as React from "react";
import { firstSlide, secondSlide } from "../../data/clients";

const ClientLogos = () => (
  <div className="carousel-viewport pb-1 pt-1 mx-auto xl:mx-0">
    <div className="client-marquee">
      {[firstSlide, secondSlide].map((slide, slideIndex) => (
        <div key={slideIndex} className="flex-shrink-0">
          <div className="logo-grid">
            {slide.map((logo, logoIndex) => (
              <div
                key={`${slideIndex}-${logo.name}-${logoIndex}`}
                className="flex h-[95px] items-center justify-center rounded-[18px] border border-brand-soft bg-white p-3 shadow-[0_5px_14px_rgba(0,0,0,0.06)]"
              >
                <img src={logo.src} alt={logo.name} className="max-h-[44px] w-auto max-w-[82%] object-contain" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ClientLogos;
