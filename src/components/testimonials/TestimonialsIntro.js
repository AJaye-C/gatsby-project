import * as React from "react";

const TestimonialsIntro = ({ heading, paragraphs, layout }) => (
  <section className="bg-brand-bg px-[clamp(24px,8vw,150px)] pb-10 pt-32 min-[1920px]:px-0 min-[1920px]:pb-0 min-[1920px]:pt-[211px]">
    <div className={`mx-auto max-w-[1440px] ${layout === "split" ? "grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,722px)] lg:gap-[68px]" : ""}`}>
      <h1 className={`text-[clamp(3rem,6.25vw,7.5rem)] font-bold leading-none tracking-[-0.05em] text-brand-slate min-[1920px]:text-[120px] min-[1920px]:tracking-[-6px] ${layout === "split" ? "max-w-[730px]" : ""}`}>
        {heading}
      </h1>
      <div className={`mt-10 whitespace-pre-line text-xl font-medium leading-none tracking-[-1px] text-brand-slate min-[1920px]:text-[20px] ${layout === "split" ? "lg:mt-0" : "max-w-[1440px]"}`}>
        {paragraphs.map((paragraph) => <p key={paragraph} className="mb-5 last:mb-0">{paragraph}</p>)}
      </div>
    </div>
  </section>
);

export default TestimonialsIntro;