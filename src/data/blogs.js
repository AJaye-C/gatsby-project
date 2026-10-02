import blogPosts from "./blogRecords.cjs";
export { blogPosts };

export const blogCategories = [
  { key: "beauty", label: "Beauty" },
  { key: "company", label: "Company" },
  { key: "crowdfunding", label: "Crowdfunding" },
  { key: "events", label: "Events" },
  { key: "fashion", label: "Fashion" },
  { key: "food", label: "Food" },
  { key: "food-drink", label: "Food & Drink" },
  { key: "jewellery", label: "Jewellery" },
  { key: "people", label: "People" },
  { key: "photography", label: "Photography" },
  { key: "portraits", label: "Portraits", filterLabel: "Portaits" }, // TODO: Remove filterLabel when the Figma typo is corrected.
  { key: "products", label: "Products" },
  { key: "video", label: "Video" },
  { key: "watches", label: "Watches", showInFilter: false },
];
