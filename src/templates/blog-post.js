import * as React from "react";
import Layout from "../components/Layout";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import BlogPostHeader from "../components/blog/BlogPostHeader";
import BlogPostContent from "../components/blog/BlogPostContent";
import BlogLikeBar from "../components/blog/BlogLikeBar";
import BlogRelatedPosts from "../components/blog/BlogRelatedPosts";
import { getPostBody, getPostBySlug, getPostHeadings, getRelatedPosts } from "../utils/blog";

const BlogPostTemplate = ({ pageContext, location }) => {
  const post = getPostBySlug(pageContext.slug);
  if (!post) return null;
  const body = getPostBody(post.slug);
  const headings = getPostHeadings(post.slug);
  return (
    <Layout>
      <main className="min-h-screen bg-brand-bg text-brand-slate [--blog-sticky-top:120px]">
        <Header />
        <article>
          <BlogPostHeader post={post} location={location} />
          <BlogPostContent body={body} headings={headings} />
          <BlogLikeBar />
          <BlogRelatedPosts posts={getRelatedPosts(post.slug)} />
        </article>
        <Footer />
      </main>
    </Layout>
  );
};

export default BlogPostTemplate;

export const Head = ({ pageContext }) => {
  const post = getPostBySlug(pageContext.slug);
  return <><title>{post?.title || "Blog | Pocket Creatives"}</title><meta name="description" content="TODO: Add blog post meta description." /></>;
};
