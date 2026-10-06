import * as React from "react";
import { Link } from "gatsby";
import useMutedVideo from "../../hooks/useMutedVideo";

const VideographyHero = () => {
  const { isMuted, toggleMuted } = useMutedVideo();

  return (
    <section className="bg-brand-accent-yellow px-6 pb-24 pt-28 text-black sm:px-10 lg:min-h-[1253px] lg:px-0 lg:pb-0 lg:pt-[164px]">
      <div className="mx-auto max-w-[1411px]">
        <h1 className="whitespace-nowrap text-[clamp(3.5rem,6.25vw,7.5rem)] font-extrabold leading-none tracking-[-0.05em] lg:text-[120px] lg:tracking-[-6px]">
          <span className="block">Video Production Services</span>
          <span className="mt-2 block text-[clamp(1.5rem,2.083vw,2.5rem)] font-medium leading-none tracking-[-2px]">
            by <strong className="font-bold">POCKET CREATIVES</strong>
          </span>
        </h1>

        <div className="mt-8 lg:mt-[53px]">
          <video
            src="/figma/videos/hero.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onClick={toggleMuted}
            aria-label="Videography services hero video"
            role="button"
            className="aspect-[1411/495] w-full cursor-pointer bg-brand-accent-yellow object-cover"
          />

          <p className="mt-1 text-base font-medium leading-[2] tracking-[-0.8px]">
            *Click on Video to toggle sound
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-[37px] lg:grid-cols-[959px_317px] lg:gap-[113px]">
          <div>
            <p className="text-2xl font-bold leading-none tracking-[-2px] sm:text-3xl lg:text-[40px]">
              Our professional video production and videography services are
              easy to commission...
            </p>

            <p className="ml-2 mt-5 text-xl font-medium leading-none tracking-[-1px]">
              whether you&apos;re a seasoned pro or if you&apos;re producing
              video for the first time.
            </p>
          </div>

          <div className="text-xl font-medium leading-none tracking-[-1px] lg:text-right">
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