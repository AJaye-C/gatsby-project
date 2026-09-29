import * as React from "react";
import WorksLightboxClose from "./WorksLightboxClose";

// Build photo array referencing img-works-1.png through img-works-8.png
const figmaPhotos = Array.from(
  { length: 8 },
  (_, i) => `/figma/images/img-works-${i + 1}.png`
);

// Helper to get photos array rotated so initial thumbnail starts at specific index
const getPhotosForAlbum = (startIndex) => {
  return figmaPhotos.map((_, i) => figmaPhotos[(startIndex + i) % figmaPhotos.length]);
};

const clientLabels = [
  "Client 1",
  "Client 2",
  "Client 3",
  "Client 4",
  "Client 5",
  "Client 6",
  "Client 7",
  "Client 8",
  "Client 9",
  "Client 10",
  "Client 11",
  "Client 12",
];

// 12 albums with different starting image indices (looping across 8 available images)
const albums = clientLabels.map((label, index) => ({
  id: `album-${index + 1}`,
  label,
  photos: getPhotosForAlbum(index % figmaPhotos.length),
}));

const WorksPhotography = ({ selectedCategory = "Beauty" }) => {
  const [hoveredAlbum, setHoveredAlbum] = React.useState(null);
  const [activeAlbum, setActiveAlbum] = React.useState(null);
  const [activePhoto, setActivePhoto] = React.useState(0);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [previewPhoto, setPreviewPhoto] = React.useState(0);

  const hoverTimers = React.useRef({});
  const triggerRefs = React.useRef([]);
  const closeRef = React.useRef(null);
  const sliderViewportRef = React.useRef(null);
  const sliderThumbRefs = React.useRef([]);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener?.("change", updatePreference);

    return () => mediaQuery.removeEventListener?.("change", updatePreference);
  }, []);

  React.useEffect(() => {
    figmaPhotos.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  React.useEffect(() => () => {
    Object.values(hoverTimers.current).forEach((timer) => window.clearInterval(timer));
  }, []);

  React.useEffect(() => {
    if (activeAlbum === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setActivePhoto(0);
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        setActivePhoto((current) => Math.max(0, current - 1));
      } else if (event.key === "ArrowRight") {
        setActivePhoto((current) => Math.min(albums[activeAlbum].photos.length - 1, current + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeAlbum]);

  React.useEffect(() => {
    if (activeAlbum === null) return;
    requestAnimationFrame(() => keepThumbnailVisible(activePhoto));
  }, [activePhoto, activeAlbum]);

  const startAlbumPreview = (index) => {
    if (reducedMotion || hoveredAlbum !== null) return;

    setHoveredAlbum(index);
    setPreviewPhoto(0);
    hoverTimers.current[index] = window.setInterval(() => {
      setPreviewPhoto((current) => (current + 1) % albums[index].photos.length);
    }, 300);
  };

  const stopAlbumPreview = (index) => {
    window.clearInterval(hoverTimers.current[index]);
    delete hoverTimers.current[index];
    setHoveredAlbum(null);
    setPreviewPhoto(0);
  };

  const openLightbox = (index) => {
    Object.values(hoverTimers.current).forEach((timer) => window.clearInterval(timer));
    hoverTimers.current = {};
    setHoveredAlbum(null);
    setPreviewPhoto(0);
    setActiveAlbum(index);
  };

  const closeLightbox = () => {
    const index = activeAlbum;
    setActiveAlbum(null);
    setActivePhoto(0);
    triggerRefs.current[index]?.focus();
  };

  const keepThumbnailVisible = (index) => {
    const thumbnail = sliderThumbRefs.current[index];
    if (!thumbnail) return;

    thumbnail.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const selectPhoto = (index) => {
    setActivePhoto(index);
    keepThumbnailVisible(index);
  };

  return (
    <section id="works-photography" className="works-photography-section">
      <div className="mx-auto max-w-layout-shell px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4">
            <h2 className="text-[clamp(3.5rem,5vw,6rem)] font-black leading-none tracking-[-0.05em] text-brand-yellow">
              Photography ↓
            </h2>
          </div>
          <div className="mt-12 flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="text-[clamp(2rem,3vw,3.25rem)] font-extrabold leading-none tracking-[-0.05em] text-brand-teal">
              {selectedCategory} Photography
            </h3>
            <p className="text-micro-note font-medium italic text-brand-slate md:text-micro-note-lg">
              *Click on thumbnail for large view
            </p>
          </div>
        </div>

        {/* 3 Group Grid Layout for 12 Clients */}
        <div className="works-photography-grouped-grid">
          {[0, 1, 2].map((groupIndex) => (
            <div key={`group-${groupIndex}`} className="works-photography-group">
              {albums.slice(groupIndex * 4, groupIndex * 4 + 4).map((album, relativeIndex) => {
                const globalIndex = groupIndex * 4 + relativeIndex;
                const imageIndex = hoveredAlbum === globalIndex ? previewPhoto : 0;
                const image = album.photos[imageIndex];

                return (
                  <article
                    key={album.id}
                    ref={(element) => {
                      triggerRefs.current[globalIndex] = element;
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open ${album.label} photography album`}
                    className="works-photography-card"
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") startAlbumPreview(globalIndex);
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType === "mouse") stopAlbumPreview(globalIndex);
                    }}
                    onClick={() => openLightbox(globalIndex)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openLightbox(globalIndex);
                      }
                    }}
                  >
                    <img src={image} alt={`${album.label} preview`} className="works-photography-thumbnail" />
                    <p>{album.label}</p>
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {activeAlbum !== null && (
        <div className="works-photo-lightbox" role="dialog" aria-modal="true" aria-label={`${albums[activeAlbum].label} photography album`}>
          <WorksLightboxClose onClick={closeLightbox} buttonRef={closeRef} />
          <div className="works-photo-lightbox-content">
            <div className="works-photo-lightbox-image-frame">
              <img src={albums[activeAlbum].photos[activePhoto]} alt={`${albums[activeAlbum].label} photo ${activePhoto + 1}`} />
            </div>
            <div ref={sliderViewportRef} className="works-photo-slider-viewport">
              <div className="works-photo-slider-track">
                {albums[activeAlbum].photos.map((photo, index) => (
                  <button
                    key={`${photo}-${index}`}
                    ref={(element) => {
                      sliderThumbRefs.current[index] = element;
                    }}
                    type="button"
                    aria-label={`Show photo ${index + 1}`}
                    aria-pressed={index === activePhoto}
                    className={`works-photo-slider-thumb ${index === activePhoto ? "is-active" : ""}`}
                    onClick={() => selectPhoto(index)}
                  >
                    <img src={photo} alt={`${albums[activeAlbum].label} thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WorksPhotography;