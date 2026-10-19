import * as React from "react";
import { Link } from "gatsby";
import StoryArrow from "./StoryArrow";
import { mediaAlt, mediaUrl, splitParagraphs } from "../../utils/acf";

// Page-builder layout: "process_slider"
// Fields: process_slides (Repeater: title, bullets Text Area one per line, text Text Area, image)  -> queried as `slides`
//         contact_label (Text Area, one line per row), contact_link (Text)
// The last "Get in touch" slide only shows when both contact fields are filled in.
const ProcessSlider = ({ slides = [], contactLabel, contactLink }) => {
  const items = (slides || []).filter(Boolean);
  const contactLines = splitParagraphs(contactLabel);
  const hasContact = Boolean(contactLink && contactLines.length);
  const total = items.length + (hasContact ? 1 : 0);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [pitch, setPitch] = React.useState(0);
  const [visible, setVisible] = React.useState(1); // slides that fit in the viewport, measured below
  const viewportRef = React.useRef(null);
  const slideRef = React.useRef(null);

  React.useEffect(() => {
    const measure = () => {
      const slide = slideRef.current;
      const viewport = viewportRef.current;
      if (!slide || !viewport) return;
      const styles = window.getComputedStyle(slide.parentElement);
      const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
      const step = slide.getBoundingClientRect().width + gap;
      if (!step) return;
      setPitch(step);
      setVisible(Math.max(1, Math.floor((viewport.clientWidth + gap + 2) / step)));
    };

    measure();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (observer && viewportRef.current) observer.observe(viewportRef.current);
    window.addEventListener("resize", measure);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [total]);

  // Last position = the final slide fully in view (works for any number of slides)
  const maxIndex = Math.max(0, total - visible);

  React.useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const goToPrevious = () => setActiveIndex((current) => Math.max(0, current - 1));
  const goToNext = () => setActiveIndex((current) => Math.min(maxIndex, current + 1));

  if (!total) return null;

  const contactClass = "services-process-contact-link";
  const contactContent = contactLines.map((line, index) => <span key={index}>{line}</span>);

  return (
    <section className="services-process-slider bg-brand-bg py-16 md:py-20 lg:py-24">
      <div ref={viewportRef} className="services-process-slider-viewport">
        <div
          className="services-process-slider-track"
          style={{ transform: `translateX(-${activeIndex * pitch}px)` }}
        >
          {items.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              ref={index === 0 ? slideRef : undefined}
              className="services-process-slide"
            >
              <div className="services-process-slide-copy">
                {item.title && <h2>{item.title}</h2>}
                <ul>
                  {splitParagraphs(item.bullets).map((bullet, bulletIndex) => (
                    <li key={`${item.title}-${bulletIndex}`}>{bullet}</li>
                  ))}
                </ul>
                {item.text && <p>{item.text}</p>}
              </div>
              {mediaUrl(item.image) && (
                <img
                  src={mediaUrl(item.image)}
                  alt={mediaAlt(item.image, item.title || "")}
                  className="services-process-slide-image"
                />
              )}
            </article>
          ))}

          {hasContact && (
            <article
              ref={items.length === 0 ? slideRef : undefined}
              className="services-process-slide services-process-contact-slide"
            >
              {contactLink.startsWith("/") ? (
                <Link to={contactLink} className={contactClass}>{contactContent}</Link>
              ) : (
                <a href={contactLink} className={contactClass}>{contactContent}</a>
              )}
            </article>
          )}
        </div>
      </div>

      {maxIndex > 0 && (
        <div className="services-process-slider-controls">
          <StoryArrow direction="previous" disabled={activeIndex === 0} variant="inverted" onClick={goToPrevious} />
          {activeIndex < maxIndex && (
            <StoryArrow direction="next" variant="inverted" onClick={goToNext} />
          )}
        </div>
      )}
    </section>
  );
};

export default ProcessSlider;
