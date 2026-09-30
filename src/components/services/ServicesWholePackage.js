import * as React from "react";
import WorksGoTo from "../works/WorksGoTo";

const ServicesWholePackage = () => (
  <WorksGoTo
    sectionId="whole-package"
    headingLines={["We've got it covered:", "The Whole Package"]}
    links={[
      { label: "Video Production", href: "#video-intro" },
      { label: "Photography", href: "#photography-intro" },
    ]}
    linkColorClass="text-white"
  />
);

export default ServicesWholePackage;
