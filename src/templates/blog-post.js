import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import BlogPostHeader from "../components/sections/blogs/BlogPostHeader";
import BlogPostContent from "../components/sections/blogs/BlogPostContent";
import BlogLikeBar from "../components/sections/blogs/BlogLikeBar";
import BlogRelatedPosts from "../components/sections/blogs/BlogRelatedPosts";
import { decodeEntities, getRelatedPosts, normalizePost, processPostContent } from "../utils/blog";

const BlogPostTemplate = ({ data, location }) => {
  const node = data.wpPost;
  if (!node) return null;
  const post = normalizePost(node);
  const { html, headings } = processPostContent(node.content || "");
  const related = getRelatedPosts(data.allWpPost.nodes.map(normalizePost), post.slug);
  return (
    <Layout>
      <main className="min-h-screen bg-brand-bg text-brand-slate [--blog-sticky-top:120px]">
        <Header />
        <article>
          <BlogPostHeader post={post} location={location} />
          <BlogPostContent html={html} headings={headings} />
          <BlogLikeBar />
          <BlogRelatedPosts posts={related} />
        </article>
        <Footer />
      </main>
    </Layout>
  );
};

export default BlogPostTemplate;

export const Head = ({ data }) => (
  <title>{data.wpPost ? decodeEntities(data.wpPost.title) : "Blog | Pocket Creatives"}</title>
);

export const query = graphql`
  query BlogPostPage($id: String!) {
    wpPost(id: { eq: $id }) {
      id
      slug
      title
      date
      content
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
    allWpPost {
      nodes {
        id
        slug
        title
        date
        isSticky
        categories {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`;
