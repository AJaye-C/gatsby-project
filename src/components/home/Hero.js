import * as React from "react";
import ClientLogos from "./ClientLogos";

const Hero = () => (
  <div className="mx-auto max-w-[1280px] px-4 pb-14 pt-28 sm:px-6 lg:px-8">
    <section className="w-full pb-10 pt-6">
      <div className="flex items-end justify-between gap-6 leading-none">
        <img src="/figma/images/logo.png" alt="Pocket Creatives" className="h-[115px] w-[204px] object-contain" />

        <div className="hidden items-end gap-3 md:flex">
          <img
            src="/figma/images/hero-people-2.png"
            alt="Female photographer"
            className="h-[90px] w-[150px] rounded-[16px] object-cover"
          />
          <img
            src="/figma/images/hero-people-1.png"
            alt="Male videographer"
            className="h-[90px] w-[150px] rounded-[16px] object-cover object-right"
          />
        </div>
      </div>

      <hr className="mt-0 border-t border-brand-line" />

      <h1 className="mt-8 text-left text-[clamp(1.394rem,1.901vw,2.566rem)] font-medium leading-[1.05] tracking-[-0.07em] text-brand-slate">
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
            className="h-[280px] w-full object-cover sm:h-[450px] lg:h-[610px]"
          />
        </div>
      </div>

      <div className="mt-10 max-w-[1100px] mx-auto grid justify-center items-center gap-8 md:gap-12 xl:grid-cols-[1fr_1fr]">
        <div className="pt-2 pr-4 max-w-[480px] mx-auto xl:mx-0 xl:justify-self-center">
          <p className="text-[clamp(1.344rem,1.882vw,2.419rem)] font-medium leading-[1.02] tracking-[-0.07em] text-brand-slate">
            As you see, we’ve <span className="font-black text-brand-yellow">partnered</span>
            <br />
            with a lot of amazing people
          </p>
          <p className="mt-5 text-[clamp(1.251rem,1.725vw,1.8975rem)] font-black leading-[1.1] tracking-[-0.06em] text-brand-cyan">
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
