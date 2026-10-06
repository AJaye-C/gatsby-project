import * as React from "react";
import { Link } from "gatsby";
import useMutedVideo from "../../hooks/useMutedVideo";

const VideographyHero = () => {
  const { isMuted, toggleMuted } = useMutedVideo();

  return (
    <section className="bg-brand-accent-yellow px-8 pb-16 pt-28 text-black sm:px-12 sm:pb-24 md:px-16 lg:px-[clamp(64px,4.5vw,150px)] lg:pt-[164px] xl:min-h-[1253px] xl:pb-0 min-[1920px]:px-0">
      <div className="mx-auto max-w-[1411px]">
        {/* Single line only on wide screens; wraps on phones and tablets */}
        <h1 className="break-words text-[clamp(2.5rem,6.25vw,7.5rem)] font-extrabold leading-none tracking-[-0.05em] min-[1440px]:whitespace-nowrap min-[1440px]:tracking-[-6px]">
          <span className="block">Video Production Services</span>
          <span className="mt-2 block text-[clamp(1.25rem,2.083vw,2.5rem)] font-medium leading-none tracking-[-1px] sm:tracking-[-2px]">
            by <strong className="font-bold">POCKET CREATIVES</strong>
          </span>
        </h1>

        <div className="mt-6 sm:mt-8 xl:mt-[53px]">
          <video
            src="/figma/videos/hero.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onClick={toggleMuted}
            aria-label="Videography services hero video"
            role="button"
            className="aspect-[16/10] w-full cursor-pointer bg-brand-accent-yellow object-cover md:aspect-[1411/495]"
          />

          <p className="mt-1 text-sm font-medium leading-[2] tracking-[-0.8px] sm:text-base">
            *Click on Video to toggle sound
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:gap-8 xl:mt-[37px] xl:grid-cols-[minmax(0,959fr)_minmax(0,317fr)] xl:gap-[clamp(40px,7.85vw,113px)]">
          <div>
            <p className="text-2xl font-bold leading-[1.15] tracking-[-1px] sm:text-3xl sm:tracking-[-2px] lg:text-4xl xl:text-[40px] xl:leading-none">
              Our professional video production and videography services are
              easy to commission...
            </p>

            <p className="mt-4 text-base font-medium leading-[1.4] tracking-[-0.5px] sm:ml-2 sm:mt-5 sm:text-lg sm:tracking-[-1px] xl:text-xl xl:leading-none">
              whether you&apos;re a seasoned pro or if you&apos;re producing
              video for the first time.
            </p>
          </div>

          <div className="text-base font-medium leading-[1.4] tracking-[-0.5px] sm:text-lg sm:tracking-[-1px] xl:text-right xl:text-xl xl:leading-none">
            <p>
              We take the time to understand your requirements: how your video
              will be used and what it needs to achieve.
            </p>

            <Link
              to="/contact/"
              className="group mt-6 inline-flex h-12 items-center gap-[7px] rounded-[16px] bg-brand-cyan px-[13px] py-3 text-lg font-medium leading-none tracking-[-0.36px] text-white shadow-talk transition-colors duration-200 hover:bg-white hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-accent-yellow"
            >
              <img
                src="/figma/icons/contact-email.svg"
                alt=""
                aria-hidden="true"
                className="h-6 w-6 transition duration-200 group-hover:brightness-0 group-hover:invert"
              />
              <span>Have questions?</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideographyHero;
