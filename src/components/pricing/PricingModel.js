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
    badgeClass: "-left-10 -top-16 h-[127px] w-[127px]",
  },
  {
    title: "We'll get you from brief to quote in a flash!",
    body: "We will work with you to understand your brief and the full photography and video production requirements of your project, before delivering a budget breakdown to you at the beginning of the process. This gives you a fully honest and transparent view of the resources that make up your project. There's always room for conversation and tweaks, and we're also happy to start with your ideal spend and work backwards.",
    badge: "/figma/icons/pound-3.svg",
    badgeAlt: "",
    badgeClass: "-bottom-16 -right-16 h-[137px] w-[137px]",
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
          className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/75 transition-transform duration-200 hover:scale-105"
        >
          <span className="ml-2 h-0 w-0 border-y-[13px] border-l-[20px] border-y-transparent border-l-brand-red" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

const PricingModel = () => (
  <section className="bg-brand-bg px-6 py-20 sm:px-10 md:py-28 lg:px-0 lg:py-[116px]">
    <div className="mx-auto max-w-[1380px]">
      <h2 className="max-w-[1380px] text-5xl font-bold leading-none tracking-[-2px] text-brand-slate sm:text-6xl lg:text-[80px] lg:tracking-[-4px]">
        We use a modular pricing model:
      </h2>

      <ul className="mt-12 space-y-4 text-2xl font-medium leading-none tracking-[-1.2px] text-brand-slate sm:text-3xl lg:mt-[50px] lg:text-[40px] lg:tracking-[-2px]">
        {checklist.map((item) => (
          <li key={item} className="flex items-baseline gap-3">
            <span className="shrink-0 text-4xl font-bold leading-none tracking-[-2px] text-brand-teal sm:text-5xl lg:text-[50px] lg:tracking-[-2.5px]" aria-hidden="true">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-20 lg:mt-[120px]">
        <PricingVideo />
      </div>

      <div className="mt-24 grid grid-cols-1 gap-12 lg:mt-[160px] lg:grid-cols-2 lg:gap-[74px]">
        {cards.map(({ title, body, badge, badgeAlt, badgeClass }) => (
          <article key={title} className="relative flex min-h-[547px] flex-col justify-center bg-brand-teal px-8 py-16 text-white sm:px-14 lg:px-[62px]">
            <img src={badge} alt={badgeAlt} aria-hidden="true" className={`pointer-events-none absolute z-10 max-w-none ${badgeClass}`} />
            <h3 className="relative z-0 text-center text-3xl font-bold leading-[1.23] tracking-[-1.5px] sm:text-4xl lg:text-[40px] lg:tracking-[-2px]">
              {title}
            </h3>
            <p className="relative z-0 mt-16 text-xl font-medium leading-[1.23] tracking-[-1px] sm:mt-20">
              {body}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default PricingModel;