import * as React from "react";
import RichText from "./RichText";

// Page-builder layout: "quality"  (fields: heading, paragraph, side_text)
const QualitySection = ({ heading, paragraph, sideText }) => (
  <section className="w-full bg-brand-cyan py-16 px-6 sm:px-10 sm:py-24 lg:px-16 text-white md:py-32 lg:py-36">
    <div className="mx-auto max-w-layout-shell">
      {/* This section's background is blue, so use italic (yellow) for highlights, not bold (teal) */}
      <RichText
        as="h2"
        html={heading}
        className="text-display-section font-black text-white [&_em]:inline-block [&_em]:tracking-[-0.08em]"
      />

      <div className="mt-8 grid grid-cols-1 items-start gap-6 sm:mt-12 md:grid-cols-2 md:gap-12 lg:gap-16">
        <p className="max-w-copy-narrow whitespace-pre-line text-body-copy text-brand-text-dark">{paragraph}</p>

        <p className="max-w-[480px] text-[1.35rem] sm:text-[1.6rem] lg:text-[2.15rem] font-bold leading-snug text-white tracking-[-0.03em]">
          {sideText}
        </p>
      </div>
    </div>
  </section>
);

export default QualitySection;
