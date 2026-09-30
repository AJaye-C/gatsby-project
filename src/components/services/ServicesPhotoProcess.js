import * as React from "react";
import ServicesProcessSection from "./ServicesProcessSection";

const processRows = [
  {
    title: "Pre-production",
    subtitle: "Meeting & Planning",
    image: "/figma/images/pho-pre.png",
    alt: "Photography pre-production meeting and planning",
    imageSide: "right",
  },
  {
    title: "Production",
    subtitle: "Lights, Camera, Action",
    image: "/figma/images/pho-prod.png",
    alt: "Photography production on set",
    imageSide: "left",
  },
  {
    title: "Post-production",
    subtitle: "Review & Edit",
    image: "/figma/images/pho-post.png",
    alt: "Photography post-production review and edit",
    imageSide: "right",
  },
];

const ServicesPhotoProcess = () => (
  <ServicesProcessSection
    id="photography-process"
    headingColors={{ first: "text-brand-accent-yellow", second: "text-brand-teal" }}
    rows={processRows}
  />
);

export default ServicesPhotoProcess;