import * as React from "react";

const mod = (value, length) => ((value % length) + length) % length;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

/**
 * Renders the quote inside a box that fills whatever space is left between
 * the top of the card and the author tag. It measures how many lines fit and
 * clamps the text to that number, so a long quote ends with an ellipsis
 * instead of running into the author.
 */
const ClampedQuote = ({ parts }) => {
  const boxRef = React.useRef(null);
  const textRef = React.useRef(null);
  const [lineCount, setLineCount] = React.useState(null);

  useIsomorphicLayoutEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;

    if (!box || !text || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const measure = () => {
      const styles = window.getComputedStyle(text);
      let lineHeight = parseFloat(styles.lineHeight);

      if (Number.isNaN(lineHeight)) {
        lineHeight = parseFloat(styles.fontSize) * 1.35;
      }
      if (!lineHeight) return;

      setLineCount(Math.max(1, Math.floor(box.clientHeight / lineHeight)));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(box);
    document.fonts?.ready?.then(measure);

    return () => observer.disconnect();
  }, [parts]);

  return (
    <div ref={boxRef} className="relative min-h-0 w-full flex-1 overflow-hidden">
      <p
        ref={textRef}
        className="text-base font-medium leading-[1.35] tracking-[-0.5px] sm:text-lg sm:tracking-[-1px] lg:text-xl"
        style={
          lineCount
            ? {
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: lineCount,
                overflow: "hidden",
              }
            : undefined
        }
      >
        {parts.map((part, partIndex) =>
          part.emphasis ? (
            <strong key={partIndex} className="font-bold">
              {part.text}
            </strong>
          ) : (
            <React.Fragment key={partIndex}>{part.text}</React.Fragment>
          )
        )}
      </p>
    </div>
  );
};

const TestimonialsCarousel = ({ slides }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const touchStartX = React.useRef(null);
  const headingId = "testimonials-carousel-heading";
  const total = slides.length;

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener?.("change", update);

    return () => mediaQuery.removeEventListener?.("change", update);
  }, []);

  React.useEffect(() => {
    if (reducedMotion || total < 2) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => mod(current + 1, total));
    }, 5000);

    return () => window.clearInterval(interval);
  }, [reducedMotion, total]);

  const getOffset = (index) => {
    let offset = index - activeIndex;

    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    return offset;
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null || total < 2) return;

    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) > 50) {
      setActiveIndex((current) => mod(current + (delta < 0 ? 1 : -1), total));
    }
  };

  const announce = `Showing testimonial ${activeIndex + 1} of ${total}`;

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={headingId}
      className="overflow-hidden bg-brand-bg px-0 pb-16 pt-8 sm:pb-20 sm:pt-12 lg:pb-[115px] min-[1920px]:pt-[89px]"
    >
      <h2 id={headingId} className="sr-only">
        Testimonials carousel
      </h2>

      {/*
        Sizing tokens (all cards read from these):
        --gutter      space kept free on each side of the card on small screens
        --card-h      card height
        --stagger     how far inactive cards sit below the active one
        --logo-out    how far the logo hangs below the card
      */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative mx-auto w-full max-w-[1440px] touch-pan-y overflow-hidden [--card-h:440px] [--gutter:32px] [--logo-out:calc(var(--logo-size)*0.5)] [--stagger:24px] sm:[--card-h:500px] sm:[--gutter:48px] sm:[--stagger:48px] md:[--gutter:64px] lg:[--card-h:545px] lg:[--logo-out:100px] lg:[--stagger:88px]"
        style={{
          "--card-w": "min(832px, calc(100vw - 2 * var(--gutter)))",
          "--logo-size": "clamp(104px, 12vw, 230px)",
          height:
            "calc(max(var(--card-h) + var(--logo-out), var(--stagger) + var(--card-h) * 0.95 + var(--logo-out) * 0.9) + 16px)",
        }}
      >
        {slides.map((slide, index) => {
          const offset = getOffset(index);
          const isActive = offset === 0;
          const visible = Math.abs(offset) <= 1;
          const cardScale = isActive ? 1 : 0.9;
          const cardY = isActive ? "calc(var(--stagger) * -1)" : "0px";

          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Select testimonial ${index + 1} of ${total}`}
              aria-current={isActive ? "true" : undefined}
              aria-hidden={!visible}
              tabIndex={visible ? 0 : -1}
              className={`absolute left-1/2 top-[var(--stagger)] flex h-[var(--card-h)] w-[var(--card-w)] shrink-0 flex-col overflow-visible px-6 pb-[calc(var(--logo-size)*0.5_+_20px)] pt-16 text-left shadow-[0_19px_33px_rgba(0,0,0,0.25)] transition-[left,transform,background-color,color,opacity] duration-500 ease-in-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow sm:px-10 sm:pt-24 lg:px-20 lg:pb-[160px] lg:pt-[150px] ${
                isActive ? "bg-brand-teal text-white" : "bg-white text-black"
              } ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
              style={{
                left: `calc(50% + ${offset} * (var(--card-w) + 40px))`,
                transform: `translate(-50%, ${cardY}) scale(${cardScale})`,
              }}
            >
              {/* Top double quote */}
              <div className="pointer-events-none absolute left-5 top-4 flex h-16 w-16 items-start justify-center gap-1 opacity-10 sm:left-10 sm:top-6 sm:h-24 sm:w-24 lg:left-16">
                <img
                  src="/figma/icons/quote.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-14 w-7 sm:h-20 sm:w-10"
                />
                <img
                  src="/figma/icons/quote.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-14 w-7 sm:h-20 sm:w-10"
                />
              </div>

              {/* Bottom double quote */}
              <div className="pointer-events-none absolute bottom-4 right-5 flex h-16 w-16 rotate-180 items-end justify-center gap-1 opacity-10 sm:bottom-6 sm:right-10 sm:h-24 sm:w-24 lg:right-16">
                <img
                  src="/figma/icons/quote.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-14 w-7 sm:h-20 sm:w-10"
                />
                <img
                  src="/figma/icons/quote.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-14 w-7 sm:h-20 sm:w-10"
                />
              </div>

              {/* Testimonial quote: fills the free space and truncates with an ellipsis */}
              <ClampedQuote parts={slide.quote} />

              {/* Author */}
              <div className="mt-4 max-w-full shrink-0 self-start bg-brand-accent-yellow px-4 py-2 text-[clamp(1.25rem,2.083vw,2.5rem)] font-bold leading-[1.1] tracking-[-1px] text-black sm:px-5 sm:py-3 lg:tracking-[-2px]">
                {slide.author}
              </div>

              {/* Logo - half inside / half outside card */}
              <div className="pointer-events-none absolute -bottom-[var(--logo-out)] left-1/2 flex h-[var(--logo-size)] w-[var(--logo-size)] -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-[#D9D9D9] text-center text-sm text-black shadow-[0_8px_14px_rgba(0,0,0,0.2)]">
                {slide.logo ? (
                  <img
                    src={slide.logo.src}
                    alt={slide.logo.alt}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  "[company logo/photo]"
                )}
              </div>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </section>
  );
};

export default TestimonialsCarousel;
