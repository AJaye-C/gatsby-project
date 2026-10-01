import * as React from "react";

const VideoCTABanner = () => (
  <section className="w-full bg-brand-yellow py-16 text-white sm:py-24 md:py-36 lg:py-44 xl:py-52">
    <div className="mx-auto max-w-[940px] px-5 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 md:gap-10">
        <h2 className="max-w-content-cta text-display-banner font-black text-white">
          Take a look at some of our video work...
        </h2>

        <div className="flex flex-col items-start gap-6 sm:flex-row sm:gap-8 md:gap-12">
          <p className="max-w-copy-video text-body-copy text-[#1f2937]">
            Lorem ipsum dolor sit amet consectetur. Placerat quisque feugiat porta quam ornare. In nec lacinia consectetur placerat vestibulum sem odio. In feugiat elit fames eget lobortis turpis scelerisque tincidunt. Enim.
          </p>
          <div className="mt-1 flex shrink-0 items-start justify-center self-center sm:self-start">
            <img
              src="/figma/icons/icon-down.svg"
              alt="Scroll down"
              className="section-two-arrow h-20 w-20 max-w-none object-contain sm:h-28 sm:w-28 md:h-36 md:w-36"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default VideoCTABanner;
