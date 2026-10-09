const path = require("path");

exports.createPages = async ({ actions, graphql, reporter }) => {
  // ---- Blog posts (unchanged) ----
  const { data, errors } = await graphql(`
    query CreateBlogPages {
      allWpPost {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (errors) {
    throw new Error(errors.map((error) => error.message).join("\n"));
  }

  data.allWpPost.nodes.forEach(({ id, slug }) => {
    actions.createPage({
      path: `/blog/${slug}/`,
      component: path.resolve("./src/templates/blog-post.js"),
      context: { id },
    });
  });

  // ---- Page-builder pages ----
  // Every WordPress Page that has at least one section gets built with the page template.
  // Pages with no sections are skipped, so hand-built pages in src/pages keep working.
  const pagesResult = await graphql(`
    query CreateBuilderPages {
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

  if (pagesResult.errors) {
    throw new Error(pagesResult.errors.map((error) => error.message).join("\n"));
  }

  pagesResult.data.allWpPage.nodes.forEach(({ id, slug, pageBuilder }) => {
    if (!pageBuilder?.sections?.length) return;

    // WordPress page "home" is the site root
    const pagePath = slug === "home" ? "/" : `/${slug}/`;

    reporter.info(`Page builder: ${pagePath} (${pageBuilder.sections.length} sections)`);

    actions.createPage({
      path: pagePath,
      component: path.resolve("./src/templates/page.js"),
      context: { id },
    });
  });
};
