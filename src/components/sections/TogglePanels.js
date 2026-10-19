import * as React from "react";
import { mediaUrl, mediaAlt } from "../../utils/acf";
import { renderInlineMarkup } from "../../utils/inlineMarkup";

// Page-builder layout: "toggle_panels"
//   togglePanelItems[{ heading, image, panelColor, buttonLabel, panelParagraphs[{ text }] }]
//
// - Panels sit side by side in one sliding track; the round button inside a panel slides to the NEXT panel
//   (the last one wraps to the first). With two panels that is the classic "toggle between A and B".
// - buttonLabel = the text on THIS panel's button, i.e. the name of the panel it leads to
//   (Video panel: "Photography", Photography panel: "Video Production"). A newline or a two-word label
//   breaks onto two lines, like the design.
// - panelColor (Select "yellow" | "teal"): empty = alternate yellow, teal, yellow...
// - panelParagraphs[].text supports inline markup: [label](/path) = link, **bold** = bold (utils/inlineMarkup).
// - Even panels put the button after the copy; odd panels put it before the image (as in the Figma).

const colorStyles = {
  yellow: {
    panel: "bg-brand-accent-yellow",
    text: "text-black",
    button: "bg-brand-teal text-white hover:bg-brand-accent-yellow hover:text-black",
  },
  teal: {
    panel: "bg-brand-teal",
    text: "text-white",
    button: "bg-brand-accent-yellow text-black hover:bg-brand-teal hover:text-white",
  },
};

const pickColor = (panelColor, index) => {
  const raw = String(Array.isArray(panelColor) ? panelColor[0] : panelColor || "").toLowerCase();
  if (colorStyles[raw]) return raw;
  return index % 2 === 0 ? "yellow" : "teal";
};

const buttonLines = (label) => {
  const lines = String(label || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length === 1) {
    const words = lines[0].split(/\s+/);
    if (words.length === 2) return words;
  }
  return lines;
};

const linkClassName = "font-bold underline decoration-solid underline-offset-2";

const PanelCopy = ({ paragraphs, textColor }) => (
  <div className={`w-full max-w-[646.235px] text-xl font-medium leading-none tracking-[-1px] ${textColor}`}>
    {paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-5 last:mb-0">
        {renderInlineMarkup(paragraph, linkClassName, "font-bold")}
      </p>
    ))}
  </div>
);

const ToggleButton = ({ colorClassName, onClick, controls, label, lines, flip }) => (
  <button
    type="button"
    aria-label={label}
    aria-controls={controls}
    onClick={onClick}
    className={`group relative z-10 flex size-[clamp(130px,9.21875vw,177px)] shrink-0 flex-col items-center justify-center rounded-full text-center text-xl font-bold leading-none tracking-[-1px] shadow-[0_4px_10px_rgba(0,0,0,0.2)] transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 motion-reduce:transition-none ${colorClassName}`}
  >
    <span>
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </span>
    <img
      src="/figma/icons/pricing-arrow-left.svg"
      alt=""
      aria-hidden="true"
      className={`mt-3 h-4 w-4 object-contain transition-[filter] duration-200 group-hover:brightness-0 group-hover:invert ${
        flip ? "scale-x-[-1]" : ""
      }`}
    />
  </button>
);

const Panel = ({ item, index, panelId, targetId, targetName, isActive, isBackward, hasTarget, onToggle, headingRef, widthPercent }) => {
  const color = colorStyles[pickColor(item.panelColor, index)];
  const buttonOnLeft = index % 2 === 1;
  const paragraphs = (item.panelParagraphs || []).map((paragraph) => (typeof paragraph === "string" ? paragraph : paragraph?.text)).filter(Boolean);
  const imageSrc = mediaUrl(item.image);
  const lines = buttonLines(item.buttonLabel || targetName);
  const button = hasTarget ? (
    <ToggleButton
      colorClassName={color.button}
      onClick={onToggle}
      controls={targetId}
      label={`Show ${String(targetName || lines.join(" ")).replace(/[….]+$/, "")} details`}
      lines={lines}
      flip={isBackward}
    />
  ) : null;

  return (
    <article
      id={panelId}
      aria-hidden={!isActive}
      inert={!isActive ? "" : undefined}
      tabIndex={isActive ? 0 : -1}
      style={{ width: `${widthPercent}%`, flexBasis: `${widthPercent}%` }}
      className={`flex min-h-[976px] min-w-0 shrink-0 items-stretch overflow-hidden ${color.panel}`}
    >
      <div className="mx-auto flex w-full max-w-[1444px] flex-col px-6 pb-16 pt-24 sm:px-10 md:px-14 xl:px-[clamp(24px,2.5vw,48px)] xl:pt-[142px]">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className={`w-full whitespace-normal text-[clamp(3.25rem,6.25vw,7.5rem)] font-bold leading-none tracking-[-0.05em] outline-none xl:whitespace-nowrap xl:text-[120px] xl:tracking-[-6px] ${color.text} ${
            buttonOnLeft ? "xl:pl-[calc(clamp(130px,9.21875vw,177px)_+_46px)]" : ""
          }`}
        >
          {item.heading}
        </h2>

        <div className="mt-10 flex flex-1 flex-col items-start xl:mt-[53px] xl:flex-row">
          {buttonOnLeft && button && (
            <div className="order-3 mt-10 xl:order-1 xl:mr-[45.99px] xl:mt-[138px]">{button}</div>
          )}

          <div className="order-1 flex w-full flex-col items-start xl:order-2 xl:w-auto xl:min-w-0 xl:shrink xl:flex-row">
            {imageSrc && (
              <img
                src={imageSrc}
                alt={mediaAlt(item.image, item.heading || "")}
                width="490"
                height="490"
                loading="eager"
                className="aspect-square h-auto w-full max-w-[490px] object-cover xl:w-[min(490px,34vw)] xl:shrink-0"
              />
            )}
            {paragraphs.length > 0 && (
              <div className={`mt-8 w-full xl:mt-0 xl:w-[646px] xl:min-w-0 xl:shrink ${imageSrc ? "xl:ml-[23.77px]" : ""}`}>
                <PanelCopy paragraphs={paragraphs} textColor={color.text} />
              </div>
            )}
          </div>

          {!buttonOnLeft && button && (
            <div className="order-3 mt-10 xl:ml-[41px] xl:mt-[137px]">{button}</div>
          )}
        </div>
      </div>
    </article>
  );
};

const TogglePanels = ({ togglePanelItems = [] }) => {
  const items = (togglePanelItems || []).filter((item) => item && (item.heading || item.panelParagraphs?.length));
  const count = items.length;

  const [activeIndex, setActiveIndex] = React.useState(0);
  const headingRefs = React.useRef([]);
  const hasMounted = React.useRef(false);

  // Move focus to the newly shown panel's heading (not on first render).
  React.useEffect(() => {
    if (hasMounted.current) {
      headingRefs.current[activeIndex]?.focus({ preventScroll: true });
    }
    hasMounted.current = true;
  }, [activeIndex]);

  if (count === 0) return null;

  const widthPercent = 100 / count;
  const sectionLabel = items
    .map((item) => String(item.heading || "").replace(/[….]+$/, "").trim())
    .filter(Boolean)
    .join(" and ");

  return (
    <section aria-label={sectionLabel || "Details"} className="w-full overflow-x-clip">
      <div
        className="flex items-stretch transition-transform duration-500 ease-in-out motion-reduce:transition-none"
        style={{ width: `${count * 100}%`, transform: `translateX(-${activeIndex * widthPercent}%)` }}
      >
        {items.map((item, index) => {
          const targetIndex = (index + 1) % count;

          return (
            <Panel
              key={`${item.heading}-${index}`}
              item={item}
              index={index}
              panelId={`toggle-panel-${index}`}
              targetId={`toggle-panel-${targetIndex}`}
              targetName={items[targetIndex].heading}
              isActive={index === activeIndex}
              isBackward={targetIndex < index}
              hasTarget={count > 1}
              onToggle={() => setActiveIndex(targetIndex)}
              headingRef={(element) => { headingRefs.current[index] = element; }}
              widthPercent={widthPercent}
            />
          );
        })}
      </div>
    </section>
  );
};

export default TogglePanels;
