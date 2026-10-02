const path = require("path");
const blogPosts = require("./src/data/blogRecords.cjs");

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  const template = path.resolve("./src/templates/blog-post.js");

  blogPosts.forEach(({ slug }) => {
    createPage({
      path: `/blog/${slug}/`,
      component: template,
      context: { slug },
    });
  });
};
