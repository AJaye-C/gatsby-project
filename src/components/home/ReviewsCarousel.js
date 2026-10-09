import * as React from "react";
import { sectionEightReviews } from "../../data/reviews";

const AUTOPLAY_MS = 2500;
const SCROLL_MS = 800; // glide duration per review
const COPIES = 3; // middle copy is the "home" position; we silently jump between copies to loop

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// `reviews` = [{ text, name }]. Falls back to src/data/reviews.js if none are passed.
const ReviewsCarousel = ({ reviews }) => {
  const reviewList = reviews && reviews.length ? reviews : sectionEightReviews;
  const count = reviewList.length;
  const loopedReviews = React.useMemo(
    () => Array.from({ length: COPIES }, (_, copy) => reviewList.map((review) => ({ review, copy }))).flat(),
    [reviewList]
  );
  const carouselRef = React.useRef(null);
  const isPausedRef = React.useRef(false);
  const lastStepRef = React.useRef(0);
  const animationRef = React.useRef(0);
  const targetIndexRef = React.useRef(0);
  const dragStartX = React.useRef(null);
  const dragStartScrollLeft = React.useRef(0);
  const dragPointerId = React.useRef(null);

  const cancelAnimation = React.useCallback(() => {
    if (animationRef.current) {
      window.cancelAnimationFrame(animationRef.current);
      animationRef.current = 0;
    }
    if (carouselRef.current) carouselRef.current.style.scrollSnapType = "";
  }, []);

  const disableScrollSnap = React.useCallback(() => {
    if (carouselRef.current) carouselRef.current.style.scrollSnapType = "none";
  }, []);

  // Custom eased glide: native smooth scrolling is short, linear-ish and fights scroll-snap
  const animateTo = React.useCallback(
    (target) => {
      const track = carouselRef.current;
      if (!track) return;

      const from = track.scrollLeft;
      const distance = target - from;
      if (!distance) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        track.scrollLeft = target;
        return;
      }

      track.style.scrollSnapType = "none"; // snap would interrupt the glide; restored at the end
      const startTime = window.performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / SCROLL_MS, 1);
        track.scrollLeft = from + distance * easeInOutCubic(progress);

        if (progress < 1) {
          animationRef.current = window.requestAnimationFrame(tick);
        } else {
          animationRef.current = 0;
          track.style.scrollSnapType = "";
        }
      };

      animationRef.current = window.requestAnimationFrame(tick);
    },
    []
  );

  // One step = card width + gap (measured, so it is correct at every breakpoint)
  const getStep = React.useCallback(() => {
    const track = carouselRef.current;
    const card = track && track.querySelector(".review-card-wrapper");
    if (!card) return 0;
    const gap = parseFloat(window.getComputedStyle(track).columnGap) || 16;
    return card.offsetWidth + gap;
  }, []);

  const snapToNearestReview = React.useCallback(() => {
    const track = carouselRef.current;
    const step = getStep();
    if (!track || !step) return;

    const nearestIndex = Math.round(track.scrollLeft / step);
    targetIndexRef.current = nearestIndex;
    animateTo(nearestIndex * step);
  }, [animateTo, getStep]);

  const scrollByReview = React.useCallback(
    (direction) => {
      const track = carouselRef.current;
      const step = getStep();
      if (!track || !step || !count) return;

      // If a glide is still running (rapid clicks), continue from its target instead of re-rounding
      let index = animationRef.current ? targetIndexRef.current : Math.round(track.scrollLeft / step);
      cancelAnimation();

      // Stay inside the middle copy; the jump is invisible because the copies are identical
      if (index < count) {
        index += count;
        track.scrollLeft += count * step;
      } else if (index >= count * 2) {
        index -= count;
        track.scrollLeft -= count * step;
      }

      targetIndexRef.current = index + direction;
      animateTo(targetIndexRef.current * step);
    },
    [animateTo, cancelAnimation, count, getStep]
  );

  // Start on the middle copy (so "previous" works immediately) and re-align on resize
  React.useEffect(() => {
    const track = carouselRef.current;
    if (!track) return undefined;

    const align = () => {
      const step = getStep();
      if (!step) return;
      const index = lastStepRef.current ? Math.round(track.scrollLeft / lastStepRef.current) : count;
      track.scrollLeft = index * step;
      lastStepRef.current = step;
    };

    align();
    window.addEventListener("resize", align);
    return () => window.removeEventListener("resize", align);
  }, [count, getStep]);

  // Auto-advance one review every 2.5s on every screen size
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const id = window.setInterval(() => {
      if (isPausedRef.current || document.hidden) return;
      scrollByReview(1);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [scrollByReview]);

  React.useEffect(() => cancelAnimation, [cancelAnimation]);

  const pause = () => {
    isPausedRef.current = true;
  };
  const resume = () => {
    isPausedRef.current = false;
  };

  const handlePointerDown = (event) => {
    if (!carouselRef.current) return;

    dragStartX.current = event.clientX;
    dragStartScrollLeft.current = carouselRef.current.scrollLeft;
    dragPointerId.current = event.pointerId;
    pause();
    cancelAnimation();
    disableScrollSnap();
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (
      dragStartX.current === null ||
      dragPointerId.current !== event.pointerId ||
      !carouselRef.current
    ) {
      return;
    }

    const distance = event.clientX - dragStartX.current;
    carouselRef.current.scrollLeft = dragStartScrollLeft.current - distance;
  };

  const handlePointerEnd = (event) => {
    if (dragStartX.current === null || dragPointerId.current !== event.pointerId) return;

    dragStartX.current = null;
    dragStartScrollLeft.current = 0;
    dragPointerId.current = null;
    snapToNearestReview();
    window.setTimeout(resume, AUTOPLAY_MS);
  };

  const handlePointerCancel = () => {
    dragStartX.current = null;
    dragStartScrollLeft.current = 0;
    dragPointerId.current = null;
    window.setTimeout(resume, AUTOPLAY_MS);
  };

  return (
    <div
      className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <div className="mb-3 flex items-center justify-end gap-2 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          aria-label="Previous review"
          onClick={() => scrollByReview(-1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-line bg-white text-xl font-bold text-brand-slate shadow-sm transition hover:bg-brand-yellow"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next review"
          onClick={() => scrollByReview(1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-line bg-white text-xl font-bold text-brand-slate shadow-sm transition hover:bg-brand-yellow"
        >
          ›
        </button>
      </div>

      <div
        ref={carouselRef}
        onWheel={cancelAnimation}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerCancel}
        className="review-carousel-track flex touch-pan-x snap-x gap-4 overflow-x-auto overscroll-x-contain px-4 py-2 scroll-pl-4 cursor-grab select-none [scrollbar-width:none] active:cursor-grabbing sm:px-6 sm:scroll-pl-6 lg:px-8 lg:scroll-pl-8 [&::-webkit-scrollbar]:hidden"
      >
        {loopedReviews.map(({ review, copy }, index) => (
          <div
            key={`${copy}-${review.name}-${index}`}
            aria-hidden={copy > 0 ? "true" : undefined}
            className="review-card-wrapper w-[85%] flex-shrink-0 snap-start snap-always sm:w-[60%] md:w-[300px] lg:w-[340px]"
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