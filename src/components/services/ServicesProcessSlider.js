import * as React from "react";
import { StoryArrow } from "../about/AboutStory";

const processItems = [
  {
    title: "Planning",
    image: "/figma/images/img-serv-plan.jpg",
    alt: "Planning a video production",
  },
  {
    title: "Talent & Location",
    image: "/figma/images/img-serv-talent.jpg",
    alt: "Talent and location for a production",
  },
  {
    title: "Editing & Delivery",
    image: "/figma/images/img-serv-edit.jpg",
    alt: "Editing and delivery of a production",
  },
];

const bulletItems = [
  "Lorem Ipsum dolor sit",
  "Lorem Ipsum dolor sit",
  "Lorem Ipsum dolor sit",
  "Lorem Ipsum dolor sit",
];

const bodyCopy =
  "Nunc id ridiculus mattis ullamcorper in id accumsan eu habitant. Mollis duis eu tellus aliquam viverra. Amet feugiat et habitasse mauris massa iaculis.";

const ServicesProcessSlider = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [pitch, setPitch] = React.useState(0);
  const [dragOffset, setDragOffset] = React.useState(0);
  const viewportRef = React.useRef(null);
  const slideRef = React.useRef(null);
  const dragStartX = React.useRef(null);
  const dragPointerId = React.useRef(null);

  React.useEffect(() => {
    const measurePitch = () => {
      const slide = slideRef.current;
      if (!slide) return;
      const styles = window.getComputedStyle(slide.parentElement);
      const gap = parseFloat(styles.columnGap || styles.gap || "0");
      setPitch(slide.getBoundingClientRect().width + gap);
    };

    measurePitch();
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measurePitch)
        : null;
    if (observer && viewportRef.current) observer.observe(viewportRef.current);
    window.addEventListener("resize", measurePitch);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measurePitch);
    };
  }, []);

  // Limit max index to 2 (the 3rd column) so the right arrow disables/disappears there
  const maxIndex = 2;

  const goToPrevious = () => setActiveIndex((current) => Math.max(0, current - 1));
  const goToNext = () => setActiveIndex((current) => Math.min(maxIndex, current + 1));

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
    <section className="services-process-slider bg-brand-bg py-16 md:py-20 lg:py-24">
      <div
        ref={viewportRef}
        className="services-process-slider-viewport touch-none cursor-grab select-none active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerCancel}
      >
        <div
          className="services-process-slider-track"
          style={{ transform: `translateX(-${activeIndex * pitch + dragOffset}px)` }}
        >
          {processItems.map((item, index) => (
            <article
              key={item.title}
              ref={index === 0 ? slideRef : undefined}
              className="services-process-slide"
            >
              <div className="services-process-slide-copy">
                <h2>{item.title}</h2>
                <ul>
                  {bulletItems.map((bullet, bulletIndex) => (
                    <li key={`${item.title}-${bulletIndex}`}>{bullet}</li>
                  ))}
                </ul>
                <p>{bodyCopy}</p>
              </div>
              <img
                src={item.image}
                alt={item.alt}
                className="services-process-slide-image"
              />
            </article>
          ))}

          {/* 4th Item: Get in touch slide */}
          <article className="services-process-slide services-process-contact-slide">
            <a href="/contact" className="services-process-contact-link">
              <span>Get in</span>
              <span>touch</span>
            </a>
          </article>
        </div>
      </div>

      <div className="services-process-slider-controls">
        <StoryArrow
          direction="previous"
          disabled={activeIndex === 0}
          variant="inverted"
          onClick={goToPrevious}
        />
        {/* Hide or disable the right arrow when reaching activeIndex === 2 */}
        {activeIndex < maxIndex && (
          <StoryArrow
            direction="next"
            disabled={activeIndex === maxIndex}
            variant="inverted"
            onClick={goToNext}
          />
        )}
      </div>
    </section>
  );
};

export default ServicesProcessSlider;