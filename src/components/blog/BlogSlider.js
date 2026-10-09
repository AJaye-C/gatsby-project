import * as React from "react";
import { Link } from "gatsby";
import { formatBlogDate } from "../../utils/blog";

const HIDE_NEXT_ON_LAST = true;

const BlogSlider = ({ posts = [] }) => {
  const featuredPosts = [...posts]
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
    .slice(0, 10);
  const viewportRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const dragStartX = React.useRef(null);
  const dragPointerId = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [slideStep, setSlideStep] = React.useState(1160);
  const [slideOffset, setSlideOffset] = React.useState(170);
  const [dragOffset, setDragOffset] = React.useState(0);

  React.useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      const card = trackRef.current?.querySelector(".blog-featured-card");
      if (!viewport || !card) return;
      const gap = parseFloat(window.getComputedStyle(trackRef.current).columnGap) || 60;
      setSlideStep(card.offsetWidth + gap);
      setSlideOffset((viewport.clientWidth - card.offsetWidth) / 2);
    };

    measure();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (observer && viewportRef.current) observer.observe(viewportRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [featuredPosts.length]);

  if (!featuredPosts.length) return null;

  const goTo = (nextIndex) => {
    setActiveIndex(Math.max(0, Math.min(featuredPosts.length - 1, nextIndex)));
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
      aria-label="Featured blogs"
      aria-roledescription="carousel"
      role="region"
      className="overflow-hidden bg-brand-bg pb-12 pt-[84px] [--blog-gap:60px] [--blog-peek:110px] max-md:[--blog-gap:12px] max-md:[--blog-peek:16px] sm:pb-16"
    >
      <div
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerCancel}
        className="mx-auto max-w-[1440px] touch-none cursor-grab select-none overflow-hidden active:cursor-grabbing"
        aria-label="Drag to browse featured blogs"
      >
        <div
          ref={trackRef}
          className="flex w-max items-start gap-[var(--blog-gap)] transition-transform duration-500 ease-in-out motion-reduce:transition-none"
          style={{ transform: `translateX(${slideOffset - activeIndex * slideStep + dragOffset}px)` }}
        >
          {featuredPosts.map((post, index) => {
            const isActive = index === activeIndex;
            const categories = (post.categories?.nodes || [])
              .map(({ name }) => name)
              .join(", ");
            const image = post.featuredImage?.node?.sourceUrl;

            return (
              <article
                key={post.slug}
                aria-hidden={!isActive}
                aria-label={`${index + 1} of ${featuredPosts.length}`}
                aria-roledescription="slide"
                role="group"
                className="blog-featured-card relative h-[clamp(620px,57.083vw,822px)] w-[min(1100px,calc(100vw-var(--blog-peek)-var(--blog-peek)-var(--blog-gap)-var(--blog-gap)))] shrink-0 overflow-hidden bg-brand-accent-yellow shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
              >
                {image && <img
                  src={image}
                  alt=""
                  width="1100"
                  height="822"
                  loading={index === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 h-full w-full object-cover"
                />}
                <div className="absolute inset-x-0 bottom-0 top-[49px] bg-gradient-to-b from-[rgba(252,190,23,0.03)_52.8%] to-brand-accent-yellow to-[80.224%]" />
                <div className="absolute bottom-[185px] left-[clamp(24px,5.5556vw,80px)] right-6">
                  <h2 className="w-fit max-w-full bg-brand-teal px-[11px] py-[7px] text-[clamp(1.5rem,2.778vw,2.5rem)] font-bold leading-[1.23] tracking-[-0.05em] text-white [box-decoration-break:clone]">
                    {post.title}
                  </h2>
                </div>
                <p className="absolute bottom-[80px] left-[clamp(24px,5.5556vw,80px)] text-[clamp(0.95rem,1.389vw,1.25rem)] font-bold leading-[1.23] tracking-[-1px] text-black">
                  {categories}
                  {/*{post.date && <span className="ml-4 font-normal text-brand-slate">{formatBlogDate(post.date)}</span>}*/}
                </p>
                <Link
                  to={`/blog/${post.slug}/`}
                  state={{ blogListSearch: typeof window !== "undefined" ? window.location.search : "" }}
                  tabIndex={isActive ? 0 : -1}
                  className="absolute bottom-[56px] left-[clamp(24px,5.5556vw,80px)] text-lg font-medium tracking-[-1px] text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
                >
                  Read More <span aria-hidden="true">→</span><span className="sr-only"> about {post.title}</span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-[49px] flex justify-center gap-[9px]">
        <button
          type="button"
          aria-label="Previous blog"
          aria-hidden={activeIndex === 0}
          tabIndex={activeIndex === 0 ? -1 : 0}
          onClick={() => goTo(activeIndex - 1)}
          className={`flex h-[50px] w-[50px] items-center justify-center rounded-full bg-brand-teal text-white transition-colors hover:bg-brand-accent-yellow hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 ${activeIndex === 0 ? "invisible" : ""}`}
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5 rotate-180 stroke-current"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next blog"
          aria-hidden={HIDE_NEXT_ON_LAST && activeIndex === featuredPosts.length - 1}
          tabIndex={HIDE_NEXT_ON_LAST && activeIndex === featuredPosts.length - 1 ? -1 : 0}
          onClick={() => goTo(activeIndex + 1)}
          className={`flex h-[50px] w-[50px] items-center justify-center rounded-full bg-brand-teal text-white transition-colors hover:bg-brand-accent-yellow hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 ${HIDE_NEXT_ON_LAST && activeIndex === featuredPosts.length - 1 ? "invisible" : ""}`}
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5 stroke-current"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <p className="sr-only" aria-live="polite">Slide {activeIndex + 1} of {featuredPosts.length}</p>
    </section>
  );
};

export default BlogSlider;