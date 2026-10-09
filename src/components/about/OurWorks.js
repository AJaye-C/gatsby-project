import * as React from "react";
import { mediaUrl, mediaAlt } from "../../utils/acf";

// Page-builder layout: "works_carousel"
// Fields: heading (Text), cards (Repeater: label, title, body, image, video)
// A card with a video plays the video; otherwise it shows the image.

const GAP = 16;
const CARD_WIDTH = 400;
const CARD_HEIGHT = 700;
const SIDE_SCALE = 0.9; // side cards are a scaled-down copy of the same card, not a separately-sized box

// Pixels the pointer must travel before it counts as a drag. Capturing the pointer on
// press would redirect the click away from buttons/cards, so capture only starts after this.
const DRAG_THRESHOLD = 5;

const mod = (n, m) => ((n % m) + m) % m;

const OurWorks = ({ heading, cards = [] }) => {
  const workCards = cards.map((card) => {
    const videoSrc = mediaUrl(card.video);
    return {
      type: videoSrc ? "video" : "image",
      image: videoSrc || mediaUrl(card.image),
      imageAlt: mediaAlt(card.image, card.title || card.label || ""),
      label: card.label,
      title: card.title,
      body: card.body,
    };
  });
  const total = workCards.length;
  const viewportRef = React.useRef(null);
  const dragStartX = React.useRef(null);
  const dragPointerId = React.useRef(null);
  const dragMoved = React.useRef(false);
  const isCaptured = React.useRef(false);
  const [isSingleCard, setIsSingleCard] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState(0);

  // `pos` is a virtual, unbounded position on an endless strip. The card at
  // virtual slot v is workCards[mod(v, total)], so the strip repeats forever
  // in both directions: 1,2,3 -> 2,3,4 -> 3,4,1 -> 4,1,2 -> 1,2,3 ...
  // Every slot keeps its own DOM node and its own fixed position, and only the
  // whole strip slides, so there are no clones, no snapping and no resets.
  const [pos, setPos] = React.useState(1); // starts centered on card 2 (shows 1,2,3)
  React.useEffect(() => {
    const measureCarousel = () => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      setIsSingleCard(window.innerWidth < 1000);
    };

    measureCarousel();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measureCarousel) : null;
    if (observer && viewportRef.current) observer.observe(viewportRef.current);
    window.addEventListener("resize", measureCarousel);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measureCarousel);
    };
  }, []);

  if (!total) return null;

  // 3 slots are visible (pos-1, pos, pos+1). The extra slot on each side is
  // mounted just off-screen so the next card is already in place before it slides in.
  const slots = [-2, -1, 0, 1, 2].map((offset) => pos + offset);

  const cardWidth = CARD_WIDTH;
  const cardHeight = CARD_HEIGHT;
  const translateX = (CARD_WIDTH + GAP) * (isSingleCard ? -pos : 1 - pos);

  const handlePointerDown = (event) => {
    dragStartX.current = event.clientX;
    dragPointerId.current = event.pointerId;
    dragMoved.current = false;
    isCaptured.current = false;
  };

  const handlePointerMove = (event) => {
    if (dragStartX.current === null || event.pointerId !== dragPointerId.current) return;

    const distance = event.clientX - dragStartX.current;
    if (!isCaptured.current) {
      if (Math.abs(distance) < DRAG_THRESHOLD) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      isCaptured.current = true;
      dragMoved.current = true;
    }
    setDragOffset(distance);
  };

  const handlePointerEnd = (event) => {
    if (dragStartX.current === null || event.pointerId !== dragPointerId.current) return;

    const distance = event.clientX - dragStartX.current;
    const moved = Math.abs(distance) >= 50;
    dragStartX.current = null;
    dragPointerId.current = null;
    setDragOffset(0);

    if (moved) setPos((current) => current + (distance < 0 ? 1 : -1));
  };

  const handlePointerCancel = () => {
    dragStartX.current = null;
    dragPointerId.current = null;
    dragMoved.current = false;
    setDragOffset(0);
  };

  const Arrow = ({ direction }) => (
    <button
      type="button"
      aria-label={direction === "previous" ? "Previous" : "Next"}
      onClick={() => setPos((current) => current + (direction === "previous" ? -1 : 1))}
      className="section-three-nav flex h-11 w-11 items-center justify-center"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className={direction === "previous" ? "rotate-180" : ""}>
        <rect className="arrow-bg" x="0" y="0" width="32" height="32" rx="16" />
        <path d="M8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17V16V15ZM24.7071 16.7071C25.0976 16.3166 25.0976 15.6834 24.7071 15.2929L18.3431 8.92893C17.9526 8.53841 17.3195 8.53841 16.9289 8.92893C16.5384 9.31946 16.5384 9.95262 16.9289 10.3431L22.5858 16L16.9289 21.6569C16.5384 22.0474 16.5384 22.6805 16.9289 23.0711C17.3195 23.4616 17.9526 23.0711 18.3431 23.0711L24.7071 16.7071ZM8 16V17H24V16V15H8V16Z" fill="black" />
      </svg>
    </button>
  );

  return (
    <section className="w-full overflow-hidden bg-brand-bg py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-layout-shell px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-[clamp(3.25rem,7vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.06em] text-brand-teal">
          {heading}
        </h2>

        <div
          ref={viewportRef}
          className="our-works-viewport mx-auto mt-10 touch-none cursor-grab select-none overflow-hidden active:cursor-grabbing"
          style={{ width: isSingleCard ? `${CARD_WIDTH}px` : `${CARD_WIDTH * 3 + GAP * 2}px` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerCancel}
        >
          <div className="relative" style={{ height: `${cardHeight}px` }}>
            <div
              className="absolute left-0 top-0 h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${translateX + dragOffset}px)` }}
            >
              {slots.map((v) => {
                const card = workCards[mod(v, total)];
                const isCenter = v === pos;
                const labelText = isCenter ? "text-[17px]" : "text-[13px]";
                const captionPad = isCenter ? "px-6 py-8" : "px-4 py-6";

                return (
                  <article
                    key={v}
                    className="works-card group absolute top-0 cursor-pointer overflow-hidden rounded-none transition-transform duration-500 ease-in-out"
                    style={{
                      left: `${v * (cardWidth + GAP)}px`,
                      width: `${cardWidth}px`,
                      height: `${cardHeight}px`,
                      transform: isCenter ? "scale(1)" : `scale(${SIDE_SCALE})`,
                      zIndex: isCenter ? 10 : 0,
                      boxShadow: isCenter
                        ? "0 12px 24px rgba(0,0,0,0.14)"
                        : "0 4px 12px rgba(0,0,0,0.06)",
                    }}
                    onClick={() => {
                      if (dragMoved.current) {
                        dragMoved.current = false;
                        return;
                      }
                      if (!isSingleCard) setPos(v);
                    }}
                  >
                    {card.type === "video" ? (
                      <video
                        ref={(el) => {
                          if (!el) return;
                          el.muted = true;
                          if (isCenter) {
                            const p = el.play();
                            if (p && p.catch) p.catch(() => {});
                          } else {
                            el.pause();
                          }
                        }}
                        src={card.image}
                        muted={true}
                        loop
                        playsInline
                        className="absolute inset-0 h-full w-full cursor-pointer object-cover"
                        aria-label={`${card.title} preview video`}
                      />
                    ) : (
                      <img
                        src={card.image}
                        alt={card.imageAlt}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )}

                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(252,190,23,0) 0%, rgba(252,190,23,0.85) 42%, #FCBE17 100%)",
                      }}
                    />

                    {/* Side cards are washed out white so focus stays on the center card */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-white transition-opacity duration-500"
                      style={{ opacity: isCenter ? 0 : 0.55 }}
                    />

                    <div
                      className={`absolute inset-x-0 bottom-0 flex flex-col gap-2 transition-all duration-500 ${captionPad}`}
                    >
                      <span
                        className={`inline-flex w-fit items-center bg-brand-teal px-3 py-1 font-medium leading-none text-white transition-all duration-500 ${labelText}`}
                      >
                        {card.label}
                      </span>

                      <h3
                        className={`font-bold leading-[1.15] tracking-[-0.02em] text-brand-text-dark transition-all duration-500 ${labelText}`}
                      >
                        {card.title}
                      </h3>

                      <p
                        className={`leading-[1.3] text-brand-text-dark transition-all duration-500 ${labelText}`}
                      >
                        {card.body}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div className="our-works-mobile-controls mt-5 flex items-center justify-center gap-3">
          <Arrow direction="previous" />
          <Arrow direction="next" />
        </div>
      </div>
    </section>
  );
};

export default OurWorks;