import * as React from "react";

const placeholderCopy = "Lorem ipsum dolor sit amet consectetur. Nulla purus rhoncus at mattis. Et ac vitae ornare volutpat. Mollis sem scelerisque dictum nunc iaculis vivamus donec. Molestie sed mattis aenean sit arcu ipsum amet vulputate tellus. Blandit pellentesque magna egestas eget rhoncus tincidunt. In ultrices velit et velit morbi vitae dolor fames. Rhoncus.";

const WorksGoToLink = ({ href, children }) => (
  <a href={href} className="works-intro-link group flex w-full max-w-[410px] items-center gap-3">
    <img src="/figma/icons/icon-arrow.svg" alt="" aria-hidden="true" className="works-intro-arrow-icon" />
    <span className="works-intro-link-label font-extrabold leading-[1.25] tracking-[-0.05em] text-white group-hover:underline">
      {children}
    </span>
  </a>
);

const WorksGoTo = ({ selectedCategory = "Beauty" }) => (
  <section className="relative left-1/2 w-screen -translate-x-1/2 bg-brand-accent-yellow px-4 py-24 text-black sm:px-6 md:py-32 lg:px-8 lg:py-40">
    <div className="mx-auto grid max-w-layout-shell gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:grid-rows-[auto_auto] lg:gap-x-24 lg:gap-y-16">
      <h2 className="text-[clamp(3.5rem,6vw,7.5rem)] font-extrabold leading-[0.92] tracking-[-0.06em] text-white lg:col-start-1 lg:row-start-1">
        Category:
        <br />
        {selectedCategory}
      </h2>

      <p className="mt-16 text-xl font-medium leading-[2] tracking-[-0.05em] text-black lg:col-start-1 lg:row-start-2 lg:mt-0 lg:max-w-[80%]">
        {placeholderCopy}
      </p>

      {/* Row-2 placement aligns this column's top with the paragraph above, not the heading */}
      <div className="lg:col-start-2 lg:row-start-2">
        <p className="text-xl font-extrabold leading-[1.25] tracking-[-0.05em] text-black">Go to...</p>
        <div className="mt-8 flex flex-col gap-5">
          <WorksGoToLink href="/works/#works-videography">More {selectedCategory} Videography</WorksGoToLink>
          <WorksGoToLink href="/works/#works-photography">More {selectedCategory} Photography</WorksGoToLink>
        </div>
      </div>
    </div>
  </section>
);

export default WorksGoTo;