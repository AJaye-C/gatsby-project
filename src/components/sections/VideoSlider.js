import * as React from "react";
import useMutedVideo from "../../hooks/useMutedVideo";
import { cleanWpHtml } from "../../utils/RichText";
import { mediaUrl } from "../../utils/acf";

// Page-builder layout: "video_slider"
// Fields: heading (Text), text (WYSIWYG: bold = extra bold), video_items (Repeater: video [File], label [Text, the video's aria-label])
// One video at a time with previous / next arrows (the arrow is hidden at each end). Only the visible video plays;
// it starts muted and a click toggles the sound.
const HIDE_NEXT_ON_LAST = true;

const VideoSlider = ({ heading = "", text = "", videoItems = [] }) => {
  const videos = React.useMemo(
    () =>
      (videoItems || [])
        .map((item, index) => ({ src: mediaUrl(item?.video), label: item?.label || `Video ${index + 1}` }))
        .filter((item) => item.src),
    [videoItems]
  );

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [slideWidth, setSlideWidth] = React.useState(1060);
  const viewportRef = React.useRef(null);
  const videoRefs = React.useRef([]);
  const { isMuted, toggleMuted, resetMuted } = useMutedVideo();
  const count = videos.length;

  React.useEffect(() => {
    resetMuted();
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        video.currentTime = 0;
        video.muted = true;
        const playRequest = video.play();
        if (playRequest) {
          playRequest.catch(() => {});
        }
      } else {
        video.pause();
        video.muted = true;
        video.currentTime = 0;
      }
    });
  }, [activeIndex, resetMuted]);

  React.useEffect(() => {
    const measure = () => {
      if (viewportRef.current) {
        setSlideWidth(viewportRef.current.clientWidth);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [count]);

  if (!count) return null;

  const goTo = (nextIndex) => {
    setActiveIndex(Math.max(0, Math.min(count - 1, nextIndex)));
  };
  const isLast = activeIndex >= count - 1;

  return (
    <section
      aria-label={heading || "Video slider"}
      aria-roledescription="carousel"
      role="region"
      className="overflow-x-clip bg-brand-accent-yellow py-20 text-black lg:min-h-[1220px] lg:py-[125px]"
    >
      <div className="mx-auto max-w-[1920px] px-[clamp(24px,8vw,150px)] 2xl:px-12">
        {heading && (
          <h2 className="text-center text-[clamp(3.25rem,6.25vw,7.5rem)] font-extrabold leading-none tracking-[-0.05em]">
            {heading}
          </h2>
        )}

        {text && (
          <div
            className="mx-auto mt-12 max-w-[1112px] text-base font-medium leading-[1.15] tracking-[-0.8px] sm:text-lg lg:mt-[68px] lg:text-[20px] lg:tracking-[-1px] [&_strong]:font-extrabold"
            dangerouslySetInnerHTML={{ __html: cleanWpHtml(text) }}
          />
        )}

        <div className="relative mx-auto mt-14 grid max-w-[1290px] grid-cols-2 items-center justify-center gap-6 md:flex lg:mt-[72px] lg:gap-6 xl:gap-[115px]">
          <button
            type="button"
            aria-label="Previous video"
            aria-hidden={activeIndex === 0}
            tabIndex={activeIndex === 0 ? -1 : 0}
            onClick={() => goTo(activeIndex - 1)}
            className={`order-2 col-start-1 row-start-2 flex h-12 w-12 shrink-0 items-center justify-center justify-self-end focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-accent-yellow md:order-1 md:col-auto md:row-auto md:justify-self-auto lg:h-[117px] lg:w-[60px] ${activeIndex === 0 ? "invisible" : ""}`}
          >
            <img src="/figma/icons/arrows/icon-arrow-down.svg" alt="" aria-hidden="true" className="h-auto w-8 rotate-90 lg:w-[34px]" />
          </button>

          <div ref={viewportRef} className="order-1 col-span-2 row-start-1 w-full max-w-[1060px] overflow-hidden md:order-2 md:col-auto md:row-auto" aria-live="off">
            <div
              className="flex w-max transition-transform duration-500 ease-in-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${activeIndex * slideWidth}px)` }}
            >
              {videos.map((video, index) => {
                const isActive = index === activeIndex;

                return (
                  <article
                    key={`${video.src}-${index}`}
                    aria-hidden={!isActive}
                    aria-label={`${index + 1} of ${count}`}
                    aria-roledescription="slide"
                    role="group"
                    style={{ width: `${slideWidth}px` }}
                  >
                    <video
                      ref={(node) => {
                        videoRefs.current[index] = node;
                      }}
                      src={video.src}
                      autoPlay={isActive}
                      loop
                      muted={isActive ? isMuted : true}
                      preload={isActive ? "auto" : "metadata"}
                      playsInline
                      tabIndex={isActive ? 0 : -1}
                      onClick={isActive ? toggleMuted : undefined}
                      aria-label={video.label}
                      role="button"
                      className="aspect-video w-full cursor-pointer object-cover"
                    />
                    <p className="mt-2 text-left text-base font-medium leading-[2] tracking-[-0.8px] text-brand-slate">
                      *Click on Video to toggle sound
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            aria-label="Next video"
            aria-hidden={HIDE_NEXT_ON_LAST && isLast}
            tabIndex={HIDE_NEXT_ON_LAST && isLast ? -1 : 0}
            onClick={() => goTo(activeIndex + 1)}
            className={`order-3 col-start-2 row-start-2 flex h-12 w-12 shrink-0 items-center justify-center justify-self-start focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-accent-yellow md:order-3 md:col-auto md:row-auto md:justify-self-auto lg:h-[117px] lg:w-[60px] ${HIDE_NEXT_ON_LAST && isLast ? "invisible" : ""}`}
          >
            <img src="/figma/icons/arrows/icon-arrow-down.svg" alt="" aria-hidden="true" className="h-auto w-8 -rotate-90 lg:w-[34px]" />
          </button>
        </div>

        <p className="sr-only" aria-live="polite">Slide {activeIndex + 1} of {count}</p>
      </div>
    </section>
  );
};

export default VideoSlider;
