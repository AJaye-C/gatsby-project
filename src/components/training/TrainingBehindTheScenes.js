import * as React from "react";
import useMutedVideo from "../../hooks/useMutedVideo";

const VIDEOS = [
  { src: "/figma/videos/pocketperson.mp4", label: "Pocket Person behind-the-scenes video" },
  { src: "/figma/videos/bts.mp4", label: "Behind-the-scenes video" },
  { src: "/figma/videos/pricing.mp4", label: "Pricing behind-the-scenes video" },
  { src: "/figma/videos/product.mp4", label: "Product behind-the-scenes video" },
];

const HIDE_NEXT_ON_LAST = true;

const TrainingBehindTheScenes = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [slideWidth, setSlideWidth] = React.useState(1060);
  const [dragOffset, setDragOffset] = React.useState(0);
  const viewportRef = React.useRef(null);
  const videoRefs = React.useRef([]);
  const dragStartX = React.useRef(null);
  const dragPointerId = React.useRef(null);
  const { isMuted, toggleMuted, resetMuted } = useMutedVideo();

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
  }, []);

  const goTo = (nextIndex) => {
    setActiveIndex(Math.max(0, Math.min(VIDEOS.length - 1, nextIndex)));
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
    goTo(activeIndex + (distance < 0 ? 1 : -1));
  };

  const handlePointerCancel = () => {
    dragStartX.current = null;
    dragPointerId.current = null;
    setDragOffset(0);
  };

  return (
    <section
      aria-label="Behind the scenes videos"
      aria-roledescription="carousel"
      role="region"
      className="overflow-x-clip bg-brand-accent-yellow py-20 text-black lg:min-h-[1220px] lg:py-[125px]"
    >
      <div className="mx-auto max-w-[1920px] px-[clamp(24px,8vw,150px)] 2xl:px-12">
        <h2 className="text-center text-[clamp(3.25rem,6.25vw,7.5rem)] font-extrabold leading-none tracking-[-0.05em]">
          Want to see us at work?
        </h2>

        <div className="mx-auto mt-12 max-w-[1112px] space-y-4 text-base font-medium leading-[1.15] tracking-[-0.8px] sm:text-lg lg:mt-[68px] lg:text-[20px] lg:tracking-[-1px]">
          <p>
            If you hadn&apos;t already guessed, we love what we do, and we&apos;re proud of the video production projects that our team have delivered.
          </p>
          <p>
            Have a look at some of these <strong className="font-extrabold">behind the scenes</strong> videos to see what it&apos;s like to be on set with us.
          </p>
        </div>

        <div className="relative mx-auto mt-14 grid max-w-[1290px] grid-cols-2 items-center justify-center gap-6 md:flex lg:mt-[72px] lg:gap-6 xl:gap-[115px]">
          <button
            type="button"
            aria-label="Previous video"
            aria-hidden={activeIndex === 0}
            tabIndex={activeIndex === 0 ? -1 : 0}
            onClick={() => goTo(activeIndex - 1)}
            className={`order-2 col-start-1 row-start-2 flex h-12 w-12 shrink-0 items-center justify-center justify-self-end focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-accent-yellow md:order-1 md:col-auto md:row-auto md:justify-self-auto lg:h-[117px] lg:w-[60px] ${activeIndex === 0 ? "invisible" : ""}`}
          >
            <img src="/figma/icons/icon-arrow-down.svg" alt="" aria-hidden="true" className="h-auto w-8 rotate-90 lg:w-[34px]" />
          </button>

          <div
            ref={viewportRef}
            className="order-1 col-span-2 row-start-1 w-full max-w-[1060px] touch-none cursor-grab select-none overflow-hidden active:cursor-grabbing md:order-2 md:col-auto md:row-auto"
            aria-live="off"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerCancel}
          >
            <div
              className="flex w-max transition-transform duration-500 ease-in-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${activeIndex * slideWidth + dragOffset}px)` }}
            >
              {VIDEOS.map((video, index) => {
                const isActive = index === activeIndex;

                return (
                  <article
                    key={video.src}
                    aria-hidden={!isActive}
                    aria-label={`${index + 1} of ${VIDEOS.length}`}
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
            aria-hidden={HIDE_NEXT_ON_LAST && activeIndex === VIDEOS.length - 1}
            tabIndex={HIDE_NEXT_ON_LAST && activeIndex === VIDEOS.length - 1 ? -1 : 0}
            onClick={() => goTo(activeIndex + 1)}
            className={`order-3 col-start-2 row-start-2 flex h-12 w-12 shrink-0 items-center justify-center justify-self-start focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-accent-yellow md:order-3 md:col-auto md:row-auto md:justify-self-auto lg:h-[117px] lg:w-[60px] ${HIDE_NEXT_ON_LAST && activeIndex === VIDEOS.length - 1 ? "invisible" : ""}`}
          >
            <img src="/figma/icons/icon-arrow-down.svg" alt="" aria-hidden="true" className="h-auto w-8 -rotate-90 lg:w-[34px]" />
          </button>
        </div>

        <p className="sr-only" aria-live="polite">Slide {activeIndex + 1} of {VIDEOS.length}</p>
      </div>
    </section>
  );
};

export default TrainingBehindTheScenes;
