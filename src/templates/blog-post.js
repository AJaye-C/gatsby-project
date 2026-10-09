import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import BlogPostContent from "../components/blog/BlogPostContent";
import BlogLikeBar from "../components/blog/BlogLikeBar";
import BlogRelatedPosts from "../components/blog/BlogRelatedPosts";

const formatDate = (date) => {
  if (!date) return "";
  const dateOnly = typeof date === "string" ? date.slice(0, 10) : date;
  const parsedDate = new Date(`${dateOnly}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) return "";
  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const BlogPostTemplate = ({ data }) => {
  const post = data?.wpPost;
  if (!post) return null;

  const categories = post.categories?.nodes || [];
  const featuredImage = post.featuredImage?.node?.sourceUrl;
  const relatedPosts = (data?.allWpPost?.nodes || []).filter((candidate) =>
    candidate.id !== post.id &&
    (candidate.categories?.nodes || []).some(({ name }) => categories.some(({ name: categoryName }) => name === categoryName)),
  ).slice(0, 3);

  return (
    <Layout>
      <main className="min-h-screen bg-brand-bg text-brand-slate [--blog-sticky-top:120px]">
        <Header />
        <article>
          <header className="mx-auto max-w-[1440px] px-6 pb-9 pt-36 sm:px-10 lg:px-12">
            <Link to="/blog/" className="inline-flex items-center text-base font-medium tracking-[-0.8px] text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2">
              <span aria-hidden="true" className="mr-1 text-xl">‹</span> Go back to blogs
            </Link>
            <h1 className="mt-10 max-w-[1335px] text-[clamp(2.75rem,4.167vw,5rem)] font-bold leading-none tracking-[-0.05em] text-brand-slate">{post.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[20px] font-medium tracking-[-1px] text-brand-teal">
              <span>Pocket Creatives</span>
              {post.date && <><span aria-hidden="true">•</span><span>{formatDate(post.date)}</span></>}
              {categories.map(({ name }) => (
                <span key={name} className="rounded-[10px] bg-brand-accent-yellow px-8 py-2 text-black">{name}</span>
              ))}
            </div>
            {featuredImage && <img src={featuredImage} alt="" width="1440" height="503" loading="eager" className="mt-8 aspect-[1440/503] w-full object-cover" />}
          </header>
          <BlogPostContent content={post.content || ""} />
          <BlogLikeBar />
          <BlogRelatedPosts posts={relatedPosts} />
        </article>
        <Footer />
      </main>
    </Layout>
  );
};

export default BlogPostTemplate;

export const query = graphql`
  query BlogPostQuery($id: String!) {
    wpPost(id: { eq: $id }) {
      id
      title
      slug
      date
      content
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
    allWpPost {
      nodes {
        id
        title
        slug
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

export const Head = ({ data }) => {
  const post = data?.wpPost;
  return <><title>{post?.title || "Blog | Pocket Creatives"}</title><meta name="description" content="TODO: Add blog post meta description." /></>;
};
