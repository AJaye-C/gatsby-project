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
    <section className="overflow-hidden bg-brand-teal px-6 py-20 text-white sm:px-10 lg:min-h-[1500px] lg:px-0 lg:py-[154px]">
      <div className="mx-auto max-w-[1340px]">
        <h2 className="text-4xl font-extrabold leading-none tracking-[-3.5px] sm:text-5xl lg:text-[70px]">
          A Snapshot of our Video Production Portfolio
        </h2>

        <div
          role="tablist"
          aria-label="Video portfolio categories"
          className="mt-10 flex gap-6 overflow-x-auto pb-2"
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
              className={`shrink-0 rounded-[20px] px-4 py-3 text-xl font-medium leading-none tracking-[-1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-teal ${
                activeCategory === index
                  ? "bg-brand-accent-yellow font-bold text-black"
                  : "text-white disabled:cursor-not-allowed disabled:opacity-70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8 border-[3px] border-white">
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
              <div className="flex h-full items-center justify-center">
                Portfolio video pending
              </div>
            )}
          </div>

          {/* Media controls */}
          <div className="relative flex items-center justify-center border-t-[3px] border-white py-4">
            <div className="flex items-center gap-10">
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
              className="absolute right-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
              <div className="flex min-h-[140px] items-center justify-center bg-white p-6 text-2xl font-bold text-brand-slate">
                {item.clientName}
              </div>

              <div className="p-8 text-white">
                <h3 className="text-xl font-bold">{item.title}</h3>

                <p className="mt-4 text-xl font-medium leading-[1.09] tracking-[-1px]">
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