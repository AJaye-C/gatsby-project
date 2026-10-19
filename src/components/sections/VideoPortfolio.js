import * as React from "react";
import RichText from "../../utils/RichText";

// Page-builder layout: "video_portfolio"
// Fields: heading, portfolioCategories { label, portfolioVideos { video, clientName, title, description } }
// A category with no videos renders as a disabled tab.
const icon = (src, className = "h-6 w-6") => <img src={src} alt="" className={className} />;

const VideoPortfolio = ({ heading = "", portfolioCategories = [] }) => {
  const categories = React.useMemo(
    () =>
      portfolioCategories.map((category, index) => {
        const items = (category?.portfolioVideos || [])
          .map((entry) => ({
            src: entry?.video?.node?.mediaItemUrl,
            clientName: entry?.clientName || "",
            title: entry?.title || "",
            description: entry?.description || "",
          }))
          .filter((entry) => entry.src);
        return { id: `${index}`, label: category?.label || "", items, disabled: items.length === 0 };
      }),
    [portfolioCategories]
  );

  const firstEnabled = Math.max(0, categories.findIndex((category) => !category.disabled));
  const [activeCategory, setActiveCategory] = React.useState(firstEnabled);
  const [activeItem, setActiveItem] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);

  const videoRef = React.useRef(null);
  const tabRefs = React.useRef([]);

  const category = categories[activeCategory] || { items: [] };
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

  if (!categories.length) return null;

  const selectCategory = (index) => {
    if (categories[index]?.disabled) return;
    setActiveCategory(index);
  };

  const handleTabKeyDown = (event, index) => {
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!direction) return;
    event.preventDefault();

    let next = index;
    for (let step = 0; step < categories.length; step += 1) {
      next = (next + direction + categories.length) % categories.length;
      if (!categories[next].disabled) break;
    }
    tabRefs.current[next]?.focus();
    selectCategory(next);
  };

  const togglePlaying = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => undefined);
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

  const step = (delta) =>
    setActiveItem((current) => (item ? (current + delta + category.items.length) % category.items.length : current));

  const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

  return (
    <section className="overflow-hidden bg-brand-teal px-8 py-14 text-white sm:px-12 sm:py-20 md:px-16 lg:px-[clamp(64px,4.5vw,150px)] xl:min-h-[1500px] xl:py-[154px] min-[1920px]:px-0">
      <div className="mx-auto max-w-[1340px]">
        <RichText
          as="h2"
          html={heading}
          weight="extrabold"
          className="break-words text-center text-3xl font-extrabold leading-none tracking-[-1.5px] sm:text-5xl sm:tracking-[-2.5px] lg:text-6xl xl:text-[70px] xl:tracking-[-3.5px]"
        />

        <div className="mt-8 overflow-x-auto pb-2 sm:mt-10">
          <div
            role="tablist"
            aria-label={`${heading} categories`}
            className="mx-auto flex w-max gap-2 sm:gap-6"
          >
            {categories.map((tab, index) => (
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
                aria-label={item.title || "Portfolio video"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-4 text-center">Portfolio video pending</div>
            )}
          </div>

          <div className="relative flex items-center justify-center border-t-[3px] border-white px-14 py-4 sm:px-0">
            <div className="flex items-center gap-6 sm:gap-10">
              <button type="button" aria-label="Previous video" onClick={() => step(-1)} disabled={!item} className={ring}>
                {icon("/figma/icons/skip.svg")}
              </button>
              <button
                type="button"
                aria-label={isPlaying ? "Pause" : "Play"}
                aria-pressed={isPlaying}
                onClick={togglePlaying}
                className={ring}
              >
                {icon("/figma/icons/portfolio-play-pause.svg", "h-12 w-12")}
              </button>
              <button type="button" aria-label="Next video" onClick={() => step(1)} disabled={!item} className={ring}>
                {icon("/figma/icons/skip.svg", "h-6 w-6 rotate-180")}
              </button>
            </div>

            <button
              type="button"
              aria-label={isMuted ? "Unmute" : "Mute"}
              aria-pressed={!isMuted}
              onClick={toggleMuted}
              className={`absolute right-4 sm:right-10 ${ring}`}
            >
              {icon("/figma/icons/vol.svg")}
            </button>
          </div>

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

export default VideoPortfolio;