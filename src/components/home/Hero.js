import * as React from "react";
import RichText from "./RichText";
import useMutedVideo from "../../hooks/useMutedVideo";
import { mediaUrl } from "../../utils/acf";

// Page-builder layout: "hero"  (fields: intro, video)
const Hero = ({ intro, video }) => {
  const { isMuted, toggleMuted } = useMutedVideo();
  const videoSrc = mediaUrl(video) || "/figma/videos/hero.mp4";

  return (
    <div className="mx-auto max-w-layout-shell overflow-x-clip px-4 pb-6 pt-24 sm:px-6 sm:pb-8 lg:px-8 lg:pt-28">
      <section className="w-full pb-0 pt-6">
        <div className="flex items-end justify-between gap-4 leading-none md:gap-6">
          <img src="/figma/images/logo.png" alt="Pocket Creatives logo" className="h-[76px] w-[145px] object-contain sm:h-[94px] sm:w-[175px] lg:h-[115px] lg:w-[204px]" />

          <div className="hidden items-end gap-3 md:flex">
            <img
              src="/figma/images/hero-people-2.png"
              alt="Female photographer holding a camera up to her eye"
              className="h-[90px] w-[150px] rounded-[16px] object-cover lg:h-[110px] lg:w-[180px]"
            />
            <img
              src="/figma/images/hero-people-1.png"
              alt="Male videographer filming with a professional video camera"
              className="h-[90px] w-[150px] rounded-[16px] object-cover object-right lg:h-[110px] lg:w-[180px]"
            />
          </div>
        </div>

        <hr className="mt-0 border-t border-brand-line" />

        <RichText
          as="h1"
          html={intro}
          weight="bold"
          className="mt-8 max-w-[1200px] text-left text-display-hero font-medium text-brand-slate sm:text-display-hero-sm md:text-display-hero-md lg:text-display-hero-lg 2xl:text-display-hero-2xl"
        />

        <div className="mt-8">
          <p className="text-micro-note font-medium italic text-brand-subtle-muted">*Click on Video to toggle sound</p>
          <div className="mt-3 overflow-hidden rounded-[18px] border border-brand-line shadow-[0_12px_22px_rgba(0,0,0,0.08)]">
            <video
              src={videoSrc}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onClick={toggleMuted}
              aria-label="Pocket Creatives showreel"
              role="button"
              className="aspect-video w-full cursor-pointer object-cover sm:aspect-auto sm:h-[360px] md:h-[420px] lg:h-[510px] 2xl:h-[610px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
