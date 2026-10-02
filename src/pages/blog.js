import * as React from "react";
import Layout from "../components/Layout";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import BlogSlider from "../components/blog/BlogSlider";
import BlogListing from "../components/blog/BlogListing";

const BlogPage = () => (
  <Layout>
    <main className="min-h-screen bg-brand-bg text-brand-slate">
      <Header />
      <BlogSlider />
      <BlogListing />
      <Footer />
    </main>
  </Layout>
);

export default BlogPage;

export const Head = () => (
  <>
    <title>Blog | Pocket Creatives</title>
    <meta name="description" content="TODO: Add Blog page meta description." />
  </>
);
