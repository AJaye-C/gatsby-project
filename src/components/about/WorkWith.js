import * as React from "react";
import ClientLogos from "../home/ClientLogos";
import { splitList, splitParagraphs } from "../../utils/acf";

// Page-builder layout: "work_with"
// Fields: heading, intro (Text Area), highlight_prefix, highlighted_names (comma separated),
//         highlight_suffix, logos (Repeater: name, logo), badge_text, badge_link_label,
//         badge_link, mobile_button_label
const WorkWith = ({
  heading,
  intro,
  highlightPrefix,
  highlightedNames,
  highlightSuffix,
  logos = [],
  badgeText,
  badgeLinkLabel,
  badgeLink,
  mobileButtonLabel,
}) => {
  const companyNames = React.useMemo(() => splitList(highlightedNames), [highlightedNames]);
  const [companyIndex, setCompanyIndex] = React.useState(0);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener?.("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener?.("change", updateMotionPreference);
  }, []);

  React.useEffect(() => {
    if (reducedMotion || companyNames.length < 2) return undefined;

    const interval = window.setInterval(() => {
      setCompanyIndex((current) => (current + 1) % companyNames.length);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [reducedMotion, companyNames.length]);

  const hasHighlight = Boolean(highlightPrefix && companyNames.length);

  return (
    <section className="w-full overflow-hidden bg-brand-teal py-16 text-white md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1488px] px-4 sm:px-6 lg:px-8 lg:py-4">
        <h2 className="text-[clamp(3.2rem,6.25vw,7.5rem)] font-extrabold leading-[0.98] tracking-[-0.05em] text-white lg:whitespace-nowrap">
          {heading}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-12 md:gap-16 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start xl:gap-24">
          <div className="max-w-[620px] lg:ml-[67px]">
            <div className="space-y-6 text-[clamp(1rem,1.35vw,1.25rem)] font-normal leading-[1.45] tracking-[-0.03em] text-white">
              {splitParagraphs(intro).map((text, index) => (
                <p key={index}>{text}</p>
              ))}

              {hasHighlight && (
                <p aria-hidden="true">
                  {highlightPrefix}{" "}
                  <span className="inline-grid bg-brand-accent-yellow px-2 text-center font-bold text-black">
                    {companyNames.map((name, index) => (
                      <span
                        key={name}
                        className={`col-start-1 row-start-1 whitespace-nowrap ${index === companyIndex ? "" : "invisible"}`}
                      >
                        {name}
                      </span>
                    ))}
                  </span>{" "}
                  {highlightSuffix}
                </p>
              )}
            </div>

            {hasHighlight && (
              <p className="sr-only">
                {highlightPrefix} {companyNames[0]} {highlightSuffix}
              </p>
            )}

            {mobileButtonLabel && badgeLink && (
              <a
                href={badgeLink}
                className="mx-auto mt-8 flex w-fit rounded-none bg-brand-accent-yellow px-6 py-3 text-base font-bold text-black shadow-[0_8px_16px_rgba(0,0,0,0.16)] lg:hidden"
              >
                {mobileButtonLabel}
              </a>
            )}
          </div>

          {/* Logos + CTA share one 540px-wide wrapper so the CTA's 3rd column lines up with the logo tiles */}
          <div className="hidden w-full max-w-[540px] lg:block">
            <ClientLogos className="max-w-none" logos={logos} />

            {badgeText && (
              <div className="logo-grid mt-3">
                <div className="col-start-3 flex aspect-[172/95] items-center justify-end rounded-[18px] bg-brand-accent-yellow px-4 shadow-[0_5px_14px_rgba(0,0,0,0.06)]">
                  <p className="text-right text-[0.95rem] font-bold leading-[1.1] text-black xl:text-base">
                    {badgeText}{" "}
                    {badgeLinkLabel && badgeLink && (
                      <a href={badgeLink} className="underline decoration-1 underline-offset-4">
                        {badgeLinkLabel}
                      </a>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkWith;
