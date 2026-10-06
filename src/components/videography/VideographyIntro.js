import * as React from "react";

const VideographyIntro = () => (
  <section className="bg-brand-bg px-6 py-20 sm:px-10 lg:min-h-[570px] lg:px-0 lg:py-[118px]">
    <div className="mx-auto grid max-w-[1386px] items-center gap-12 lg:grid-cols-[911px_331px] lg:gap-[106px]">
      <div>
        <h2 className="relative z-0 text-2xl font-medium leading-[1.14] tracking-[-2px] text-brand-slate sm:text-3xl lg:text-[40px]">
          <span className="absolute bottom-[-4px] left-0 right-0 -z-10 h-5 bg-[rgba(23,156,189,0.1)]" />
          What exactly can{" "}
          <strong className="font-bold text-brand-teal">Pocket</strong>{" "}
          <strong className="font-bold text-brand-accent-yellow">
            Creatives
          </strong>{" "}
          help me with?
        </h2>

        <p className="mt-8 text-base font-medium leading-[1.14] tracking-[-1px] text-brand-slate lg:text-[20px]">
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
        className="mx-auto h-auto w-[clamp(180px,17.24vw,331px)] object-contain"
      />
    </div>
  </section>
);

export default VideographyIntro;