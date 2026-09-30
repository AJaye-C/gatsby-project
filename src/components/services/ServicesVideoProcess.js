import * as React from "react";
import ServicesProcessSection from "./ServicesProcessSection";

const processRows = [
  {
    title: "Pre-production",
    subtitle: "Meeting & Planning",
    image: "/figma/images/vid-pre.png",
    alt: "Pre-production meeting and planning",
    imageSide: "right",
  },
  {
    title: "Production",
    subtitle: "Lights, Camera, Action",
    image: "/figma/images/vid-prod.png",
    alt: "Video production on set",
    imageSide: "left",
  },
  {
    title: "Post-production",
    subtitle: "Review & Edit",
    image: "/figma/images/vid-post.png",
    alt: "Post-production video editing",
    imageSide: "right",
  },
];

const ServicesVideoProcess = () => (
  <ServicesProcessSection
    id="video-process"
    headingColors={{ first: "text-brand-teal", second: "text-brand-accent-yellow" }}
    rows={processRows}
  />
);

export default ServicesVideoProcess;