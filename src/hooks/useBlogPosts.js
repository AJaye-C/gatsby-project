import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { normalizePost } from "../utils/blog";

// All WordPress posts (light fields, no `content`), normalized for the blog components.
// Used by the BlogSlider and BlogListing layouts, so page.js's query stays small.
const useBlogPosts = () => {
  const data = useStaticQuery(graphql`
    query BlogPostsForSections {
      allWpPost {
        nodes {
          id
          slug
          title
          date
          isSticky
          author {
            node {
              name
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              mediaItemUrl
              altText
            }
          }
        }
      }
    }
  `);
  return React.useMemo(() => data.allWpPost.nodes.map(normalizePost), [data]);
};

export default useBlogPosts;
