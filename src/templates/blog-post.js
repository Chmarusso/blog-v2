import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from '../components/seo'
import Img from 'gatsby-image'

export default ({ data, pageContext }) => {
  const post = data.markdownRemark
  console.log(post.frontmatter.cover.childImageSharp.sizes)
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        keywords={post.frontmatter.tags}
        description={post.frontmatter.intro}
      />
      <div>
        <h1>{post.frontmatter.title}</h1>
        <Img sizes={post.frontmatter.cover.childImageSharp.sizes} />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title,
        intro,
        tags,
        date,
        cover {
          publicURL
          childImageSharp {
            sizes(maxWidth: 930 ) {
              srcSet, aspectRatio, src, sizes
            }
          }
        }
      }
    }
  }
`
