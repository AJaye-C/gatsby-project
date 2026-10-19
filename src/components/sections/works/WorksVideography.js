import * as React from "react";
import WorksLightboxClose from "./WorksLightboxClose";

// Used by the Works page-builder sections (see WorksVideographySection.js etc.).
// Props: selectedCategory, titleSuffix, items = [{ label, src }]
const WorksVideography = ({ selectedCategory = "", titleSuffix = "", items: videographyItems = [] }) => {
  const [activeLightbox, setActiveLightbox] = React.useState(null);
  const previewRefs = React.useRef([]);
  const triggerRefs = React.useRef([]);
  const closeRef = React.useRef(null);

  const pauseOtherPreviews = (activeIndex) => {
    previewRefs.current.forEach((video, index) => {
      if (!video || index === activeIndex) return;
      video.pause();
      video.currentTime = 0;
    });
  };

  const playPreview = (index) => {
    const video = previewRefs.current[index];
    if (!video) return;

    pauseOtherPreviews(index);
    video.muted = true;
    video.play().catch(() => undefined);
  };

  const resetPreview = (index) => {
    const video = previewRefs.current[index];
    if (!video) return;

    video.pause();
    video.currentTime = 0;
  };

  const openLightbox = (index) => {
    setActiveLightbox(index);
  };

  const closeLightbox = () => {
    const index = activeLightbox;
    setActiveLightbox(null);
    triggerRefs.current[index]?.focus();
  };

  React.useEffect(() => {
    if (activeLightbox === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeLightbox]);

  return (
    <section id="works-videography" className="works-videography-section">
      <div className="mx-auto max-w-layout-shell px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        {/* Updated alignment (items-end) and added bottom spacing (mb-12) */}
        <div className="mb-12 flex items-end justify-between gap-6">
          <h2 className="text-[clamp(2rem,3vw,3.25rem)] font-extrabold leading-none tracking-[-0.05em] text-brand-teal">
            {selectedCategory} {titleSuffix}
          </h2>
          <p className="shrink-0 pb-1 text-micro-note font-medium italic text-brand-slate md:text-micro-note-lg">
            *Click on Video to play in large view
          </p>
        </div>

        <div className="works-videography-grid">
          {videographyItems.map((item, index) => (
            <article
              key={`${item.label}-${index}`}
              ref={(element) => {
                triggerRefs.current[index] = element;
              }}
              tabIndex={0}
              role="button"
              aria-label={`Open ${item.label} video in large view`}
              className="works-videography-card"
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") playPreview(index);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse") resetPreview(index);
              }}
              onClick={() => openLightbox(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openLightbox(index);
                }
              }}
            >
              <video
                ref={(element) => {
                  previewRefs.current[index] = element;
                }}
                src={item.src}
                muted
                playsInline
                loop
                preload="metadata"
                className="works-videography-preview"
                aria-hidden="true"
              />
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </div>

      {activeLightbox !== null && (
        <div className="works-lightbox" role="dialog" aria-modal="true" aria-label={`${videographyItems[activeLightbox].label} video`}>
          <WorksLightboxClose onClick={closeLightbox} buttonRef={closeRef} />
          <video
            key={videographyItems[activeLightbox].src}
            src={videographyItems[activeLightbox].src}
            autoPlay
            playsInline
            controls={false}
            className="works-lightbox-video"
            aria-label={`${videographyItems[activeLightbox].label} video playback`}
          />
        </div>
      )}
    </section>
  );
};

export default WorksVideography;