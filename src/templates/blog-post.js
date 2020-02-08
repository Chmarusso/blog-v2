import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from '../components/seo'
import { DiscussionEmbed } from "disqus-react"

export default ({ data }) => {
  const post = data.markdownRemark
  const disqusShortname = 'fullstak';
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
        cover={post.frontmatter.cover.publicURL}
      />
      <article className="pa3">
        <h1 className="f2">{post.frontmatter.title}</h1>
        <div className="lh-copy mt3" dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className="pa4-l">
          <form class="newsletterBox mw7 center pa4 br2-ns ba b--black-10" action="https://gmail.us20.list-manage.com/subscribe/post?u=cd9534d13c2fcd4e20e32977c&amp;id=55b16eeb45" method="post" name="mc-embedded-subscribe-form" target="_blank">
          <fieldset className="cf bn ma0 pa0">
            <legend className="pa0 f5 f4-ns mb3 b">Zapisz się na Newsletter!</legend>
            ✅ Zero spamu
            <br/>✅ Tylko dobre materiały (React, JS, Web UX/UI)
            <br/>✅ W każdej chwili możesz się wypisać
            <br/><br/>
            <div className="cf">
              <label className="clip" for="email-address">Email Address</label>
              <input className="f6 f5-l input-reset bn fl black-80 bg-white pa3 w-100 w-50-m w-30-l br2-ns br--left-ns" name="FNAME" id="mce-FNAME" placeholder="Twoje imię" />
              <input className="f6 f5-l input-reset bn fl black-80 bg-white pa3 w-100 w-50-m w-50-l br2-ns br--right-ns" name="EMAIL" id="mce-EMAIL" placeholder="Twój adres e-mail" required />
              <div style={{position: 'absolute', left: '-5000px'}}><input type="text" name="b_cd9534d13c2fcd4e20e32977c_55b16eeb45" tabindex="-1" value="" /></div>
              <input className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns" type="submit" value="Subskrybuj" />
            </div>
          </fieldset>
          <div>
            <br/>
            Sprawdź informacje o polityce prywatności i RODO <a href="/privacy-policy-cookies">tutaj</a>.
          </div>
        </form>
      </div>

        <div>
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </div>
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
