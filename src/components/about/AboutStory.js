import * as React from "react";
import { cleanWpHtml } from "../home/RichText";

// Page-builder layout: "story_timeline"
// Fields: heading, intro (WYSIWYG), start_year, end_year, events (Repeater: caption [WYSIWYG]), closing_text (Text Area)
// Captions alternate below / above the line automatically. Dot positions come from the
// per-dot CSS classes in global.css, so the timeline supports up to 5 events.
// IMPORTANT: class names are written out in full (never built with template strings),
// otherwise Tailwind's purge removes the CSS for them.
const DOT_CLASSES = [
  "about-story-dot-1",
  "about-story-dot-2",
  "about-story-dot-3",
  "about-story-dot-4",
  "about-story-dot-5",
];
const CAPTION_POSITION_CLASSES = {
  below: "about-story-caption-below",
  above: "about-story-caption-above",
};
const CAPTION_COLOR_CLASSES = {
  slate: "about-story-caption-slate",
};
const MAX_EVENTS = DOT_CLASSES.length;

// Pixels the pointer must travel before it counts as a drag. Capturing the pointer on
// press would redirect the click away from buttons/cards, so capture only starts after this.
const DRAG_THRESHOLD = 5;


export const StoryArrow = ({ direction, disabled, onClick, variant = "default" }) => (
  <button
    type="button"
    aria-label={direction === "previous" ? "Previous" : "Next"}
    disabled={disabled}
    onClick={onClick}
    className={`about-story-arrow section-three-nav ${variant === "inverted" ? "about-story-arrow-inverted" : ""} ${disabled ? "invisible pointer-events-none" : "visible"}`}
  >
    <svg viewBox="0 0 32 32" aria-hidden="true" className={direction === "previous" ? "rotate-180" : ""}>
      <rect className="arrow-bg" x="0" y="0" width="32" height="32" rx="16" />
      <path d="M8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17V16V15ZM24.7071 16.7071C25.0976 16.3166 25.0976 15.6835 24.7071 15.2929L18.3431 8.92893C17.9526 8.53841 17.3195 8.53841 16.9289 8.92893C16.5384 9.31946 16.5384 9.95262 16.9289 10.3431L22.5858 16L16.9289 21.6569C16.5384 22.0474 16.5384 22.6805 16.9289 23.0711C17.3195 23.4616 17.9526 23.4616 18.3431 23.0711L24.7071 16.7071ZM8 16V17H24V16V15H8V16Z" fill="black" />
    </svg>
  </button>
);

const AboutStory = ({ heading, intro, startYear, endYear, events = [], closingText }) => {
  if (process.env.NODE_ENV !== "production" && events.length > MAX_EVENTS) {
    // eslint-disable-next-line no-console
    console.warn(`[AboutStory] ${events.length} events found, only the first ${MAX_EVENTS} have CSS positions.`);
  }

  const milestones = [
    { kind: "major", label: startYear, className: "about-story-milestone-2017" },
    ...events.slice(0, MAX_EVENTS).map((event, index) => ({
      kind: "dot",
      caption: event.caption,
      captionPosition: index % 2 === 0 ? "below" : "above",
      captionColor: "slate",
      className: DOT_CLASSES[index],
    })),
    { kind: "major", label: endYear, className: "about-story-milestone-2025" },
  ];

  const [step, setStep] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const [mobileStepCount, setMobileStepCount] = React.useState(0);
  const [mobileStepDistance, setMobileStepDistance] = React.useState(0);
  const [dragOffset, setDragOffset] = React.useState(0);
  const viewportRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const dragStartX = React.useRef(null);
  const dragPointerId = React.useRef(null);
  const isCaptured = React.useRef(false);
  const offsets = ["0vw", "-47.708vw", "-101.771vw", "-142vw"];

  React.useEffect(() => {
    const measureMobileTrack = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (!mobile || !viewportRef.current || !trackRef.current) {
        setMobileStepCount(0);
        setMobileStepDistance(0);
        setStep((current) => Math.min(current, offsets.length - 1));
        return;
      }

      const viewportWidth = viewportRef.current.clientWidth;
      const stepDistance = viewportWidth * 0.85;
      const maxOffset = Math.max(0, trackRef.current.scrollWidth - viewportWidth);
      const stepCount = Math.ceil(maxOffset / stepDistance);

      setMobileStepDistance(stepDistance);
      setMobileStepCount(stepCount);
      setStep((current) => Math.min(current, stepCount));
    };

    measureMobileTrack();
    window.addEventListener("resize", measureMobileTrack);

    return () => window.removeEventListener("resize", measureMobileTrack);
  }, [offsets.length]);

  const moveTrack = (direction) => {
    const finalStep = isMobile ? mobileStepCount : offsets.length - 1;
    setStep((current) => Math.min(finalStep, Math.max(0, current + direction)));
  };

  const handlePointerDown = (event) => {
    dragStartX.current = event.clientX;
    dragPointerId.current = event.pointerId;
    isCaptured.current = false;
  };

  const handlePointerMove = (event) => {
    if (dragStartX.current === null || event.pointerId !== dragPointerId.current) return;

    const distance = event.clientX - dragStartX.current;
    if (!isCaptured.current) {
      if (Math.abs(distance) < DRAG_THRESHOLD) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      isCaptured.current = true;
    }
    setDragOffset(distance);
  };

  const handlePointerEnd = (event) => {
    if (dragStartX.current === null || event.pointerId !== dragPointerId.current) return;

    const delta = event.clientX - dragStartX.current;
    dragStartX.current = null;
    dragPointerId.current = null;
    setDragOffset(0);

    if (Math.abs(delta) >= 40) moveTrack(delta < 0 ? 1 : -1);
  };

  const handlePointerCancel = () => {
    dragStartX.current = null;
    dragPointerId.current = null;
    setDragOffset(0);
  };

  const baseTransform = isMobile
    ? `translateX(-${Math.min(step * mobileStepDistance, Math.max(0, (trackRef.current?.scrollWidth || 0) - (viewportRef.current?.clientWidth || 0)))}px)`
    : `translateX(${offsets[Math.min(step, offsets.length - 1)]})`;
  const trackTransform = `${baseTransform} translateX(${dragOffset}px)`;

  return (
    <section className="about-story-section">
      <div
        ref={viewportRef}
        className="about-story-panel touch-none cursor-grab select-none active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerCancel}
      >
        <div ref={trackRef} className="about-story-track" style={{ transform: trackTransform }}>
          <div className="about-story-copy">
            <h2>{heading}</h2>
            <p dangerouslySetInnerHTML={{ __html: cleanWpHtml(intro) }} />
          </div>

          <div className="about-story-axis" aria-hidden="true" />

          {milestones.map((milestone) => {
            if (milestone.kind === "major") {
              return (
                <div key={milestone.label} className={`about-story-marker about-story-major ${milestone.className}`}>
                  {milestone.label}
                </div>
              );
            }

            return (
              <div key={milestone.className} className={`about-story-marker about-story-dot ${milestone.className}`}>
                <p
                  className={`about-story-caption ${CAPTION_POSITION_CLASSES[milestone.captionPosition]} ${CAPTION_COLOR_CLASSES[milestone.captionColor]} [&_strong]:font-normal [&_strong]:underline`}
                  style={{
                    top: milestone.captionPosition === "below" ? "calc(100% + var(--story-caption-gap, 32px))" : "auto",
                    bottom: milestone.captionPosition === "above" ? "calc(100% + var(--story-caption-gap, 32px))" : "auto",
                  }}
                dangerouslySetInnerHTML={{ __html: cleanWpHtml(milestone.caption) }}
                />
              </div>
            );
          })}

          <div className="about-story-2025-copy">{closingText}</div>
        </div>

        <div className="about-story-controls">
          <StoryArrow direction="previous" disabled={step === 0} onClick={() => moveTrack(-1)} />
          <StoryArrow direction="next" disabled={step === (isMobile ? mobileStepCount : offsets.length - 1)} onClick={() => moveTrack(1)} />
        </div>
      </div>
    </section>
  );
};

export default AboutStory;