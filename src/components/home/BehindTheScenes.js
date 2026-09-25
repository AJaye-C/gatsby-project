import * as React from "react";
import ReviewsCarousel from "./ReviewsCarousel";

const BehindTheScenes = ({ btsMuted, setBtsMuted }) => (
  <section className="w-full bg-brand-bg py-16 sm:py-20 lg:py-24">
    <div className="mx-auto max-w-layout-shell px-6 sm:px-10 lg:px-12">
      <div className="mb-12 grid grid-cols-1 items-center gap-8 lg:mb-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-brand-slate sm:text-5xl lg:text-6xl">
            Go behind the scenes of our <span className="relative inline-block underline decoration-brand-teal decoration-4 underline-offset-8 text-brand-teal">5 Star</span> Service
          </h2>

          <div className="mt-6 flex items-center gap-3">
            <img 
                src="/figma/icons/icon-google.svg" 
                alt="Google reviews" 
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain" 
            />
            <div className="max-w-[145px] text-lg font-bold leading-tight text-brand-slate sm:max-w-[180px] sm:text-xl">
                <span className="block">Based on</span>
                <span className="block">88 reviews</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="mb-2 max-w-copy-video text-left text-xs italic text-gray-500 lg:ml-auto">*Click on Video to toggle sound</div>
          <div className="w-full max-w-copy-video overflow-hidden rounded-[20px] bg-gray-200 shadow-md lg:ml-auto">
            <video
              src="/figma/videos/bts.mp4"
              autoPlay
              loop
              muted={btsMuted}
              playsInline
              onClick={() => setBtsMuted((current) => !current)}
              className="aspect-[16/10] w-full cursor-pointer object-cover"
              aria-label="Behind the scenes video"
            />
          </div>
        </div>
      </div>

      <ReviewsCarousel />
    </div>
  </section>
);

export default BehindTheScenes;