import * as React from "react";
import useMutedVideo from "../../hooks/useMutedVideo";
import { mediaUrl, splitParagraphs } from "../../utils/acf";
import RichText from "../../utils/RichText";

// Page-builder layout: "split_video_intro"
// variant = Select ("yellow" or "white")
const SplitVideoIntro = ({
  variant = "yellow",
  eyebrow = "",
  heading = "",
  text = "",
  video = null,
}) => {
  const { isMuted, toggleMuted } = useMutedVideo();
  const videoSrc = mediaUrl(video);
  const hasVideo = Boolean(videoSrc);
  const paragraphs = splitParagraphs(text);

  // Normalize variant to handle string, array, or casing differences from GraphQL
  const rawVariant = Array.isArray(variant) ? variant[0] : variant;
  const isWhite = String(rawVariant || "").toLowerCase().trim() === "white";

  return (
    <section
      className={`relative isolate overflow-hidden ${
        isWhite ? "bg-white text-black" : "bg-brand-accent-yellow text-black"
      }`}
    >
      {isWhite ? (
        /* Variant 2: White background (Training Intro style) */
        <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-24 sm:px-10 lg:px-10 lg:pb-28 lg:pt-32 min-[1440px]:px-[4.75rem]">
          {/* Heading spans across the top */}
          <div className="max-w-[1200px]">
            {heading && (
              <RichText
                as="h1"
                html={heading}
                weight="bold"
                className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.1] tracking-[-0.03em]"
              />
            )}
          </div>

          {/* Content grid below heading: paragraphs left, video right */}
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_560px] lg:items-start lg:gap-16">
            <div className="max-w-[786px] space-y-5 text-base font-medium leading-relaxed tracking-[-0.5px] text-brand-slate sm:text-lg lg:text-[20px]">
              {paragraphs.length > 0 ? (
                paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                text && <div dangerouslySetInnerHTML={{ __html: text }} />
              )}
            </div>

            {hasVideo && (
              <div className="flex flex-col items-start lg:items-center">
                <video
                  src={videoSrc}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onClick={toggleMuted}
                  aria-label="Training intro video"
                  role="button"
                  className="aspect-video h-auto w-full cursor-pointer object-cover lg:max-w-[560px]"
                />
                <p className="mt-2 text-sm font-medium leading-8 tracking-[-0.8px] text-brand-slate sm:text-base">
                  *Click on Video to toggle sound
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Variant 1: Yellow background (Pricing style) */
        <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-y-4 px-6 pb-16 pt-28 sm:px-10 md:pt-32 lg:min-h-[985px] lg:gap-x-10 lg:gap-y-0 lg:px-10 lg:pb-0 lg:pt-[188px] min-[1440px]:gap-x-12 min-[1440px]:px-[4.75rem] lg:grid-cols-[minmax(0,1fr)_456px] lg:grid-rows-[auto_1fr]">
          <img
            src="/figma/icons/pound.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute z-[-1] hidden h-[720px] w-[720px] max-w-none -translate-x-1/2 lg:left-[calc(50%_-_250px)] lg:top-[174px] lg:block"
          />

          <div className="relative z-10 lg:col-start-1 lg:row-start-1">
            {eyebrow && (
              <p className="text-xl font-bold leading-none tracking-[-1px] sm:text-3xl lg:text-[40px] lg:tracking-[-2px]">
                {eyebrow}
              </p>
            )}

            {heading && (
              <RichText
                as="h1"
                html={heading}
                weight="black"
                className="mt-4 text-[clamp(2.25rem,10vw,4.5rem)] font-bold leading-none tracking-[-0.05em] sm:mt-7 lg:mt-[43px] lg:text-[clamp(3rem,calc((100vw_-_576px)/8),6.25rem)]"
              />
            )}
          </div>

          {hasVideo && (
            <div className="relative z-10 flex flex-col items-start lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:items-center lg:self-start">
              <video
                src={videoSrc}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                onClick={toggleMuted}
                aria-label="Intro video"
                role="button"
                className="aspect-video h-auto w-full cursor-pointer object-cover lg:aspect-[456/643] lg:max-w-[456px]"
              />
              <p className="mt-2 text-sm font-medium leading-8 tracking-[-0.8px] text-brand-slate sm:text-base">
                *Click on Video to toggle sound
              </p>
            </div>
          )}

          {(paragraphs.length > 0 || text) && (
            <div className="relative mt-2 max-w-[786px] space-y-5 text-base font-medium leading-snug tracking-[-0.5px] sm:text-lg lg:z-10 lg:col-start-1 lg:row-start-2 lg:mt-[42px] lg:text-[20px] lg:leading-none lg:tracking-[-1px]">
              <img
                src="/figma/icons/pound.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 z-[-1] h-[min(850px,95vw)] w-[min(850px,95vw)] max-w-none -translate-x-1/2 -translate-y-1/2 lg:hidden"
              />
              {paragraphs.length > 0 ? (
                paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <div dangerouslySetInnerHTML={{ __html: text }} />
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default SplitVideoIntro;