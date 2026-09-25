import * as React from "react";

const QualitySection = () => (
  <section className="w-full bg-brand-cyan py-24 px-6 sm:px-10 lg:px-16 text-white md:py-32 lg:py-36">
    <div className="mx-auto max-w-layout-shell">
      <h2 className="text-display-section font-black text-white">
        We <span className="text-brand-yellow tracking-[-0.08em] inline-block">squeeze</span> quality into
        <br className="hidden sm:block" />
        every pixel...
      </h2>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        <p className="max-w-copy-narrow text-body-copy text-brand-text-dark">
          Lorem ipsum dolor sit amet consectetur. Placerat quisque feugiat porta
          quam ornare. In nec lacinia consectetur placerat vestibulum sem odio.
          In feugiat elit fames eget lobortis turpis scelerisque tincidunt. Enim.
        </p>

        <p className="max-w-[480px] text-[1.45rem] md:text-[2.15rem] font-bold leading-snug text-white tracking-[-0.03em]">
          See some of our Photography work for different industries below.
        </p>
      </div>
    </div>
  </section>
);

export default QualitySection;
