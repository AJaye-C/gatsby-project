import * as React from "react";
import WorksGoTo from "../works/WorksGoTo";

const placeholderCopy = "Lorem ipsum dolor sit amet consectetur. Nulla purus rhoncus at mattis. Et ac vitae ornare volutpat. Mollis sem scelerisque dictum nunc iaculis vivamus donec. Molestie sed mattis aenean sit arcu ipsum amet vulputate tellus. Blandit pellentesque magna egestas eget rhoncus tincidunt. In ultrices velit et velit morbi vitae dolor fames. Rhoncus.";

const ServicesPhotoIntro = () => (
  <WorksGoTo
    sectionId="photography-intro"
    panelClassName="bg-brand-teal"
    headingLines={["Pixel perfection:", "Photography."]}
    paragraph={placeholderCopy}
    links={[
      { label: "Video Production", href: "#video-intro" },
      { label: "The Rest", href: "#whole-package" },
    ]}
    linkColorClass="text-white"
  />
);

export default ServicesPhotoIntro;