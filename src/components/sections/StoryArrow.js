import * as React from "react";

// Shared round arrow button (moved out of the legacy about/AboutStory.js so pages don't import from each other).
// `variant="inverted"` is the light-on-dark version used by the process slider.
const StoryArrow = ({ direction, disabled, onClick, variant = "default" }) => (
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

export default StoryArrow;
