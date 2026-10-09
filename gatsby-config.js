require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Ajaye-C Project`,
    siteUrl: `https://ajaye-c.netlify.app`,
    description: `Gatsby React project with Tailwind CSS`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.WPGRAPHQL_URL,
        type: {
          Post: {
            limit: process.env.NODE_ENV === `development` ? 20 : 5000,
          },
        },
      },
    },
  ],
};
