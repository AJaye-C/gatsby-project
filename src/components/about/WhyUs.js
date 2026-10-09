import * as React from "react";

// Page-builder layout: "why_us"
// Fields: heading (Text), intro (Text Area), reasons (Repeater: title, body [Text Area])

const Arrow = ({ direction }) => (
  <svg viewBox="0 0 32 32" aria-hidden="true" className={direction === "previous" ? "rotate-180" : ""}>
    <rect className="arrow-bg" x="0" y="0" width="32" height="32" rx="16" />
    <path d="M8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17V16V15ZM24.7071 16.7071C25.0976 16.3166 25.0976 15.6835 24.7071 15.2929L18.3431 8.92893C17.9526 8.53841 17.3195 8.53841 16.9289 8.92893C16.5384 9.31946 16.5384 9.95262 16.9289 10.3431L22.5858 16L16.9289 21.6569C16.5384 22.0474 16.5384 22.6805 16.9289 23.0711C17.3195 23.4616 17.9526 23.4616 18.3431 23.0711L24.7071 16.7071ZM8 16V17H24V16V15H8V16Z" fill="black" />
  </svg>
);

const WhyUs = ({ heading, intro, reasons = [] }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(3);
  const [dragOffset, setDragOffset] = React.useState(0);
  const dragStartX = React.useRef(null);
  const dragPointerId = React.useRef(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = reasons.length;

  if (!total) return null;

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePointerDown = (event) => {
    dragStartX.current = event.clientX;
    dragPointerId.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (dragStartX.current === null || event.pointerId !== dragPointerId.current) return;
    setDragOffset(event.clientX - dragStartX.current);
  };

  const handlePointerEnd = (event) => {
    if (dragStartX.current === null || event.pointerId !== dragPointerId.current) return;

    const distance = event.clientX - dragStartX.current;
    dragStartX.current = null;
    dragPointerId.current = null;
    setDragOffset(0);

    if (Math.abs(distance) < 50) return;
    if (distance < 0) goToNext();
    else goToPrevious();
  };

  const handlePointerCancel = () => {
    dragStartX.current = null;
    dragPointerId.current = null;
    setDragOffset(0);
  };

  return (
    <section className="w-full overflow-hidden bg-brand-accent-yellow pb-16 md:pb-24 lg:pb-[146px]">
      <div className="mx-auto max-w-[1488px] px-4 pt-16 sm:px-6 md:pt-20 lg:px-8 lg:pt-[101px]">
        <h2 className="text-[clamp(3.2rem,6.25vw,7.5rem)] font-extrabold leading-[0.98] tracking-[-0.05em] text-white">
          {heading}
        </h2>

        {intro && (
          <p className="mt-8 max-w-[880px] text-base leading-[1.55] tracking-[-0.02em] text-black sm:text-lg xl:max-w-[960px]">
            {intro}
          </p>
        )}

        {/* Teal Panel Container */}
        <div className="relative mt-12 md:mt-16 lg:mt-[90px]">
          <div className="w-[200vw] -mr-[100vw] bg-brand-teal px-4 pt-10 pb-12 sm:px-8 md:pt-12 md:pb-16 lg:px-12 lg:pt-14 lg:pb-20 xl:px-16">
            <div className="w-full max-w-[1420px] overflow-hidden">
              
              {/* Sliding Track */}
              <div
                className="flex min-h-[380px] cursor-grab select-none touch-none sm:min-h-[340px] lg:min-h-[320px] lg:cursor-grab"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerEnd}
                onPointerCancel={handlePointerCancel}
                style={{
                  transform: `translateX(calc(-${activeIndex * (100 / itemsPerPage)}% + ${dragOffset}px))`,
                  transition: dragOffset === 0 ? "transform 500ms ease-in-out" : "none",
                }}
              >
                {reasons.map((reason, index) => (
                  <article
                    key={index}
                    className="flex-shrink-0 min-w-0 pr-6 sm:pr-10 md:pr-12"
                    style={{
                      width: `${100 / itemsPerPage}%`,
                    }}
                  >
                    {/* Inner content box bounded on mobile to prevent edge clipping */}
                    <div className="w-full max-w-[calc(100vw-56px)] sm:max-w-none">
                      <h3 className="text-[1.5rem] font-bold leading-[1.1] tracking-[-0.04em] text-white md:text-[1.7rem] xl:text-[1.85rem]">
                        {reason.title}
                      </h3>
                      <div className="mt-4 text-[0.98rem] font-medium leading-[1.35] tracking-[-0.03em] text-[#E6E6E6] sm:text-[1.05rem] xl:text-[1.125rem] whitespace-pre-line">
                        {reason.body}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Previous Reason"
                  onClick={goToPrevious}
                  className="section-three-nav flex h-9 w-9 items-center justify-center md:h-11 md:w-11"
                >
                  <Arrow direction="previous" />
                </button>
                <button
                  type="button"
                  aria-label="Next Reason"
                  onClick={goToNext}
                  className="section-three-nav flex h-9 w-9 items-center justify-center md:h-11 md:w-11"
                >
                  <Arrow direction="next" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;