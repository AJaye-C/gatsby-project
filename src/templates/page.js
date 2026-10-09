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
export const query = graphql`
  query PageBuilderPage($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      slug
      pageBuilder {
        sections {
          __typename

          ... on WpPageBuilderSectionsHeroLayout {
            intro
            video {
              node {
                mediaItemUrl
              }
            }
          }

          ... on WpPageBuilderSectionsClientLogosLayout {
            heading
            subheading
            paragraph
            logos {
              name
              logo {
                node {
                  mediaItemUrl
                  altText
                }
              }
            }
          }

          ... on WpPageBuilderSectionsVideoCtaLayout {
            heading
            paragraph
          }

          ... on WpPageBuilderSectionsVideoScrollerLayout {
            sectionLabel
            videos {
              categoryTitle
              video {
                node {
                  mediaItemUrl
                }
              }
            }
          }

          ... on WpPageBuilderSectionsQualityLayout {
            heading
            paragraph
            sideText
          }

          ... on WpPageBuilderSectionsPhotographyLayout {
            sectionLabel
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

          ... on WpPageBuilderSectionsBehindTheScenesLayout {
            heading
            reviewSummary
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

          ... on WpPageBuilderSectionsPricingCtaLayout {
            heading
            subheading
            paragraph
            viewPricingLabel
            viewPricingLink
            quoteButtonLabel
            quoteButtonLink
          }

          ... on WpPageBuilderSectionsPageHeroLayout {
            headingText
            headingLogo {
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
            paragraph
            chatButtonLabel
            chatButtonTooltip
            chatButtonLink
          }

          ... on WpPageBuilderSectionsStudioIntroLayout {
            heading
            body
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

          ... on WpPageBuilderSectionsWorksCarouselLayout {
            heading
            cards {
              label
              title
              body
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
            rows {
              heading
              paragraph
              image {
                node {
                  mediaItemUrl
                  altText
                }
              }
            }
          }

          ... on WpPageBuilderSectionsWhyUsLayout {
            heading
            intro
            reasons {
              title
              body
            }
          }

          ... on WpPageBuilderSectionsVideoStatementLayout {
            text
            video {
              node {
                mediaItemUrl
              }
            }
          }

          ... on WpPageBuilderSectionsWorkWithLayout {
            heading
            intro
            highlightPrefix
            highlightedNames
            highlightSuffix
            logos {
              name
              logo {
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

          ... on WpPageBuilderSectionsStoryTimelineLayout {
            heading
            intro
            startYear
            endYear
            events {
              caption
            }
            closingText
          }
        }
      }
    }
  }
`;
