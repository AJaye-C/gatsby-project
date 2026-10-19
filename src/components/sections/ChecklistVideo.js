import * as React from "react";
import { mediaUrl } from "../../utils/acf";

// Page-builder layout: "checklist_video"  (fields: heading, checkItems[{ text }], video)
// Section padding is split with BadgeCards so that, when the two sit one after the other,
// the gap between the video and the cards matches the Figma spacing (160px at lg).

const ClickToPlayVideo = ({ src, label }) => {
  const videoRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleVideoClick = () => {
    const element = videoRef.current;
    if (!element) return;

    if (isPlaying) {
      element.pause();
      setIsPlaying(false);
      return;
    }

    element.play();
    setIsPlaying(true);
  };

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={src}
        playsInline
        preload="metadata"
        onClick={handleVideoClick}
        onEnded={() => setIsPlaying(false)}
        aria-label={label}
        className="h-full w-full cursor-pointer object-cover"
      />
      {!isPlaying && (
        <button
          type="button"
          onClick={handleVideoClick}
          aria-label={`Play ${label.toLowerCase()}`}
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/75 transition-transform duration-200 hover:scale-105 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
        >
          <span
            className="ml-1.5 h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-brand-red sm:border-y-[11px] sm:border-l-[17px] lg:ml-2 lg:border-y-[13px] lg:border-l-[20px]"
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
};

const ChecklistVideo = ({ heading = "", checkItems = [], video = null }) => {
  const videoSrc = mediaUrl(video);
  const items = (checkItems || []).map((item) => item?.text).filter(Boolean);

  return (
    <section className="bg-brand-bg px-6 pb-14 pt-14 sm:px-10 md:pb-24 md:pt-24 lg:px-10 lg:pb-[116px] lg:pt-[116px] min-[1440px]:px-0">
      <div className="mx-auto max-w-[1380px]">
        {heading && (
          <h2 className="max-w-[1380px] text-4xl font-bold leading-none tracking-[-0.04em] text-brand-slate sm:text-5xl md:text-6xl xl:text-[80px] xl:tracking-[-4px]">
            {heading}
          </h2>
        )}

        {items.length > 0 && (
          <ul className="mt-8 space-y-4 text-xl font-medium leading-tight tracking-[-1px] text-brand-slate sm:text-2xl md:mt-12 md:text-3xl lg:mt-[50px] lg:text-[40px] lg:leading-none lg:tracking-[-2px]">
            {items.map((item, index) => (
              <li key={`${item}-${index}`} className="flex items-baseline gap-3">
                <span
                  className="shrink-0 text-3xl font-bold leading-none tracking-[-2px] text-brand-teal sm:text-4xl md:text-5xl lg:text-[50px] lg:tracking-[-2.5px]"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {videoSrc && (
          <div className="mt-14 md:mt-20 lg:mt-[120px]">
            <ClickToPlayVideo src={videoSrc} label={heading ? `${heading} video` : "Video"} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ChecklistVideo;
