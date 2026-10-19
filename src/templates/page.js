import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import SectionRenderer from "../components/shared/SectionRenderer";
import { Header, Footer } from "../components/home";

// One template for every WordPress page that has page-builder sections.
const PageTemplate = ({ data }) => {
  const sections = data.wpPage?.pageBuilder?.sections || [];

  return (
    <Layout>
      <main className="min-h-screen bg-brand-bg text-brand-slate">
        <Header />
        <SectionRenderer sections={sections} />
        <Footer />
      </main>
    </Layout>
  );
};

export default PageTemplate;

export const Head = ({ data }) => {
  const page = data.wpPage;
  const title = !page || page.slug === "home" ? "Pocket Creatives" : `${page.title} | Pocket Creatives`;
  return <title>{title}</title>;
};

// Every layout's fields are listed here. Names are the camelCase of the ACF field names.
// Media fields (Image / File) come back as { node { mediaItemUrl altText } }.
// Layout fragments: ... on WpPageBuilderSections<PascalCaseLayoutName>Layout
export const query = graphql`
  query PageBuilderPage($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      slug
      pageBuilder {
        sections {
          __typename

          ... on WpPageBuilderSectionsHeroVideoLayout {
            heading
            video {
              node {
                mediaItemUrl
              }
            }
          }

          ... on WpPageBuilderSectionsClientLogosLayout {
            heading
            subheading
            text
            logos {
              name
              image {
                node {
                  mediaItemUrl
                  altText
                }
              }
            }
          }

          ... on WpPageBuilderSectionsArrowBannerLayout {
            variant
            heading
            text
          }

          ... on WpPageBuilderSectionsVideoCarouselLayout {
            label
            videos {
              title: categoryTitle
              video {
                node {
                  mediaItemUrl
                }
              }
            }
          }

          ... on WpPageBuilderSectionsPhotographyIntroLayout {
            heading
            text
            aside
          }

          ... on WpPageBuilderSectionsPhotoCategoriesLayout {
            label
            categories {
              title
              image {
                node {
                  mediaItemUrl
                  altText
                }
              }
            }
          }

          ... on WpPageBuilderSectionsServicesChecklistLayout {
            lines {
              text
            }
            columns {
              title
              text
            }
          }

          ... on WpPageBuilderSectionsTeamLayout {
            heading
            members {
              firstName
              lastName
              roles
              bio
              linkedinUrl
              photo {
                node {
                  mediaItemUrl
                  altText
                }
              }
            }
          }

          ... on WpPageBuilderSectionsVideoReviewsLayout {
            heading
            ratingSummary
            video {
              node {
                mediaItemUrl
              }
            }
            reviews {
              quote
              author
            }
          }

          ... on WpPageBuilderSectionsCtaBannerLayout {
            heading
            subheading
            text
            primaryButtonLabel
            primaryButtonLink
            secondaryButtonLabel: secondaryPricingLabel
            secondaryButtonLink: secondaryPricingLink
          }

          ... on WpPageBuilderSectionsPageHeroLayout {
            heading
            headingImage {
              node {
                mediaItemUrl
                altText
              }
            }
            video {
              node {
                mediaItemUrl
              }
            }
            text
            primaryButtonLabel
            primaryButtonTooltip
            primaryButtonLink
            secondaryButtonLabel
            secondaryButtonLink
          }

          ... on WpPageBuilderSectionsIntroBannerLayout {
            heading
            text
            buttonLabel
            buttonLink
            image {
              node {
                mediaItemUrl
                altText
              }
            }
            badge {
              node {
                mediaItemUrl
                altText
              }
            }
          }

          ... on WpPageBuilderSectionsWorkShowcaseLayout {
            heading
            items {
              label
              title
              text
              image {
                node {
                  mediaItemUrl
                  altText
                }
              }
              video {
                node {
                  mediaItemUrl
                }
              }
            }
          }

          ... on WpPageBuilderSectionsImageTextRowsLayout {
            items: rows {
              heading
              text
              image {
                node {
                  mediaItemUrl
                  altText
                }
              }
            }
          }

          ... on WpPageBuilderSectionsTextSliderLayout {
            heading
            text
            items: slides {
              title: items
              text
            }
          }

          ... on WpPageBuilderSectionsTextVideoLayout {
            text
            video {
              node {
                mediaItemUrl
              }
            }
          }

          ... on WpPageBuilderSectionsClientLogosHighlightLayout {
            heading
            text
            highlightPrefix
            highlightedNames
            highlightSuffix
            logos {
              name
              image {
                node {
                  mediaItemUrl
                  altText
                }
              }
            }
            badgeText
            badgeLinkLabel
            badgeLink
            mobileButtonLabel
          }

          ... on WpPageBuilderSectionsTimelineLayout {
            heading
            text
            startYear
            endYear
            events {
              text
            }
            closingText
          }

          ... on WpPageBuilderSectionsLinkPanelLayout {
            anchorId
            heading
            text
            panelColor
            goToLabel
            links: panelLinks {
              label
              href
            }
          }

          ... on WpPageBuilderSectionsProcessRowsLayout {
            anchorId
            heading
            steps: processSteps {
              title
              subtitle
              text
              image {
                node {
                  mediaItemUrl
                  altText
                }
              }
            }
          }

          ... on WpPageBuilderSectionsProcessSliderLayout {
            slides: processSlides {
              title
              bullets
              text
              image {
                node {
                  mediaItemUrl
                  altText
                }
              }
            }
            contactLabel
            contactLink
          }

          ... on WpPageBuilderSectionsWorksCategoryReelLayout {
            heading
            categories: reelCategories {
              name
              reelItems {
                name
                typeLabel
                shape
                image {
                  node {
                    mediaItemUrl
                    altText
                  }
                }
                video {
                  node {
                    mediaItemUrl
                  }
                }
              }
            }
          }

          ... on WpPageBuilderSectionsWorksIntroLayout {
            headingPrefix
            goToLabel
            groups: introGroups {
              category
              text: paragraph
            }
            links {
              label
              href
            }
          }

          ... on WpPageBuilderSectionsWorksVideographyLayout {
            titleSuffix
            groups: videoGroups {
              category
              videos: clips {
                label
                video {
                  node {
                    mediaItemUrl
                  }
                }
              }
            }
          }

          ... on WpPageBuilderSectionsWorksPhotographyLayout {
            sectionHeading
            titleSuffix
            groups: photoGroups {
              category
              albums {
                label
                photos {
                  nodes {
                    mediaItemUrl
                    altText
                  }
                }
              }
            }
          }

          # ---------- New fragments for Pricing / page components ----------
          ... on WpPageBuilderSectionsSplitVideoIntroLayout {
            variant
            eyebrow
            heading
            text
            video {
              node {
                mediaItemUrl
              }
            }
          }

          ... on WpPageBuilderSectionsChecklistVideoLayout {
            heading
            checkItems {
              text
            }
            video {
              node {
                mediaItemUrl
              }
            }
          }

          ... on WpPageBuilderSectionsBadgeCardsLayout {
            cardItems {
              title
              text
              badge {
                node {
                  mediaItemUrl
                  altText
                }
              }
            }
          }

          ... on WpPageBuilderSectionsStaggeredTextLayout {
            staggerBlocks {
              heading
              text
            }
          }

          ... on WpPageBuilderSectionsContactFormLayout {
            heading
            text
            variant
            formHeading
            stageNumber
          }

          ... on WpPageBuilderSectionsTogglePanelsLayout {
            togglePanelItems {
              buttonLabel
              heading
              image {
                node {
                  mediaItemUrl
                  altText
                }
              }
              panelColor
              panelParagraphs {
                text
              }
            }
          }

          # ---------- Contact layouts ----------
          ... on WpPageBuilderSectionsContactDetailsLayout {
            detailItems {
              icon
              text
              link
            }
          }

          ... on WpPageBuilderSectionsMapEmbedLayout {
            embedUrl
            title
          }

          ... on WpPageBuilderSectionsImageTextBandLayout {
            bandItems {
              heading
              text
              chipLabel
              chipLink
              image {
                node {
                  mediaItemUrl
                  altText
                }
              }
              badge {
                node {
                  mediaItemUrl
                  altText
                }
              }
              badgeHover {
                node {
                  mediaItemUrl
                  altText
                }
              }
              badgeLink
            }
          }

          # ---------- How we work layouts ----------
          ... on WpPageBuilderSectionsIntroCardsLayout {
            heading
            text
            buttonLabel
            buttonLink
            introCardItems {
              heading
              text
              icon {
                node {
                  mediaItemUrl
                  altText
                }
              }
            }
          }

          ... on WpPageBuilderSectionsAccordionStageLayout {
            stageNumber
            accordionItems {
              title
              text
            }
          }

          ... on WpPageBuilderSectionsStageImageRowsLayout {
            stageNumber
            stageRows {
              heading
              text
              image {
                node {
                  mediaItemUrl
                  altText
                }
              }
            }
          }

          # ---------- Blog layouts (posts are read inside the components) ----------
          ... on WpPageBuilderSectionsBlogSliderLayout {
            maxSlides
          }

          ... on WpPageBuilderSectionsBlogListingLayout {
            heading
            postsPerPage
            defaultCategory
          }

          # ---------- Training layouts ----------
          ... on WpPageBuilderSectionsCourseCardsLayout {
            heading
            courseItems {
              title
              bullets
            }
            linkLabel
            linkHref
          }

          ... on WpPageBuilderSectionsVideoSliderLayout {
            heading
            text
            videoItems {
              label
              video {
                node {
                  mediaItemUrl
                }
              }
            }
          }

          ... on WpPageBuilderSectionsTestimonialRotatorLayout {
            badgeLabel
            testimonialItems {
              image {
                node {
                  mediaItemUrl
                  altText
                }
              }
              quote
              author
            }
          }

          # ---------- Photography / Videography layouts ----------
          ... on WpPageBuilderSectionsMediaHeroLayout {
            variant
            heading
            subtitlePrefix
            subtitleBrand
            video: heroVideo {
              node {
                mediaItemUrl
              }
            }
            leadText
            leadHighlight
            leadSubtext
            sideText
            buttonLabel
            buttonLink
          }

          ... on WpPageBuilderSectionsIntroSplitLayout {
            heading
            text
            image {
              node {
                mediaItemUrl
                altText
              }
            }
          }

          ... on WpPageBuilderSectionsImageGridDuoLayout {
            leftBanner: leftBannerYellow
            leftText
            leftImages {
              nodes {
                mediaItemUrl
                altText
              }
            }
            rightBanner: rightBannerTeal
            rightText
            rightImages {
              nodes {
                mediaItemUrl
                altText
              }
            }
          }

          ... on WpPageBuilderSectionsAlternatingRowsLayout {
            variant
            rowItems {
              heading
              rowLayout
              content
              image {
                node {
                  mediaItemUrl
                  altText
                }
              }
            }
          }

          ... on WpPageBuilderSectionsVideoPortfolioLayout {
            heading
            portfolioCategories {
              label: tabLabel
              portfolioVideos {
                clientName
                title
                description
                video {
                  node {
                    mediaItemUrl
                  }
                }
              }
            }
          }

          ... on WpPageBuilderSectionsTestimonialsIntroLayout {
            heading
            text
            introLayout
          }

          ... on WpPageBuilderSectionsTestimonialsCarouselLayout {
            carouselSlides {
              quote
              author
              logo {
                node {
                  mediaItemUrl
                  altText
                }
              }
            }
          }

          ... on WpPageBuilderSectionsTestimonialsDetailsLayout {
            heading
            image {
              node {
                mediaItemUrl
                altText
              }
            }
            detailColumns {
              heading
              text
            }
          }
        }
      }
    }
  }
`;