import * as React from "react";

const checklist = [
  "Pay only for what you need",
  "No matter how large or small your project",
  "Oh, and no budget overruns!",
];

const cards = [
  {
    title: "Everything you need and no hidden costs.",
    body: "There are lots of factors that affect the overall price of video production and photography shoots, such as props, backgrounds, models and locations. This is why there's no one-size-fits all price, and most creative agencies won't put any prices on their websites – as they can be misleading without a lot of description.",
    badge: "/figma/icons/pound-2.svg",
    badgeAlt: "",
    // Smaller and pulled in on mobile so the badge never causes horizontal scroll
    badgeClass:
      "-left-3 -top-8 h-[72px] w-[72px] sm:-left-8 sm:-top-12 sm:h-[100px] sm:w-[100px] lg:-left-10 lg:-top-16 lg:h-[127px] lg:w-[127px]",
  },
  {
    title: "We'll get you from brief to quote in a flash!",
    body: "We will work with you to understand your brief and the full photography and video production requirements of your project, before delivering a budget breakdown to you at the beginning of the process. This gives you a fully honest and transparent view of the resources that make up your project. There's always room for conversation and tweaks, and we're also happy to start with your ideal spend and work backwards.",
    badge: "/figma/icons/pound-3.svg",
    badgeAlt: "",
    badgeClass:
      "-bottom-8 -right-3 h-[76px] w-[76px] sm:-bottom-12 sm:-right-8 sm:h-[104px] sm:w-[104px] lg:-bottom-16 lg:-right-16 lg:h-[137px] lg:w-[137px]",
  },
];

const PricingVideo = () => {
  const videoRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleVideoClick = () => {
    if (!videoRef.current) {
      return;
    }

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      return;
    }

    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        src="/figma/videos/pricing.mp4"
        playsInline
        preload="metadata"
        onClick={handleVideoClick}
        onEnded={() => setIsPlaying(false)}
        aria-label="Pricing model video"
        className="h-full w-full cursor-pointer object-cover"
      />
      {!isPlaying && (
        <button
          type="button"
          onClick={handleVideoClick}
          aria-label="Play pricing model video"
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/75 transition-transform duration-200 hover:scale-105 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
        >
          <span
            className="ml-1.5 h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-brand-red sm:border-y-[11px] sm:border-l-[17px] lg:ml-2 lg:border-y-[13px] lg:border-l-[20px]"
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
};

const PricingModel = () => (
  <section className="overflow-x-clip bg-brand-bg px-6 py-14 sm:px-10 md:py-24 lg:px-10 lg:py-[116px] min-[1440px]:px-0">
    <div className="mx-auto max-w-[1380px]">
      <h2 className="max-w-[1380px] text-4xl font-bold leading-none tracking-[-0.04em] text-brand-slate sm:text-5xl md:text-6xl xl:text-[80px] xl:tracking-[-4px]">
        We use a modular pricing model:
      </h2>

      <ul className="mt-8 space-y-4 text-xl font-medium leading-tight tracking-[-1px] text-brand-slate sm:text-2xl md:mt-12 md:text-3xl lg:mt-[50px] lg:text-[40px] lg:leading-none lg:tracking-[-2px]">
        {checklist.map((item) => (
          <li key={item} className="flex items-baseline gap-3">
            <span className="shrink-0 text-3xl font-bold leading-none tracking-[-2px] text-brand-teal sm:text-4xl md:text-5xl lg:text-[50px] lg:tracking-[-2.5px]" aria-hidden="true">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-14 md:mt-20 lg:mt-[120px]">
        <PricingVideo />
      </div>

      {/* Extra side margin on tablet/laptop so the overhanging badges stay on screen; back to full width at 1700px+ */}
      <div className="mt-20 grid grid-cols-1 gap-14 md:mt-24 lg:mx-10 lg:mt-[160px] lg:grid-cols-2 lg:gap-10 min-[1440px]:mx-12 min-[1440px]:gap-[74px] min-[1700px]:mx-0">
        {cards.map(({ title, body, badge, badgeAlt, badgeClass }) => (
          <article key={title} className="relative flex flex-col justify-center bg-brand-teal px-6 py-12 text-white sm:px-14 sm:py-16 lg:min-h-[547px] lg:px-10 min-[1440px]:px-[62px]">
            <img src={badge} alt={badgeAlt} aria-hidden="true" className={`pointer-events-none absolute z-10 max-w-none ${badgeClass}`} />
            <h3 className="relative z-0 text-center text-2xl font-bold leading-[1.23] tracking-[-1px] sm:text-4xl sm:tracking-[-1.5px] lg:text-[40px] lg:tracking-[-2px]">
              {title}
            </h3>
            <p className="relative z-0 mt-6 text-lg font-medium leading-snug tracking-[-0.5px] sm:mt-10 sm:text-xl sm:tracking-[-1px] lg:mt-16 lg:leading-[1.23]">
              {body}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default PricingModel;