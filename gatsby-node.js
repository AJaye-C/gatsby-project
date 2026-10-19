const path = require("path");

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  // 1. Blog posts: one page per WordPress post at /blog/{slug}/
  const blogTemplate = path.resolve("./src/templates/blog-post.js");

  const postsResult = await graphql(`
    {
      allWpPost {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (postsResult.errors) {
    reporter.panicOnBuild("Blog: could not query WordPress posts", postsResult.errors);
    return;
  }

  postsResult.data.allWpPost.nodes.forEach(({ id, slug }) => {
    if (!slug) return;
    createPage({
      path: `/blog/${slug}/`,
      component: blogTemplate,
      context: { id, slug },
    });
  });

  reporter.info(`Blog: ${postsResult.data.allWpPost.nodes.length} posts`);

  // 2. Page-builder pages: one page for every WordPress Page with >= 1 section.
  //    Slug "home" becomes "/", every other slug becomes "/{slug}/".
  //    Pages without sections are skipped, so hand-built pages in src/pages keep working.
  const pageTemplate = path.resolve("./src/templates/page.js");

  const result = await graphql(`
    {
      allWpPage {
        nodes {
          id
          slug
          pageBuilder {
            sections {
              __typename
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Page builder: could not query WordPress pages", result.errors);
    return;
  }

  result.data.allWpPage.nodes.forEach((page) => {
    const sections = page.pageBuilder?.sections || [];
    if (!page.slug || sections.length === 0) return;

    const pagePath = page.slug === "home" ? "/" : `/${page.slug}/`;

    createPage({
      path: pagePath,
      component: pageTemplate,
      context: { id: page.id },
    });

    reporter.info(`Page builder: ${pagePath} (${sections.length} sections)`);
  });
};
