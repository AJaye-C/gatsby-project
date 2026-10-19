import * as React from "react";
import RichText from "../../utils/RichText";
import { mediaAlt, mediaUrl, splitParagraphs } from "../../utils/acf";

// Page-builder layout: "testimonial_rotator"
// Fields: badge_label (Text Area, one line per row: "What" / "They Say"),
//         testimonial_items (Repeater: image [Image, the client logo], quote [WYSIWYG: bold = teal emphasis], author [Text])
// One testimonial at a time, rotating every 8 seconds; it pauses on hover, on focus and when the tab is hidden.
const ROTATION_MS = 8000;

const QuoteMarks = ({ className = "" }) => (
  <div aria-hidden="true" className={`pointer-events-none flex gap-[clamp(4px,0.45vw,9px)] opacity-10 ${className}`}>
    <img src="/figma/icons/decor/quote.svg" alt="" className="h-auto w-[clamp(52px,5.5vw,105px)]" />
    <img src="/figma/icons/decor/quote.svg" alt="" className="h-auto w-[clamp(52px,5.5vw,105px)]" />
  </div>
);

const TestimonialRotator = ({ badgeLabel = "", testimonialItems = [] }) => {
  const testimonials = React.useMemo(
    () =>
      (testimonialItems || [])
        .map((item, index) => ({
          id: `testimonial-${index}`,
          image: mediaUrl(item?.image),
          imageAlt: mediaAlt(item?.image, item?.author ? `${item.author} logo` : ""),
          quote: item?.quote || "",
          author: item?.author || "",
        }))
        .filter((item) => item.quote || item.author),
    [testimonialItems]
  );
  const count = testimonials.length;
  const badgeLines = splitParagraphs(badgeLabel);
  const sectionLabel = badgeLines.join(" ") || "Testimonials";

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [authorWidth, setAuthorWidth] = React.useState(0);
  const authorTextRef = React.useRef(null);

  React.useEffect(() => {
    const measureAuthor = () => {
      if (authorTextRef.current) {
        const lineWidths = Array.from(authorTextRef.current.getClientRects()).map((rect) => rect.width);
        setAuthorWidth(Math.max(...lineWidths, 0));
      }
    };

    measureAuthor();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measureAuthor) : null;
    if (observer && authorTextRef.current) observer.observe(authorTextRef.current);
    window.addEventListener("resize", measureAuthor);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measureAuthor);
    };
  }, [activeIndex, count]);

  React.useEffect(() => {
    if (isPaused || count < 2) return undefined;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % count);
    }, ROTATION_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused, count]);

  React.useEffect(() => {
    const handleVisibilityChange = () => setIsPaused(document.visibilityState !== "visible");
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  if (!count) return null;

  return (
    <section
      aria-label={sectionLabel}
      aria-live="off"
      className="relative overflow-hidden bg-brand-bg text-brand-slate lg:min-h-[680px] min-[1920px]:min-h-[899px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
    >
      <div className="relative mx-auto max-w-[1920px] px-[clamp(24px,8vw,150px)] py-16 lg:min-h-[680px] lg:py-0 min-[1920px]:min-h-[899px] min-[1920px]:px-0">
        <QuoteMarks className="absolute left-[clamp(24px,8vw,150px)] top-8 z-0 min-[1920px]:left-[5%]" />
        {/* md+: closing pair lowered significantly further down on the right edge */}
        <QuoteMarks className="absolute z-0 hidden rotate-180 md:right-[clamp(24px,8vw,150px)] md:top-[75%] md:flex min-[1920px]:right-[5%] min-[1920px]:top-[500px]" />

        {/* Badge is built in CSS (not SVG) so the circle uses the brand tokens: yellow by default, brand teal on hover/focus. */}
        {badgeLines.length > 0 && (
          <h2
            tabIndex="0"
            aria-label={sectionLabel}
            className="group absolute right-[clamp(24px,8vw,150px)] top-24 z-20 flex h-[clamp(104px,10.57vw,203px)] w-[clamp(104px,10.57vw,203px)] cursor-pointer items-center justify-center rounded-full bg-brand-accent-yellow text-black transition-colors duration-200 ease-in-out hover:bg-brand-teal hover:text-white focus-visible:bg-brand-teal focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 motion-reduce:transition-none md:top-8 min-[1920px]:right-[5%]"
          >
            <span aria-hidden="true" className="-rotate-[12deg] text-center text-[clamp(18px,1.8vw,34px)] font-extrabold leading-[1.05] tracking-[-0.04em]">
              {badgeLines.map((line, index) => (
                <React.Fragment key={`${line}-${index}`}>
                  {index > 0 && <br />}
                  {line}
                </React.Fragment>
              ))}
            </span>
          </h2>
        )}

        <div className="relative z-10 grid pt-28 md:min-h-[560px] md:content-center md:pt-0 lg:min-h-[680px] min-[1920px]:min-h-[899px]">
          {testimonials.map((testimonial, index) => {
            const isActive = index === activeIndex;

            return (
              <article
                key={testimonial.id}
                aria-hidden={!isActive}
                inert={isActive ? undefined : ""}
                className={`col-start-1 row-start-1 transition-opacity duration-500 motion-reduce:transition-none ${isActive ? "opacity-100" : "pointer-events-none opacity-0"}`}
              >
                <div className="relative grid grid-cols-1 content-start md:grid-cols-[clamp(160px,16vw,308px)_minmax(0,1fr)] md:items-center md:gap-[clamp(32px,3.5vw,72px)] min-[1920px]:block min-[1920px]:min-h-[899px]">
                  <div className="mx-auto flex h-[clamp(104px,30vw,160px)] w-[clamp(104px,30vw,160px)] items-center justify-center bg-white md:mx-0 md:h-[clamp(160px,16vw,308px)] md:w-[clamp(160px,16vw,308px)] min-[1920px]:absolute min-[1920px]:left-[17.03%] min-[1920px]:top-[20.91%] min-[1920px]:h-[308px] min-[1920px]:w-[308px]">
                    {testimonial.image && (
                      <img src={testimonial.image} alt={testimonial.imageAlt} className="max-h-full max-w-full object-contain" />
                    )}
                  </div>
                  <div className="relative mt-8 pb-24 md:mt-0 md:min-w-0 md:max-w-[795px] md:pb-0 min-[1920px]:absolute min-[1920px]:left-[36.46%] min-[1920px]:top-[30.37%] min-[1920px]:mt-0 min-[1920px]:w-[41.4%]">
                    <RichText
                      as="p"
                      weight="bold"
                      html={testimonial.quote}
                      className="block text-base font-medium leading-[1.35] tracking-[-1px] sm:text-lg lg:text-[20px]"
                    />
                    <div className="relative mt-8 flex max-w-full justify-end">
                      {/* Below md: closing pair tucked right under the name, following this slide's own text */}
                      <QuoteMarks className="absolute right-0 top-[55%] z-[-1] rotate-180 md:hidden" />
                      <p className="relative max-w-full text-right text-2xl font-extrabold leading-tight tracking-[-2px] text-black sm:text-3xl lg:text-[40px] lg:leading-none">
                        <span ref={isActive ? authorTextRef : undefined}>{testimonial.author}</span>
                      </p>
                      <div
                        className="absolute bottom-[-6px] right-0 h-3 max-w-full bg-brand-accent-yellow transition-[width] duration-500 ease-in-out motion-reduce:transition-none"
                        style={{ width: authorWidth ? `${authorWidth + 12}px` : "0px" }}
                      />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialRotator;