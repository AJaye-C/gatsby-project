import * as React from "react";
import ClientLogos from "./ClientLogos";

const Hero = () => (
  <div className="mx-auto max-w-[1280px] px-4 pb-14 pt-24 sm:px-6 lg:px-8 lg:pt-28">
    <section className="w-full pb-10 pt-6">
      <div className="flex items-end justify-between gap-4 leading-none md:gap-6">
        <img src="/figma/images/logo.png" alt="Pocket Creatives" className="h-[76px] w-[145px] object-contain sm:h-[94px] sm:w-[175px] lg:h-[115px] lg:w-[204px]" />

        <div className="hidden items-end gap-3 md:flex">
          <img
            src="/figma/images/hero-people-2.png"
            alt="Female photographer"
            className="h-[70px] w-[120px] rounded-[16px] object-cover lg:h-[90px] lg:w-[150px]"
          />
          <img
            src="/figma/images/hero-people-1.png"
            alt="Male videographer"
            className="h-[70px] w-[120px] rounded-[16px] object-cover object-right lg:h-[90px] lg:w-[150px]"
          />
        </div>
      </div>

      <hr className="mt-0 border-t border-brand-line" />

      <h1 className="mt-8 max-w-[1040px] text-left text-[2.2rem] font-medium leading-[0.96] tracking-[-0.07em] text-brand-slate sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.7rem] 2xl:text-[4rem]">
        We’re a <span className="font-black text-brand-yellow">fast</span> &amp; <span className="font-black text-brand-yellow">friendly</span>{" "}
        <span className="font-black text-brand-cyan">Video Production</span> and <span className="font-black text-brand-cyan">Photography</span> company
        <br className="hidden lg:block" />
        with <span className="font-black text-brand-yellow">bags of experience</span> &amp; who <span className="text-brand-red">❤</span> what we do :)
      </h1>

      <div className="mt-8">
        <p className="text-[0.78rem] font-medium italic text-brand-subtle-muted">*Click on Video to toggle sound</p>
        <div className="mt-3 overflow-hidden rounded-[18px] border border-brand-line shadow-[0_12px_22px_rgba(0,0,0,0.08)]">
          <video
            src="/figma/videos/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-[240px] w-full object-cover sm:h-[360px] lg:h-[510px] 2xl:h-[610px]"
          />
        </div>
      </div>

      <div className="mt-10 mx-auto grid w-full min-w-0 items-center justify-center gap-8 px-0 md:gap-12 xl:grid-cols-[1fr_1fr]">
        <div className="mx-auto w-full max-w-[480px] min-w-0 px-2 pt-2 sm:px-0 xl:mx-0 xl:justify-self-center xl:pr-4">
          <p className="text-[clamp(1.45rem,2vw,2.6rem)] font-medium leading-[1.02] tracking-[-0.07em] text-brand-slate">
            As you see, we’ve <span className="font-black text-brand-yellow">partnered</span>
            <br />
            with a lot of amazing people
          </p>
          <p className="mt-5 text-[clamp(1.35rem,1.7vw,1.9rem)] font-black leading-[1.1] tracking-[-0.06em] text-brand-cyan">
            in many different Industries:
          </p>
          <p className="mt-4 max-w-[520px] text-[1.04rem] leading-[1.7] tracking-[-0.02em] text-brand-body-muted">
            Lorem ipsum dolor sit amet consectetur. Placerat quisque feugiat porta quam ornare. In nec lacinia consectetur placerat vestibulum sem odio. In feugiat elit fames eget lobortis turpis scelerisque tincidunt. Enim.
          </p>
        </div>

        <ClientLogos />
      </div>
    </section>
  </div>
);

export default Hero;
