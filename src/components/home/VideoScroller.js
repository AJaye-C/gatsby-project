import * as React from "react";
import { videoCategories } from "../../data/videos";
import { useVideoCarousel } from "../../hooks/useVideoCarousel";

const LetsTalkButton = ({ className = "" }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      type="button"
      className={`section-three-cta -mb-1 items-center justify-center p-0 ${className}`}
      aria-label="Let's talk"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={isHovered ? "/figma/icons/lets-talk-hvr.svg" : "/figma/icons/lets-talk.svg"}
        alt="Let's talk"
        className="h-[84px] w-[84px] object-contain drop-shadow-[0_8px_20px_rgba(23,156,189,0.28)] sm:h-[110px] sm:w-[110px] md:h-[116px] md:w-[116px]"
      />
    </button>
  );
};

const VideoScroller = () => {
  const { activeIndex, mutedMap, videoRefs, goToPrevious, goToNext, toggleMute, handleDragStart, handleDragEnd } = useVideoCarousel();
  const trackRef = React.useRef(null);
  const [slideStep, setSlideStep] = React.useState(0);

  // One slide = measured card width + gap, so each arrow/swipe moves exactly one video at every breakpoint
  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const measure = () => {
      const card = track.querySelector(".video-card");
      if (!card) return;
      const gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
      setSlideStep(card.offsetWidth + gap);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section className="w-full overflow-x-clip bg-brand-bg py-12 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-layout-shell px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-10">
          <div className="flex items-center gap-3">
            <img src="/figma/icons/icon-play.svg" alt="Play icon" className="h-8 w-8 md:h-10 md:w-10" />
            <span className="text-[1.35rem] font-medium sm:text-[1.7rem] tracking-[-0.06em] text-brand-slate md:text-[2.2rem]">
              Video Production
            </span>
          </div>

          {/* Header position on sm+; on mobile the CTA moves to the bottom */}
          <LetsTalkButton className="hidden sm:flex" />
        </div>

        <div className="pb-5 touch-pan-y" style={{ overflowX: "visible" }}>
          <div
            ref={trackRef}
            className="video-carousel-track"
            style={{ transform: `translate3d(${-activeIndex * slideStep}px, 0, 0)` }}
            onMouseDown={(event) => handleDragStart(event.clientX)}
            onMouseUp={(event) => handleDragEnd(event.clientX)}
            onMouseLeave={() => handleDragEnd(window.innerWidth)}
            onTouchStart={(event) => handleDragStart(event.touches[0].clientX)}
            onTouchEnd={(event) => handleDragEnd(event.changedTouches[0].clientX)}
          >
            {videoCategories.map((video, index) => {
              const isMuted = Boolean(mutedMap[index]);

              return (
                <article key={video.title} className="video-card">
                  <h3 className="mb-4 text-[1.75rem] font-bold tracking-[-0.06em] text-brand-text-dark sm:text-[2.4rem] md:text-[3.2rem]">
                    {video.title}
                  </h3>

                  <div
                    className="video-card-video relative w-full border border-brand-soft shadow-[0_8px_18px_rgba(0,0,0,0.06)]"
                    onClick={() => toggleMute(index)}
                  >
                    <video
                      ref={(element) => {
                        videoRefs.current[index] = element;
                      }}
                      src={video.src}
                      muted={isMuted}
                      autoPlay
                      loop
                      playsInline
                      className="h-full w-full cursor-pointer"
                      aria-label={`${video.title} preview video`}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex flex-col items-start gap-3">
          <p className="text-micro-note font-medium italic text-brand-text-muted md:text-micro-note-lg">
            *Swipe or drag for the next video, tap to toggle sound
          </p>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              aria-label="Previous video"
              onClick={goToPrevious}
              className="section-three-nav flex h-11 w-11 items-center justify-center"
            >
              <svg viewBox="0 0 32 32" aria-hidden="true" className="rotate-180">
                <rect className="arrow-bg" x="0" y="0" width="32" height="32" rx="16" />
                <path d="M8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17V16V15ZM24.7071 16.7071C25.0976 16.3166 25.0976 15.6834 24.7071 15.2929L18.3431 8.92893C17.9526 8.53841 17.3195 8.53841 16.9289 8.92893C16.5384 9.31946 16.5384 9.95262 16.9289 10.3431L22.5858 16L16.9289 21.6569C16.5384 22.0474 16.5384 22.6805 16.9289 23.0711C17.3195 23.4616 17.9526 23.4616 18.3431 23.0711L24.7071 16.7071ZM8 16V17H24V16V15H8V16Z" fill="black"/>
              </svg>
            </button>

            <button
              type="button"
              aria-label="Next video"
              onClick={goToNext}
              className="section-three-nav flex h-11 w-11 items-center justify-center"
            >
              <svg viewBox="0 0 32 32" aria-hidden="true">
                <rect className="arrow-bg" x="0" y="0" width="32" height="32" rx="16" />
                <path d="M8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17V16V15ZM24.7071 16.7071C25.0976 16.3166 25.0976 15.6834 24.7071 15.2929L18.3431 8.92893C17.9526 8.53841 17.3195 8.53841 16.9289 8.92893C16.5384 9.31946 16.5384 9.95262 16.9289 10.3431L22.5858 16L16.9289 21.6569C16.5384 22.0474 16.5384 22.6805 16.9289 23.0711C17.3195 23.4616 17.9526 23.4616 18.3431 23.0711L24.7071 16.7071ZM8 16V17H24V16V15H8V16Z" fill="black"/>
              </svg>
            </button>
          </div>

          {/* Mobile only: CTA stacked below the controls */}
          <LetsTalkButton className="flex self-center sm:hidden" />
        </div>
      </div>
    </section>
  );
};

export default VideoScroller;