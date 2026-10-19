import * as React from "react";
import {
  HeroVideo,
  ClientLogos,
  ArrowBanner,
  VideoCarousel,
  PhotographyIntro,
  PhotoCategories,
  ServicesChecklist,
  Team,
  VideoReviews,
  CtaBanner,
  PageHero,
  IntroBanner,
  WorkShowcase,
  ImageTextRows,
  TextSlider,
  TextVideo,
  ClientLogosHighlight,
  Timeline,
  LinkPanel,
  ProcessRows,
  ProcessSlider,
  // new imports
  SplitVideoIntro,
  ChecklistVideo,
  BadgeCards,
  StaggeredText,
  ContactForm,
  TogglePanels,
  // contact layouts
  ContactDetails,
  MapEmbed,
  ImageTextBand,
  // how we work layouts
  IntroCards,
  AccordionStage,
  StageImageRows,
  // blog layouts
  BlogSlider,
  BlogListing,
  // training layouts
  CourseCards,
  VideoSlider,
  TestimonialRotator,
  // photography / videography layouts
  MediaHero,
  IntroSplit,
  ImageGridDuo,
  AlternatingRows,
  VideoPortfolio,
  // Testimonial layouts
  TestimonialsIntro,
  TestimonialsCarousel,
  TestimonialsDetails,
} from "../sections";
import {
  WorksCategorySection,
  WorksIntroSection,
  WorksVideographySection,
  WorksPhotographySection,
  WorksProvider,
} from "../sections/works";

// REGISTRY: ACF layout name -> React component.
// To add a new section: create the layout in ACF, create the component in src/components/sections/,
// add one line here, and add its fields to the query in src/templates/page.js.
//
// The key is the PascalCase of the ACF layout name (= middle of the GraphQL type name):
//   layout `hero_video` -> PageBuilderSectionsHeroVideoLayout -> "HeroVideo"
// Components take the layout's fields (camelCase) as props, exactly as queried in page.js.
export const sectionMap = {
  // ---- Home layouts ----
  HeroVideo,
  ClientLogos,
  ArrowBanner,
  VideoCarousel,
  PhotographyIntro,
  PhotoCategories,
  ServicesChecklist,
  Team,
  VideoReviews,
  CtaBanner,

  // ---- General layouts ----
  PageHero,
  IntroBanner,
  WorkShowcase,
  ImageTextRows,
  TextSlider,
  TextVideo,
  ClientLogosHighlight,
  Timeline,

  // ---- Services layouts (reusable on any page) ----
  LinkPanel,
  ProcessRows,
  ProcessSlider,

  // ---- Works page (these four share the selected category through WorksProvider) ----
  WorksCategoryReel: WorksCategorySection,
  WorksIntro: WorksIntroSection,
  WorksVideography: WorksVideographySection,
  WorksPhotography: WorksPhotographySection,

  // ---- Pricing / new layouts ----
  SplitVideoIntro,
  ChecklistVideo,
  BadgeCards,
  StaggeredText,
  ContactForm,
  TogglePanels,

  // ---- Contact layouts (reusable on any page) ----
  ContactDetails,
  MapEmbed,
  ImageTextBand,

  // ---- How we work layouts (reusable on any page) ----
  IntroCards,
  AccordionStage,
  StageImageRows,

  // ---- Blog layouts (posts come from WordPress posts, not from the section) ----
  BlogSlider,
  BlogListing,

  // ---- Training layouts (reusable on any page) ----
  CourseCards,
  VideoSlider,
  TestimonialRotator,

  // ---- Photography / Videography layouts (reusable on any page) ----
  MediaHero,
  IntroSplit,
  ImageGridDuo,
  AlternatingRows,
  VideoPortfolio,

  // ---- Testimonial layouts (reusable on any page) ----
  TestimonialsIntro,
  TestimonialsCarousel,
  TestimonialsDetails,
};

// Anchor ids the old home page wrapped these sections in (used by nav / in-page links).
const sectionAnchors = {
  VideoCarousel: "videography",
  PhotoCategories: "photography",
};

// GraphQL sends null for an empty field (e.g. an empty repeater). A null skips default props
// (`items = []` only applies to undefined), so `items.length` would crash. Drop the nulls so
// every component's defaults apply.
const withoutNulls = (props) =>
  Object.fromEntries(Object.entries(props).filter(([, value]) => value !== null));

// Gatsby prefixes WordPress types with "Wp", so accept both spellings.
const layoutKey = (typename = "") => {
  const match = typename.match(/^(?:Wp)?PageBuilderSections_?(.+?)_?Layout$/);
  return match ? match[1] : "";
};

// The Works sections follow one selected category. The picker section ("WorksCategoryReel")
// owns the category list; the first category is selected by default.
const worksSetup = (sections) => {
  const picker = sections.find((section) => section && layoutKey(section.__typename) === "WorksCategoryReel");
  const categories = (picker?.categories || []).map((category) => category?.name).filter(Boolean);
  return { categories, defaultCategory: categories[0] || "" };
};

const SectionRenderer = ({ sections = [] }) => (
  <WorksProvider {...worksSetup(sections)}>
    {sections.map((section, index) => {
      if (!section) return null;

      const { __typename, ...rest } = section;
      const props = withoutNulls(rest);
      const key = layoutKey(__typename);
      const Component = sectionMap[key];

      if (!Component) {
        // Unknown / not-yet-built layout: skip it instead of breaking the page.
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.warn(`[SectionRenderer] No component registered for layout "${__typename}"`);
        }
        return null;
      }

      const anchor = sectionAnchors[key];

      return anchor ? (
        <div id={anchor} key={`${key}-${index}`}>
          <Component {...props} />
        </div>
      ) : (
        <Component key={`${key}-${index}`} {...props} />
      );
    })}
  </WorksProvider>
);

export default SectionRenderer;