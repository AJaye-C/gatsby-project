import * as React from "react";
import WorksGoTo from "../works/WorksGoTo";

const placeholderCopy = "Lorem ipsum dolor sit amet consectetur. Nulla purus rhoncus at mattis. Et ac vitae ornare volutpat. Mollis sem scelerisque dictum nunc iaculis vivamus donec. Molestie sed mattis aenean sit arcu ipsum amet vulputate tellus. Blandit pellentesque magna egestas eget rhoncus tincidunt. In ultrices velit et velit morbi vitae dolor fames. Rhoncus.";

const ServicesVideoIntro = () => (
  <WorksGoTo
    sectionId="video-intro"
    headingLines={["Aaaand Action:", "Video Production"]}
    paragraph={placeholderCopy}
    links={[
      { label: "Videography", href: "#video-process" },
      { label: "Photography", href: "#photography-intro" },
    ]}
    linkColorClass="text-white"
  />
);

export default ServicesVideoIntro;