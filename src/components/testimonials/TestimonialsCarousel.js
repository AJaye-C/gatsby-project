import * as React from "react";

const mod = (value, length) => ((value % length) + length) % length;

const TestimonialsCarousel = ({ slides }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [reducedMotion, setReducedMotion] = React.useState(false);
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

  const announce = `Showing testimonial ${activeIndex + 1} of ${total}`;

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={headingId}
      className="overflow-hidden bg-brand-bg px-0 pb-[115px] pt-12 min-[1920px]:pt-[89px]"
    >
      <h2 id={headingId} className="sr-only">
        Testimonials carousel
      </h2>

      <div className="relative mx-auto h-[clamp(545px,38vw,660px)] w-full max-w-[1440px] overflow-hidden">
        {slides.map((slide, index) => {
          const offset = getOffset(index);
          const isActive = offset === 0;
          const visible = Math.abs(offset) <= 1;
          const cardOffset = offset * 872;
          const cardScale = isActive ? 1 : 0.9;
          const cardY = isActive ? "-88px" : "0px";

          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Select testimonial ${index + 1} of ${total}`}
              aria-current={isActive ? "true" : undefined}
              aria-hidden={!visible}
              tabIndex={visible ? 0 : -1}
              className={`absolute left-1/2 top-[88px] h-[545px] w-[min(832px,calc(100vw-48px))] shrink-0 overflow-visible p-10 text-left shadow-[0_19px_33px_rgba(0,0,0,0.25)] transition-[left,transform,background-color,color,opacity] duration-500 ease-in-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow ${
                isActive ? "bg-brand-teal text-white" : "bg-white text-black"
              } ${
                visible
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
              style={{
                left: `calc(50% + ${cardOffset}px)`,
                transform: `translate(-50%, ${cardY}) scale(${cardScale})`,
              }}
            >
              {/* Top double quote */}
              <div className="pointer-events-none absolute left-16 top-6 flex h-24 w-24 items-start justify-center gap-1 opacity-10">
                <img
                  src="/figma/icons/quote.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-20 w-10"
                />
                <img
                  src="/figma/icons/quote.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-20 w-10"
                />
              </div>

              {/* Bottom double quote */}
              <div className="pointer-events-none absolute bottom-6 right-16 flex h-24 w-24 items-end justify-center gap-1 rotate-180 opacity-10">
                <img
                  src="/figma/icons/quote.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-20 w-10"
                />
                <img
                  src="/figma/icons/quote.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-20 w-10"
                />
              </div>

              {/* Testimonial quote */}
              <p className="absolute left-1/2 top-[150px] w-[calc(100%-160px)] -translate-x-1/2 text-xl font-medium leading-[1.35] tracking-[-1px]">
                {slide.quote.map((part, partIndex) =>
                  part.emphasis ? (
                    <strong key={partIndex} className="font-bold">
                      {part.text}
                    </strong>
                  ) : (
                    <React.Fragment key={partIndex}>
                      {part.text}
                    </React.Fragment>
                  )
                )}
              </p>

              {/* Author */}
              <div className="absolute bottom-[160px] left-20 bg-brand-accent-yellow px-5 py-3 text-[clamp(1.5rem,2.083vw,2.5rem)] font-bold leading-none tracking-[-2px] text-black">
                {slide.author}
              </div>

              {/* Logo - half inside / half outside card */}
              <div className="pointer-events-none absolute -bottom-[100px] left-1/2 flex h-[clamp(104px,12vw,230px)] w-[clamp(104px,12vw,230px)] -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-[#D9D9D9] text-center text-sm text-black shadow-[0_8px_14px_rgba(0,0,0,0.2)]">
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