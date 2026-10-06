import * as React from "react";

const VideographyIntro = () => (
  <section className="bg-brand-bg px-8 py-14 sm:px-12 sm:py-20 md:px-16 lg:px-[clamp(64px,4.5vw,150px)] xl:min-h-[570px] xl:py-[118px] min-[1920px]:px-0">
    <div className="mx-auto grid max-w-[1386px] items-center gap-10 sm:gap-12 xl:grid-cols-[minmax(0,911fr)_minmax(0,331fr)] xl:gap-[clamp(48px,7.4vw,106px)]">
      <div>
        <h2 className="relative z-0 text-2xl font-medium leading-[1.14] tracking-[-1px] text-brand-slate sm:text-3xl lg:text-4xl lg:tracking-[-2px] xl:text-[40px]">
          <span className="absolute bottom-[-4px] left-0 right-0 -z-10 h-5 bg-[rgba(23,156,189,0.1)]" />
          What exactly can{" "}
          <strong className="font-bold text-brand-teal">Pocket</strong>{" "}
          <strong className="font-bold text-brand-accent-yellow">
            Creatives
          </strong>{" "}
          help me with?
        </h2>

        <p className="mt-6 text-base font-medium leading-[1.4] tracking-[-0.5px] text-brand-slate sm:mt-8 sm:text-lg sm:tracking-[-1px] xl:text-[20px] xl:leading-[1.14]">
          The Pocket Creatives team are highly adept at providing professional
          video production services (and top quality finished videos) that can
          be used for promoting brands, for social media, hero videos for your
          website, crowdfunding campaign videos, event coverage, internal
          communications and for tv advertising. Our flexibility and
          experience also means that we can adapt our approach to meet any
          challenge or brief.
        </p>
      </div>

      <img
        src="/figma/images/video/logo.png"
        alt="Pocket Creatives logo"
        width="331"
        height="351"
        className="mx-auto h-auto w-[clamp(140px,17.24vw,331px)] object-contain"
      />
    </div>
  </section>
);

export default VideographyIntro;
