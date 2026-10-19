import * as React from "react";
import { splitParagraphs } from "../../utils/acf";
import { stageNumeralSrc } from "../../utils/stageNumeral";

// Page-builder layout: "accordion_stage"
// (fields: stageNumber, accordionItems [title, text (one paragraph per line)]).
// The first item starts open; clicking an open item closes it.
const ALLOW_ZERO_OPEN = true;

const AccordionStage = ({ stageNumber, accordionItems = [] }) => {
  const items = (accordionItems || []).filter((item) => item && item.title);
  const [openIndex, setOpenIndex] = React.useState(0);
  const numeral = stageNumeralSrc(stageNumber);

  if (!items.length) return null;

  return (
    <section className="relative isolate overflow-hidden bg-brand-teal px-[clamp(24px,5vw,96px)] py-24 text-white lg:min-h-[929px] lg:py-[265px]">
      {numeral && (
        <img src={numeral} alt="" aria-hidden="true" className="pointer-events-none absolute left-[clamp(24px,11vw,213px)] top-1/2 -z-10 h-[85%] max-w-[30%] -translate-y-1/2 object-contain opacity-50" />
      )}

      <div className="relative mx-auto max-w-[1100px]">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `accordion-stage-panel-${index}`;
          const headingId = `accordion-stage-heading-${index}`;

          return (
            <div key={index} className={index ? "mt-8 lg:mt-[43px]" : ""}>
              <h2 className="m-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  id={headingId}
                  onClick={() => setOpenIndex((current) => (current === index && ALLOW_ZERO_OPEN ? null : index))}
                  className={`group flex w-full items-center justify-between gap-6 text-left text-[clamp(2.5rem,4.167vw,5rem)] font-bold leading-none tracking-[-1.6px] transition-colors duration-300 ease-in-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-yellow focus-visible:ring-offset-4 focus-visible:ring-offset-brand-teal ${isOpen ? "bg-brand-accent-yellow px-8 py-[18px] text-black" : "px-0 py-0 text-white"}`}
                >
                  <span>{item.title}</span>
                  <img
                    src={isOpen ? "/figma/icons/arrows/icon-arrow-up.svg" : "/figma/icons/arrows/icon-down.svg"}
                    alt=""
                    aria-hidden="true"
                    className="h-auto w-[30px] shrink-0"
                  />
                </button>
              </h2>

              <div
                id={panelId}
                role="region"
                aria-labelledby={headingId}
                inert={isOpen ? undefined : ""}
                className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="min-h-0">
                  <div className="space-y-5 pt-7 text-[20px] font-medium leading-[1.2] tracking-[-0.4px] text-white">
                    {splitParagraphs(item.text || "").map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AccordionStage;
