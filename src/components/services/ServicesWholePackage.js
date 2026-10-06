import * as React from "react";
import WorksGoTo from "../works/WorksGoTo";

const ServicesWholePackage = () => (
  <WorksGoTo
    sectionId="whole-package"
    headingLines={["We've got it covered:", "The Whole Package"]}
    links={[
      // TODO: temporary entry point, confirm final navigation
      { label: "Video Production", href: "/videography/" },
      // TODO: temporary entry point, confirm final navigation
      { label: "Photography", href: "/photography/" },
    ]}
    linkColorClass="text-white"
  />
);

export default ServicesWholePackage;
