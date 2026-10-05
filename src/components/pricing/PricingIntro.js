import * as React from "react";
import useMutedVideo from "../../hooks/useMutedVideo";

const PricingIntro = () => {
  const { isMuted, toggleMuted } = useMutedVideo();

  /*
   * Mobile/tablet (<1024): heading -> horizontal video -> paragraphs (single column).
   * lg+: heading + paragraphs in the left column, portrait video in the right column.
   * The three blocks are direct grid children so they can reorder without duplicating markup.
   */
  return (
    <section className="relative isolate overflow-hidden bg-brand-accent-yellow text-black">
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-y-4 px-6 pb-16 pt-28 sm:px-10 md:pt-32 lg:min-h-[985px] lg:grid-cols-[minmax(0,1fr)_456px] lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-0 lg:px-10 lg:pb-0 lg:pt-[188px] min-[1440px]:gap-x-12 min-[1440px]:px-[4.75rem]">
        {/* lg+: pound sits behind the heading/paragraph column. Below lg it is rendered inside the paragraphs block instead. */}
        <img
          src="/figma/icons/pound.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute z-[-1] hidden h-[720px] w-[720px] max-w-none -translate-x-1/2 lg:left-[calc(50%_-_250px)] lg:top-[174px] lg:block"
        />

        <div className="relative z-10 lg:col-start-1 lg:row-start-1">
          <p className="text-xl font-bold leading-none tracking-[-1px] sm:text-3xl lg:text-[40px] lg:tracking-[-2px]">
            Avoiding the taboo:
          </p>

          {/* Fluid size: fits "video production" on one line from 430px up to the 100px Figma size at 1440+ */}
          <h1 className="mt-4 text-[clamp(2.25rem,10vw,4.5rem)] font-bold leading-none tracking-[-0.05em] sm:mt-7 lg:mt-[43px] lg:text-[clamp(3rem,calc((100vw_-_576px)/8),6.25rem)]">
            <span className="block">Pricing for</span>
            <span className="block">video production</span>
            <span className="block">and photography</span>
          </h1>
        </div>

        <div className="relative z-10 flex flex-col items-start lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:items-center lg:self-start">
          <video
            src="/figma/videos/hero.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onClick={toggleMuted}
            aria-label="Pricing intro video"
            role="button"
            className="aspect-video h-auto w-full cursor-pointer object-cover lg:aspect-[456/643] lg:max-w-[456px]"
          />
          <p className="mt-2 text-sm font-medium leading-8 tracking-[-0.8px] text-brand-slate sm:text-base">
            *Click on Video to toggle sound
          </p>
        </div>

        <div className="relative mt-2 max-w-[786px] space-y-5 text-base font-medium leading-snug tracking-[-0.5px] sm:text-lg lg:z-10 lg:col-start-1 lg:row-start-2 lg:mt-[42px] lg:text-[20px] lg:leading-none lg:tracking-[-1px]">
          {/* Mobile/tablet: centered on the paragraphs. No z-index on this block, so the pound stays behind the video too. */}
          <img
            src="/figma/icons/pound.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-[-1] h-[min(850px,95vw)] w-[min(850px,95vw)] max-w-none -translate-x-1/2 -translate-y-1/2 lg:hidden"
          />
          <p>
            Price is important to everybody, and we know this is a major factor in deciding who you&apos;ll want to work with. We like to think that clients work with us for a range of reasons, from our quality of output to our project management, but getting the budget in the right place is something that we spend a lot of time on.
          </p>
          <p>
            We can either quote from scratch once we understand your brief, or work to your target spend. This flexibility makes us a great fit for both small and large clients alike. You can read a bit more below about how we structure our rates for both video production and photography below, and we&apos;re always here for any queries.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingIntro;