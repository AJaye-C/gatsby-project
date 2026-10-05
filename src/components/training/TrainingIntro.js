import * as React from "react";
import useMutedVideo from "../../hooks/useMutedVideo";

const TrainingIntro = () => {
  const { isMuted, toggleMuted } = useMutedVideo();

  return (
    <section className="bg-brand-bg text-brand-slate">
      <div className="mx-auto min-h-[1056px] max-w-[1920px] px-[clamp(24px,8vw,150px)] pb-20 pt-[150px] lg:pt-[190px] min-[1920px]:px-[calc((100vw-1440px)/2)] min-[1920px]:pt-[221px]">
        <h1 className="max-w-[1440px] text-[clamp(2.75rem,4.167vw,5rem)] font-medium leading-[1.01] tracking-[-0.06em] text-black">
          Check out our new in-person{" "}
          <span className="font-extrabold text-brand-accent-yellow">creative training courses</span> in{" "}
          <span className="font-extrabold text-brand-teal">video production</span> and{" "}
          <span className="font-extrabold text-brand-teal">photography</span>
        </h1>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:mt-[112px] xl:grid-cols-[minmax(0,1fr)_598px] xl:items-start xl:gap-[75px] min-[1920px]:grid-cols-[minmax(0,763px)_598px]">
          <div className="order-3 space-y-5 text-base font-medium leading-[1.25] tracking-[-0.8px] sm:text-lg lg:order-1 lg:text-[20px] lg:tracking-[-1px]">
            <p>
              The creative industries are more popular than ever. More people are empowered to shoot and edit their own material, and the number of content creators, photographers and videographers increase yearly.
            </p>
            <p>
              At Pocket, we have a wealth of skills and experience to share, and are offering a new range of 1:1 bespoke in-person training courses from our London studio. We’ll build your perfect one day course, covering everything you need for video production, photography or video editing. With the massive number of online and remote courses out there, these offer a definite step-up.
            </p>
            <p>How can we help with the first, or the next steps of your creative journey?</p>
          </div>

          <div className="order-2 flex flex-col items-start lg:order-2">
            <video
              src="/figma/videos/hero.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onClick={toggleMuted}
              aria-label="Creative training courses intro video"
              role="button"
              className="aspect-[598/352] w-full cursor-pointer object-cover"
            />
            <p className="mt-2 text-sm font-medium leading-8 tracking-[-0.8px] text-brand-slate">
              *Click on Video to toggle sound
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingIntro;
