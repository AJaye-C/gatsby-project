import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import BlogListing from "../components/blog/BlogListing";
import BlogSlider from "../components/blog/BlogSlider";

const BlogPage = ({ data }) => {
  const posts = data?.allWpPost?.nodes || [];

  return (
    <Layout>
      <main className="min-h-screen bg-brand-bg text-brand-slate">
        <Header />
        <BlogSlider posts={posts} />
        <BlogListing posts={posts} />
        <Footer />
      </main>
    </Layout>
  );
};

export default BlogPage;

export const query = graphql`
  query BlogPageQuery {
    allWpPost {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export const Head = () => (
  <>
    <title>Blog | Pocket Creatives</title>
    <meta name="description" content="TODO: Add Blog page meta description." />
  </>
);
