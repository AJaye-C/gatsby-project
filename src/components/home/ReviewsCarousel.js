import * as React from "react";
import { sectionEightReviews } from "../../data/reviews";

const ReviewsCarousel = () => {
  const repeatedReviews = [...sectionEightReviews, ...sectionEightReviews];
  const carouselRef = React.useRef(null);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    const card = carouselRef.current.querySelector(".review-card-wrapper");
    const gap = 16;
    const scrollAmount = card ? card.getBoundingClientRect().width + gap : 280;
    carouselRef.current.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden">
      <div className="mb-3 flex items-center justify-end gap-2 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          aria-label="Previous review"
          onClick={() => scrollCarousel(-1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-line bg-white text-xl font-bold text-brand-slate shadow-sm transition hover:bg-brand-yellow"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next review"
          onClick={() => scrollCarousel(1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-line bg-white text-xl font-bold text-brand-slate shadow-sm transition hover:bg-brand-yellow"
        >
          ›
        </button>
      </div>

      <div
        ref={carouselRef}
        className="review-carousel-track flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 py-2 sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {repeatedReviews.map((review, index) => (
          <div
            key={`${review.name}-${index}`}
            className="review-card-wrapper min-w-[85%] snap-center flex-shrink-0 sm:min-w-[72%] md:min-w-0 md:w-[280px] lg:w-[340px]"
          >
            <div className="flex h-[244px] flex-col rounded-[22px] bg-brand-panel p-4 sm:h-[264px]">
              <div className="mb-3 h-[182px] overflow-hidden rounded-[16px] bg-white p-5 text-xs leading-5 text-brand-slate shadow-sm [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:7] sm:h-[200px] sm:text-sm sm:leading-6">
                {review.text}
              </div>
              <div className="pl-1 text-xs font-bold text-brand-slate sm:text-sm">{review.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsCarousel;
 