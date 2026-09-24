import * as React from "react";
import { sectionEightReviews } from "../../data/reviews";
 
// VERSION: reviews-card-v5 — flat p-4 padding, card h-244/sm:264, box h-182/sm:200, ratio ~76%
const ReviewsCarousel = () => {
  const repeatedReviews = [...sectionEightReviews, ...sectionEightReviews];
 
  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden">
      <div className="review-carousel-track flex gap-4 px-4 py-4 sm:gap-5 sm:px-6 lg:px-8">
        {repeatedReviews.map((review, index) => (
          <div key={`${review.name}-${index}`} className="review-card-wrapper w-[280px] flex-shrink-0 sm:w-[300px] lg:w-[340px]">
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
 