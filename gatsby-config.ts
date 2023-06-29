import type { GatsbyConfig } from "gatsby"
import {config as dotenv} from 'dotenv';
dotenv();

const config : GatsbyConfig = {
  siteMetadata: {
    siteUrl: "https://docs.criipto.com",
    title: "Criipto Documentation for Verify and Signatures",
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Criipto Documentation",
        short_name: "Criipto Docs",
        start_url: "/",
        background_color: "#204c82",
        theme_color: "#204c82",
        display: "browser",
        icon: "src/images/icon.png"
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        root: __dirname,
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 768,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-acronyms`,
            options: {
              acronyms: {
                TU: `Tjenesteudbyder (Service provider)`
              },
            },
          },
        ],
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-netlify",
      options: {
        mergeSecurityHeaders: false
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
        ignore: [`**/*\.graphql\.tsx`],
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "snippets",
        path: "./src/snippets/"
      },
      __key: "snippets",
    }
  ].concat(process.env.GATSBY_ALGOLIA_APP_ID ? [
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia-queries")
      } as any,
    }
  ] : [])
  .concat(process.env.SENTRY_DSN ? [
    {
      resolve: "@sentry/gatsby",
      options: {
        dsn: process.env.SENTRY_DSN,
        sampleRate: 0.7,
      } as any,
    }
  ] : []),
};

export default config;