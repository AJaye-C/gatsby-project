import * as React from "react";

const TestimonialsDetails = ({ details }) => {
  const scrollerRef = React.useRef(null);

  // Scroll by one column plus the gap, measured from the DOM so it stays
  // correct at every breakpoint.
  const scrollByColumn = (direction) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const firstColumn = scroller.querySelector("article");
    const gap = parseFloat(window.getComputedStyle(scroller).columnGap) || 0;
    const step = firstColumn ? firstColumn.getBoundingClientRect().width + gap : 626;

    scroller.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByColumn(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByColumn(-1);
    }
  };

  return (
    <section className="overflow-hidden bg-brand-bg px-8 py-14 sm:px-12 sm:py-20 md:px-16 lg:px-[clamp(24px,8vw,150px)] min-[1920px]:px-0 min-[1920px]:py-[105px]">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="break-words text-[clamp(2.25rem,6vw,3rem)] font-bold leading-none tracking-[-0.05em] text-brand-slate lg:text-[clamp(3rem,4.167vw,5rem)] lg:tracking-[-4px]">
          {details.heading}
        </h2>

        <div className="mt-8 flex flex-col gap-8 sm:mt-10 sm:gap-10 xl:flex-row xl:gap-[82px]">
          <div className="aspect-[4/3] w-full shrink-0 bg-[#D9D9D9] sm:aspect-[16/10] xl:aspect-auto xl:h-[clamp(300px,30.9375vw,594px)] xl:w-[640px]">
            {details.image && (
              <img
                src={details.image.src}
                alt={details.image.alt}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div
            ref={scrollerRef}
            role="region"
            aria-label="Testimonial detail columns"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="testimonial-details-scroll flex min-w-0 snap-x snap-proximity gap-8 overflow-x-auto overscroll-x-contain pb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal sm:gap-12 xl:gap-[78px]"
          >
            <style>{`.testimonial-details-scroll::-webkit-scrollbar{height:6px}.testimonial-details-scroll::-webkit-scrollbar-thumb{background:#526E87}.testimonial-details-scroll::-webkit-scrollbar-track{background:#dfe4e6}`}</style>

            {details.columns.map((column) => (
              <article
                key={column.heading}
                className="w-[min(548px,82%)] shrink-0 snap-start text-brand-slate"
              >
                <h3 className="text-2xl font-bold leading-[1.2] tracking-[-1px] sm:text-3xl sm:tracking-[-2px] min-[1920px]:text-[40px]">
                  {column.heading}
                </h3>
                {column.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-5 text-base font-medium leading-[1.4] tracking-[-0.5px] sm:mt-8 sm:text-lg sm:tracking-[-1px] lg:text-xl lg:leading-[1.18]"
                  >
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsDetails;
