import * as React from "react";

const WorksLightboxClose = ({ onClick, buttonRef }) => (
  <button
    ref={buttonRef}
    type="button"
    aria-label="Close lightbox"
    onClick={onClick}
    className="works-lightbox-close"
  >
    <span aria-hidden="true" />
    <span aria-hidden="true" />
  </button>
);

export default WorksLightboxClose;
