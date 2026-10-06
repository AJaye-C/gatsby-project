import * as React from "react";
import { Link } from "gatsby";
import useMutedVideo from "../../hooks/useMutedVideo";

const heroCopy = {
  paragraphs: [
    "We put quality and creativity at the heart of what we do, and can organise locations, models, make-up artists and more to complete the picture.",
    "It really is the full package.",
  ],
};

const PhotographyHero = () => {
  const { isMuted, toggleMuted } = useMutedVideo();

  return (
    <section className="bg-brand-teal px-8 pb-16 pt-28 text-white sm:px-12 sm:pb-24 md:px-16 lg:px-[clamp(64px,4.5vw,150px)] lg:pt-[161px] xl:min-h-[1269px] xl:pb-0 min-[1920px]:px-0">
      <div className="mx-auto max-w-[1300px]">
        <h1 className="max-w-[1196px] break-words font-bold leading-none tracking-[-0.05em] xl:tracking-[-6px]">
          <span className="block text-[clamp(2.5rem,6.25vw,7.5rem)]">
            Photography Services
          </span>
          <span className="mt-2 block text-[clamp(1.25rem,2.083vw,2.5rem)] font-medium leading-[1.6] tracking-[-1px] sm:leading-[2] sm:tracking-[-2px]">
            available from <strong className="font-bold">POCKET CREATIVES</strong>
          </span>
        </h1>

        <div className="mt-6 sm:mt-8 xl:mt-[53px]">
          <video
            src="/figma/videos/photo-hero.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onClick={toggleMuted}
            aria-label="Photography services hero video"
            role="button"
            className="aspect-[16/10] w-full cursor-pointer object-cover md:aspect-[1300/496]"
          />

          <p className="mt-1 text-sm font-medium leading-[2] tracking-[-0.8px] sm:text-base">
            *Click on Video to toggle sound
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:gap-8 xl:mt-[20px] xl:grid-cols-[minmax(0,689fr)_minmax(0,571fr)] xl:gap-10">
          <p className="max-w-[689px] text-2xl font-bold leading-[1.15] tracking-[-1px] sm:text-3xl sm:tracking-[-2px] lg:text-4xl xl:text-[40px] xl:leading-[1.1]">
            If you&apos;re looking for expert photography services, you&apos;ve
            come to the{" "}
            <span className="inline bg-brand-accent-yellow px-2 text-black">
              right place.
            </span>
          </p>

          <div className="max-w-[571px] text-base font-medium leading-[1.4] tracking-[-0.5px] sm:text-lg sm:tracking-[-1px] xl:text-xl xl:leading-none">
            {heroCopy.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mb-4 last:mb-0 sm:mb-5">
                {paragraph}
              </p>
            ))}

            <Link
              to="/contact/"
              className="group mt-6 inline-flex h-12 items-center gap-[7px] bg-brand-accent-yellow px-[13px] py-3 text-lg font-medium leading-none tracking-[-0.36px] text-black shadow-talk transition-colors duration-200 hover:bg-white hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-teal"
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

export default PhotographyHero;
