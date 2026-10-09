import * as React from "react";
import { splitChecklistLine } from "./RichText";

// "Services - Check ✓" -> "Services - " in white, "Check ✓" in teal.
// splitChecklistLine also cleans WordPress HTML / en dashes, so editors can't break it.
const ChecklistLine = ({ text }) => {
  const { label, accent } = splitChecklistLine(text);

  return (
    <span className="block">
      {accent ? (
        <>
          {label} - <span className="text-brand-teal">{accent}</span>
        </>
      ) : (
        label
      )}
    </span>
  );
};

// Page-builder layout: "services_checklist"
// fields: lines (repeater: text), columns (repeater: title, text)
// The "Say hello" badge sits on the LAST column.
const ServicesChecklist = ({ lines, columns }) => {
  const [isSayHelloHovered, setIsSayHelloHovered] = React.useState(false);
  const lineItems = lines || [];
  const columnItems = columns || [];
  const sayHelloSrc = isSayHelloHovered ? "/figma/icons/say-hello-hvr.svg" : "/figma/icons/say-hello.svg";

  return (
    <section className="relative w-full bg-brand-yellow py-16 text-brand-text-dark sm:py-20 lg:py-24" aria-labelledby="section-six-title">
      <div className="mx-auto max-w-layout-shell px-6 sm:px-10 lg:px-12">
        <div className="max-w-[760px] pt-1 sm:pt-2 lg:pt-4">
          <h2 id="section-six-title" className="text-display-compact font-black text-white">
            {lineItems.map((line, index) => (
              <ChecklistLine key={`${line.text}-${index}`} text={line.text} />
            ))}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:mt-16 lg:gap-12">
          {columnItems.map((column, index) => {
            const isLast = index === columnItems.length - 1;

            return (
              <article key={`${column.title}-${index}`} className={isLast ? "relative flex h-full flex-col" : undefined}>
                {isLast && (
                  <button
                    type="button"
                    aria-label="Say hello"
                    className="say-hello-button group sm:-right-4 lg:-right-6"
                    onMouseEnter={() => setIsSayHelloHovered(true)}
                    onMouseLeave={() => setIsSayHelloHovered(false)}
                  >
                    <img
                      src={sayHelloSrc}
                      alt="Say hello"
                      className="h-24 w-24 object-contain drop-shadow-[0_8px_20px_rgba(24,32,52,0.18)] sm:h-28 sm:w-28 lg:h-32 lg:w-32"
                    />
                  </button>
                )}

                <h3 className="mb-3 text-xl font-bold text-brand-text-dark">{column.title}</h3>
                <p className="whitespace-pre-line text-sm leading-relaxed text-brand-text-dark/90 sm:text-base">
                  {column.text}
                </p>

                {isLast && (
                  <div className="say-hello-button-mobile mt-6">
                    <button
                      type="button"
                      aria-label="Say hello"
                      className="group flex items-center justify-center"
                      onMouseEnter={() => setIsSayHelloHovered(true)}
                      onMouseLeave={() => setIsSayHelloHovered(false)}
                    >
                      <img
                        src={sayHelloSrc}
                        alt="Say hello"
                        className="h-24 w-24 object-contain drop-shadow-[0_8px_20px_rgba(24,32,52,0.18)]"
                      />
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesChecklist;
