import * as React from "react";
import WorksVideography from "./WorksVideography";
import { useWorksGroup } from "./WorksContext";
import { mediaUrl } from "../../../utils/acf";

// Page-builder layout: "works_videography"
// Fields: title_suffix (Text), groups (Repeater: category, videos [Repeater: label, video])
// Hidden when the selected category has no videos.
const WorksVideographySection = ({ titleSuffix, groups = [] }) => {
  const { selectedCategory, group } = useWorksGroup(groups, "works_videography");

  const items = React.useMemo(
    () =>
      (group?.videos || [])
        .map((item) => ({ label: item.label, src: mediaUrl(item.video) }))
        .filter((item) => item.src)
        // #t=0.001 makes the browser show the first frame as a thumbnail
        .map((item) => ({ ...item, src: `${item.src}#t=0.001` })),
    [group]
  );

  if (!items.length) return null;

  return <WorksVideography selectedCategory={selectedCategory} titleSuffix={titleSuffix} items={items} />;
};

export default WorksVideographySection;
