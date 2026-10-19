import * as React from "react";
import WorksCategoryReel from "./WorksCategoryReel";
import { useWorks, sameCategory } from "./WorksContext";

// Page-builder layout: "works_category_reel"
// Fields: heading (Text), categories (Repeater: name, reel_items [Repeater: name, type_label, shape, image, video])
// This section OWNS the category list; every other Works section follows its selection.
const WorksCategorySection = ({ heading, categories = [] }) => {
  const { selectedCategory, setSelectedCategory } = useWorks();
  const named = categories.filter((category) => category && category.name);
  const current = named.find((category) => sameCategory(category.name, selectedCategory)) || named[0];

  if (!current) return null;

  return (
    <WorksCategoryReel
      heading={heading}
      categories={named.map((category) => category.name)}
      items={current.reelItems || []}
      selectedCategory={current.name}
      onCategoryChange={setSelectedCategory}
    />
  );
};

export default WorksCategorySection;
