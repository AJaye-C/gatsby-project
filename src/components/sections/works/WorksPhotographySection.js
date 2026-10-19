import * as React from "react";
import WorksPhotography from "./WorksPhotography";
import { useWorksGroup } from "./WorksContext";

// Page-builder layout: "works_photography"
// Fields: section_heading (Text), title_suffix (Text),
//         groups (Repeater: category, albums [Repeater: label, photos (Gallery)])
// Hidden when the selected category has no albums.
const WorksPhotographySection = ({ sectionHeading, titleSuffix, groups = [] }) => {
  const { selectedCategory, group } = useWorksGroup(groups, "works_photography");

  const albums = React.useMemo(
    () =>
      (group?.albums || [])
        .map((album, index) => ({
          id: `album-${index + 1}`,
          label: album.label,
          photos: (album.photos?.nodes || []).map((photo) => photo.mediaItemUrl).filter(Boolean),
        }))
        .filter((album) => album.photos.length),
    [group]
  );

  if (!albums.length) return null;

  return (
    <WorksPhotography
      selectedCategory={selectedCategory}
      sectionHeading={sectionHeading}
      titleSuffix={titleSuffix}
      albums={albums}
    />
  );
};

export default WorksPhotographySection;
