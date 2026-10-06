import * as React from "react";

const portfolioCategories = [
  {
    id: "beauty",
    label: "Beauty & Cosmetics",
    items: [
      {
        src: "/figma/videos/beauty.mp4",
        clientName: "James Read Tan",
        title: "Beauty and Cosmetics Video",
        description:
          "Our professional video production services are used to promote beauty and cosmetics products. We can do this by creating brand films, delivering lifestyle content, covering cosmetic product launches and beauty events, and more!",
        alt: "Beauty and cosmetics video",
      },
    ],
  },
  { id: "food", label: "Food & Drink", items: [], disabled: true },
  { id: "products", label: "Products", items: [], disabled: true },
  { id: "events", label: "Events", items: [], disabled: true },
  { id: "crowdfunding", label: "Crowdfunding", items: [], disabled: true },
  { id: "others", label: "All Others", items: [], disabled: true },
];

const controlIcon = (
  src,
  alt,
  className = "h-6 w-6"
) => (
  <img src={src} alt={alt} className={className} />
);

const VideographyPortfolio = () => {
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const [activeItem, setActiveItem] = React.useState(0);

  const videoRef = React.useRef(null);
  const tabRefs = React.useRef([]);

  const category = portfolioCategories[activeCategory];
  const item = category.items[activeItem];

  React.useEffect(() => {
    setActiveItem(0);
    setIsPlaying(false);
  }, [activeCategory]);

  React.useEffect(() => {
    const video = videoRef.current;

    if (!video || !item) return undefined;

    video.muted = true;
    setIsMuted(true);

    video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));

    return () => video.pause();
  }, [item]);

  const selectCategory = (index) => {
    if (portfolioCategories[index].disabled) return;
    setActiveCategory(index);
  };

  const handleTabKeyDown = (event, index) => {
    const direction =
      event.key === "ArrowRight"
        ? 1
        : event.key === "ArrowLeft"
          ? -1
          : 0;

    if (!direction) return;

    event.preventDefault();

    const nextIndex =
      (index + direction + portfolioCategories.length) %
      portfolioCategories.length;

    tabRefs.current[nextIndex]?.focus();
    selectCategory(nextIndex);
  };

  const togglePlaying = () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => undefined);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMuted = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section className="overflow-hidden bg-brand-teal px-8 py-14 text-white sm:px-12 sm:py-20 md:px-16 lg:px-[clamp(64px,4.5vw,150px)] xl:min-h-[1500px] xl:py-[154px] min-[1920px]:px-0">
      <div className="mx-auto max-w-[1340px]">
        <h2 className="break-words text-3xl font-extrabold leading-none tracking-[-1.5px] sm:text-5xl sm:tracking-[-2.5px] lg:text-6xl xl:text-[70px] xl:tracking-[-3.5px]">
          A Snapshot of our Video Production Portfolio
        </h2>

        {/* Tabs scroll sideways when they don't fit */}
        <div
          role="tablist"
          aria-label="Video portfolio categories"
          className="mt-8 flex gap-2 overflow-x-auto pb-2 sm:mt-10 sm:gap-6"
        >
          {portfolioCategories.map((tab, index) => (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              aria-selected={activeCategory === index}
              aria-disabled={tab.disabled || undefined}
              disabled={tab.disabled}
              onClick={() => selectCategory(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={`shrink-0 rounded-[20px] px-4 py-3 text-base font-medium leading-none tracking-[-0.5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-teal sm:text-xl sm:tracking-[-1px] ${
                activeCategory === index
                  ? "bg-brand-accent-yellow font-bold text-black"
                  : "text-white disabled:cursor-not-allowed disabled:opacity-70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6 border-[3px] border-white sm:mt-8">
          <div className="aspect-video bg-brand-teal">
            {item ? (
              <video
                ref={videoRef}
                src={item.src}
                muted
                playsInline
                autoPlay
                loop
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                aria-label={item.alt}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-4 text-center">
                Portfolio video pending
              </div>
            )}
          </div>

          {/* Media controls */}
          <div className="relative flex items-center justify-center border-t-[3px] border-white px-14 py-4 sm:px-0">
            <div className="flex items-center gap-6 sm:gap-10">
              <button
                type="button"
                aria-label="Previous video"
                onClick={() =>
                  setActiveItem((current) =>
                    item
                      ? (current - 1 + category.items.length) % category.items.length
                      : current
                  )
                }
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                disabled={!item}
              >
                {controlIcon("/figma/icons/skip.svg", "")}
              </button>

              <button
                type="button"
                aria-label={isPlaying ? "Pause" : "Play"}
                aria-pressed={isPlaying}
                onClick={togglePlaying}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {controlIcon(
                  "/figma/icons/portfolio-play-pause.svg",
                  "",
                  "h-12 w-12"
                )}
              </button>

              <button
                type="button"
                aria-label="Next video"
                onClick={() =>
                  setActiveItem((current) =>
                    item
                      ? (current + 1) % category.items.length
                      : current
                  )
                }
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                disabled={!item}
              >
                {controlIcon(
                  "/figma/icons/skip.svg",
                  "",
                  "h-6 w-6 rotate-180"
                )}
              </button>
            </div>

            <button
              type="button"
              aria-label={isMuted ? "Unmute" : "Mute"}
              aria-pressed={!isMuted}
              onClick={toggleMuted}
              className="absolute right-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-10"
            >
              {controlIcon(
                "/figma/icons/vol.svg",
                "",
                "h-6 w-6"
              )}
            </button>
          </div>

          {/* Portfolio information */}
          {item && (
            <div className="grid grid-cols-1 border-t-[3px] border-white sm:grid-cols-[1fr_2fr]">
              <div className="flex min-h-[88px] items-center justify-center bg-white p-5 text-center text-xl font-bold text-brand-slate sm:min-h-[140px] sm:p-6 sm:text-2xl">
                {item.clientName}
              </div>

              <div className="p-5 text-white sm:p-8">
                <h3 className="text-lg font-bold sm:text-xl">{item.title}</h3>

                <p className="mt-3 text-base font-medium leading-[1.35] tracking-[-0.5px] sm:mt-4 sm:text-xl sm:tracking-[-1px] xl:leading-[1.09]">
                  {item.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideographyPortfolio;
