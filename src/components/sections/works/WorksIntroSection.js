import * as React from "react";
import WorksGoTo from "./WorksGoTo";
import { useWorksGroup } from "./WorksContext";

// Page-builder layout: "works_intro"
// Fields: heading_prefix (Text), groups (Repeater: category, text),
//         go_to_label (Text), links (Repeater: label, href)
// In a link label, {category} is replaced by the selected category.
const WorksIntroSection = ({ headingPrefix, groups = [], goToLabel, links = [] }) => {
  const { selectedCategory, group } = useWorksGroup(groups, "works_intro");

  if (!selectedCategory) return null;

  const resolvedLinks = links
    .filter((link) => link && link.label && link.href)
    .map((link) => ({
      label: link.label.replace(/\{category\}/gi, selectedCategory),
      href: link.href,
    }));

  return (
    <WorksGoTo
      selectedCategory={selectedCategory}
      headingLines={[headingPrefix, selectedCategory].filter(Boolean)}
      paragraph={group?.text}
      goToLabel={goToLabel}
      links={resolvedLinks}
    />
  );
};

export default WorksIntroSection;
