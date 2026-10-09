import * as React from "react";
import ReviewsCarousel from "./ReviewsCarousel";
import RichText from "./RichText";
import { mediaUrl } from "../../utils/acf";

// "Based on 88 reviews" -> two lines: "Based on" / "88 reviews"
const splitReviewSummary = (text = "") => {
  const match = text.match(/^(.*?)\s+(\d[\d,.]*\s+reviews?)$/i);
  return match ? [match[1], match[2]] : [text];
};

// Page-builder layout: "behind_the_scenes"
// fields: heading (WYSIWYG), review_summary, video, reviews (repeater: quote, author)
const BehindTheScenes = ({ heading, reviewSummary, video, reviews }) => {
  const [btsMuted, setBtsMuted] = React.useState(true);
  const summaryLines = splitReviewSummary(reviewSummary || "");
  const videoSrc = mediaUrl(video) || "/figma/videos/bts.mp4";
  const reviewItems = React.useMemo(
    () => (reviews || []).map((review) => ({ text: review.quote, name: review.author })),
    [reviews]
  );

  return (
    <section className="w-full overflow-x-clip bg-brand-bg py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-layout-shell px-6 sm:px-10 lg:px-12">
        <div className="mb-10 grid grid-cols-1 items-center gap-8 lg:mb-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <RichText
              as="h2"
              html={heading}
              className="text-3xl font-black leading-[1.05] tracking-tight text-brand-slate sm:text-5xl lg:text-6xl [&_strong]:underline [&_strong]:decoration-brand-teal [&_strong]:decoration-4 [&_strong]:underline-offset-8"
            />

            <div className="mt-6 flex items-center gap-3">
              <img src="/figma/icons/icon-google.svg" alt="Google" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
              <div className="max-w-[145px] text-lg font-bold leading-tight text-brand-slate sm:max-w-[180px] sm:text-xl">
                {summaryLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="mb-2 max-w-copy-video text-left text-xs italic text-gray-500 sm:text-sm lg:ml-auto">*Click on Video to toggle sound</div>
            <div className="w-full max-w-copy-video overflow-hidden rounded-[20px] bg-gray-200 shadow-md lg:ml-auto">
              <video
                src={videoSrc}
                autoPlay
                loop
                muted={btsMuted}
                playsInline
                onClick={() => setBtsMuted((current) => !current)}
                className="aspect-video w-full cursor-pointer object-cover sm:aspect-[16/10]"
                aria-label="Behind the scenes video"
              />
            </div>
          </div>
        </div>

        <ReviewsCarousel reviews={reviewItems} />
      </div>
    </section>
  );
};

export default BehindTheScenes;
