import * as React from "react";

const PricingCTA = () => (
  <section className="w-full bg-brand-bg py-16 sm:py-20 lg:py-24">
    <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-8">
          <h2 className="mb-8 max-w-[18ch] text-3xl font-black leading-[1.05] tracking-tight text-brand-slate sm:max-w-[20ch] sm:text-5xl lg:max-w-[17ch] lg:text-6xl">
            <span className="text-brand-yellow">We value</span>{" "}
            <span className="text-brand-teal">transparency,</span>{" "}
            <span className="text-brand-slate">so let&apos;s talk about pricing.</span>
          </h2>

          <p className="mb-6 max-w-xl text-xl font-medium leading-snug text-brand-text-muted sm:text-2xl">
            Lorem ipsum dolor sit amet consectetur. Placerat quisque feugiat porta quam ornare.
          </p>

          <p className="max-w-lg text-sm leading-relaxed text-brand-text-muted sm:text-base">
            Lorem ipsum dolor sit amet consectetur. Placerat quisque feugiat porta quam ornare. In nec lacinia consectetur placerat vestibulum sem odio. In feugiat elit fames eget lobortis turpis scelerisque tincidunt. Enim.
          </p>
        </div>

        <div className="flex h-full flex-col items-start justify-between space-y-12 lg:col-span-4 lg:items-end lg:space-y-24">
          <button
            type="button"
            className="rounded-lg bg-brand-yellow px-6 py-2.5 text-sm font-bold text-brand-text-dark shadow-md transition-transform duration-200 hover:scale-105 hover:bg-brand-teal hover:text-white sm:text-base"
          >
            View Pricing
          </button>

          <button
            type="button"
            className="flex items-center gap-3 rounded-[20px] bg-brand-yellow px-8 py-5 shadow-xl transition-transform duration-200 hover:scale-105 hover:bg-brand-yellow sm:rounded-[24px] sm:px-10 sm:py-6"
          >
            <span className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">Request</span>
            <span className="text-center text-lg font-extrabold leading-none text-brand-text-dark sm:text-xl">a<br />quote</span>
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default PricingCTA;
