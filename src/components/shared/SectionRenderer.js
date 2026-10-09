import * as React from "react";
import {
  Hero,
  ClientLogosSection,
  VideoCTABanner,
  VideoScroller,
  QualitySection,
  PhotographySection,
  ServicesChecklist,
  TeamSection,
  BehindTheScenes,
  PricingCTA,
} from "../home";
import {
  AboutHero,
  AboutStudio,
  OurWorks,
  AboutCompanyTypes,
  WhyUs,
  PocketPerson,
  WorkWith,
  AboutStory,
} from "../about";

// REGISTRY: ACF layout name -> React component.
// To add a new section: create the layout in ACF, create the component,
// add one line here, and add its fields to the query in src/templates/page.js.
//
// The key is the middle part of the GraphQL type name:
//   PageBuilderSections<Key>Layout   e.g. PageBuilderSectionsHeroLayout -> "Hero"
export const sectionMap = {
  Hero,
  ClientLogos: ClientLogosSection,
  VideoCta: VideoCTABanner,
  VideoScroller,
  Quality: QualitySection,
  Photography: PhotographySection,
  ServicesChecklist,
  Team: TeamSection,
  BehindTheScenes,
  PricingCta: PricingCTA,

  // About page
  PageHero: AboutHero,
  StudioIntro: AboutStudio,
  WorksCarousel: OurWorks,
  ImageTextRows: AboutCompanyTypes,
  WhyUs,
  VideoStatement: PocketPerson,
  WorkWith,
  StoryTimeline: AboutStory,
};

// Anchor ids the old home page wrapped these sections in (used by nav / in-page links).
const sectionAnchors = {
  VideoScroller: "videography",
  Photography: "photography",
};

// Gatsby prefixes WordPress types with "Wp", so accept both spellings.
const layoutKey = (typename = "") => {
  const match = typename.match(/^(?:Wp)?PageBuilderSections_?(.+?)_?Layout$/);
  return match ? match[1] : "";
};

const SectionRenderer = ({ sections = [] }) => (
  <>
    {sections.map((section, index) => {
      if (!section) return null;

      const { __typename, ...props } = section;
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

      const element = <Component key={`${key}-${index}`} {...props} />;
      const anchor = sectionAnchors[key];

      return anchor ? (
        <div id={anchor} key={`${key}-${index}`}>
          <Component {...props} />
        </div>
      ) : (
        element
      );
    })}
  </>
);

export default SectionRenderer;
