import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from '../components/seo'
import Img from 'gatsby-image'
import { DiscussionEmbed } from "disqus-react"

export default ({ data }) => {
  const post = data.markdownRemark
  const disqusShortname = "arturchmaro";
  const disqusConfig = {
    identifier: post.slug,
    title: post.frontmatter.title,
  }

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        keywords={post.frontmatter.tags}
        description={post.frontmatter.intro}
      />
      <article className="pa3">
        <h1 className="f2">{post.frontmatter.title}</h1>
        <Img sizes={post.frontmatter.cover.childImageSharp.sizes} />
        <p className="lh-copy mt3" dangerouslySetInnerHTML={{ __html: post.html }} />
        <p>
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </p>
      </article>
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
