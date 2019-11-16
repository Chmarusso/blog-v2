import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Img from 'gatsby-image'


const IndexPage = ({data}) => (
  <Layout>
    <SEO title="FullStak - podcast i blog" keywords={[`programowanie`, `kursy`, `blog`, `ruby`, `react`, `blockchain`, `javascript`]} />
    <section className="mw7 center">
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <article key={node.id} className="bb b--black-10">
        <Link to={node.fields.slug} className="db pv4 ph3 ph0-l no-underline black dim">
          <div className="flex flex-column flex-row-ns">
            <div className="pr3-ns mb4 mb0-ns w-100 w-40-ns">
              <Img
                className='db ba b--black-10'
                sizes={node.frontmatter.cover.childImageSharp.fixed}
                alt='Blog post cover'
              />
            </div>
            <div className="w-100 w-60-ns pl3-ns">
              <h1 className="f3 mt0 lh-title">{node.frontmatter.title}</h1>
              <p className="f6 f5-l lh-copy">{node.frontmatter.intro}</p>
              <p className="f6 lh-copy mv0 light-purple">{node.frontmatter.date}</p>
            </div>
          </div>
        </Link>
        </article>
      ))}
    </section>

  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            intro
            date(locale: "pl", formatString: "LL")
            cover {
              publicURL
              childImageSharp {
                fixed(width: 327, height: 167, quality: 80) {
                  srcSet, aspectRatio, src
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
