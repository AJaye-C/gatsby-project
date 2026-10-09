import * as React from "react";
import RichText from "./RichText";

// Renders a link when WordPress supplies a URL, otherwise the original (inert) button.
const CtaElement = ({ href, children, ...props }) =>
  href ? (
    <a href={href} {...props}>
      {children}
    </a>
  ) : (
    <button type="button" {...props}>
      {children}
    </button>
  );

// Page-builder layout: "pricing_cta"
// fields: heading, subheading, paragraph, view_pricing_label, view_pricing_link,
//         quote_button_label, quote_button_link
const PricingCTA = ({
  heading,
  subheading,
  paragraph,
  viewPricingLabel,
  viewPricingLink,
  quoteButtonLabel,
  quoteButtonLink,
}) => {
  // "Request a quote" -> "Request" large, "a / quote" small and stacked
  const [quoteFirst, ...quoteRest] = (quoteButtonLabel || "").split(" ");

  return (
    <section className="w-full overflow-x-clip bg-brand-bg py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-layout-shell px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <RichText
              as="h2"
              html={heading}
              className="mb-8 max-w-[18ch] text-[1.9rem] font-black leading-[1.05] tracking-tight text-brand-slate sm:max-w-[20ch] sm:text-5xl lg:max-w-[17ch] lg:text-6xl"
            />

            <p className="mb-6 max-w-xl whitespace-pre-line text-xl font-medium leading-snug text-brand-text-muted sm:text-2xl">
              {subheading}
            </p>

            <p className="max-w-lg whitespace-pre-line text-sm leading-relaxed text-brand-text-muted sm:text-base">
              {paragraph}
            </p>
          </div>

          <div className="flex h-full flex-col items-start justify-between gap-8 md:flex-row md:items-center lg:col-span-4 lg:flex-col lg:items-end lg:gap-24">
            {viewPricingLabel && (
              <CtaElement
                href={viewPricingLink}
                className="inline-flex min-h-[44px] items-center rounded-lg bg-brand-yellow px-6 py-2.5 text-sm font-bold text-brand-text-dark shadow-md transition-transform duration-200 hover:scale-105 hover:bg-brand-teal hover:text-white sm:text-base"
              >
                {viewPricingLabel}
              </CtaElement>
            )}

            {quoteFirst && (
              <CtaElement
                href={quoteButtonLink}
                className="flex items-center gap-3 rounded-[20px] bg-brand-yellow px-8 py-5 shadow-xl transition-transform duration-200 hover:scale-105 hover:bg-brand-yellow sm:rounded-[24px] sm:px-10 sm:py-6"
              >
                <span className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">{quoteFirst}</span>
                {quoteRest.length > 0 && (
                  <span className="text-center text-lg font-extrabold leading-none text-brand-text-dark sm:text-xl">
                    {quoteRest.map((word, index) => (
                      <React.Fragment key={`${word}-${index}`}>
                        {index > 0 && <br />}
                        {word}
                      </React.Fragment>
                    ))}
                  </span>
                )}
              </CtaElement>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCTA;
