import * as React from "react";
import { slugify } from "../../../utils/acf";

// The Works page is made of independent page-builder sections (category picker, intro,
// videography, photography) that all depend on ONE selected category. They share it here.
// <WorksProvider> is mounted by SectionRenderer around every page's sections; pages without
// Works sections simply never read it.
//
// Rows in the other sections are matched to the picker's categories by slug, so
// "TV Ads", "tv ads" and "TV  Ads " all match.

const WorksContext = React.createContext({
  selectedCategory: "",
  setSelectedCategory: () => {},
  categories: [],
});

export const sameCategory = (a = "", b = "") => slugify(a) !== "" && slugify(a) === slugify(b);

export const WorksProvider = ({ categories = [], defaultCategory = "", children }) => {
  const [selected, setSelected] = React.useState("");
  const value = React.useMemo(
    () => ({
      // Until someone clicks, use the first category of the picker (also what the server renders)
      selectedCategory: selected || defaultCategory,
      setSelectedCategory: setSelected,
      categories,
    }),
    [selected, defaultCategory, categories]
  );

  return <WorksContext.Provider value={value}>{children}</WorksContext.Provider>;
};

export const useWorks = () => React.useContext(WorksContext);

// Returns the row of `groups` ({ category, ... }) that belongs to the selected category.
export const useWorksGroup = (groups = [], layoutName = "Works section") => {
  const { selectedCategory, categories } = useWorks();

  // Dev-only: tell the editor/developer when a row names a category the picker doesn't have
  React.useEffect(() => {
    if (process.env.NODE_ENV === "production" || !categories.length) return;
    groups.forEach((group) => {
      if (group?.category && !categories.some((name) => sameCategory(name, group.category))) {
        // eslint-disable-next-line no-console
        console.warn(`[${layoutName}] category "${group.category}" doesn't match any category in the picker (${categories.join(", ")})`);
      }
    });
  }, [groups, categories, layoutName]);

  const group = groups.find((item) => item && sameCategory(item.category, selectedCategory));
  return { selectedCategory, group };
};
