import * as React from "react";

const PricingIntro = () => {
  const [isVideoMuted, setIsVideoMuted] = React.useState(true);

  return (
    <section className="relative isolate overflow-hidden bg-brand-accent-yellow text-black">
      <div className="mx-auto grid min-h-[985px] max-w-[1440px] grid-cols-1 gap-12 px-6 pb-16 pt-28 sm:px-10 lg:grid-cols-[minmax(0,1fr)_456px] lg:gap-16 lg:px-0 lg:pb-0 lg:pt-[188px]">

        <div className="relative z-10 lg:pl-[4.75rem]">
          <img
            src="/figma/icons/pound.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-[50%] top-[0%] z-[-1] h-[min(850px,95vw)] w-[min(850px,95vw)] max-w-none -translate-x-1/2 lg:top-[-2%] lg:h-[720px] lg:w-[720px]"
          />

          <p className="text-2xl font-bold leading-none tracking-[-1.2px] sm:text-3xl lg:text-[40px] lg:tracking-[-2px]">
            Avoiding the taboo:
          </p>

          <h1 className="mt-5 w-full max-w-none text-[clamp(3rem,6.5vw,6.5rem)] font-bold leading-none tracking-[-0.05em] sm:mt-7 lg:mt-[43px] lg:text-[100px] lg:tracking-[-5px]">
            <span className="block">Pricing for</span>
            <span className="block">video production</span>
            <span className="block">and photography</span>
          </h1>

          <div className="mt-10 max-w-[786px] space-y-5 text-base font-medium leading-none tracking-[-0.8px] sm:text-lg lg:mt-[42px] lg:text-[20px] lg:tracking-[-1px]">
            <p>
              Price is important to everybody, and we know this is a major factor in deciding who you&apos;ll want to work with. We like to think that clients work with us for a range of reasons, from our quality of output to our project management, but getting the budget in the right place is something that we spend a lot of time on.
            </p>
            <p>
              We can either quote from scratch once we understand your brief, or work to your target spend. This flexibility makes us a great fit for both small and large clients alike. You can read a bit more below about how we structure our rates for both video production and photography below, and we&apos;re always here for any queries.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-start lg:pt-0">
          <video
            src="/figma/videos/hero.mp4"
            autoPlay
            loop
            muted={isVideoMuted}
            playsInline
            onClick={() => setIsVideoMuted((current) => !current)}
            aria-label="Pricing intro video"
            role="button"
            className="h-[min(643px,125vw)] w-full max-w-[456px] cursor-pointer object-cover"
          />
          <p className="mt-2 text-sm font-medium leading-8 tracking-[-0.8px] text-brand-slate sm:text-base">
            *Click on Video to toggle sound
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingIntro;