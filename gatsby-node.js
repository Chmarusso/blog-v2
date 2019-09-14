/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const moment = require('moment')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {

    let slug, path

    if(node.frontmatter.category === 'podcast') {
      path = createFilePath({ node, getNode, basePath: `posts`})
      slug = `/${node.frontmatter.episode}`
    } else {
      const date = moment(node.frontmatter.date).format('YYYY/MM/DD')
      path = createFilePath({ node, getNode, basePath: `posts`})
      slug = `${path}`
    }



    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              category
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      let template

      if(node.frontmatter.category === 'podcast') {
        template = path.resolve(`./src/templates/podcast-post.js`)
      } else {
        template = path.resolve(`./src/templates/blog-post.js`)
      }

      createPage({
        path: node.fields.slug,
        component: template,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug
        },
      })
    })
  })
}
