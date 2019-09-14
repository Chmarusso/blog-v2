import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from '../components/seo'
import { DiscussionEmbed } from "disqus-react"
import moment from 'moment'
import 'moment/locale/pl'

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
        cover={post.frontmatter.full_cover.publicURL}
      />
      <article className="pa3">
        <h1 className="f2">{post.frontmatter.title}</h1>
        <iframe src={post.frontmatter.anchorfm} width="100%" frameborder="0" scrolling="no"></iframe>
        <div style={{flexWrap: 'wrap', display: 'flex', justifyContent: 'center', alignContent: 'center'}}><a target="_blank" class="no-underline near-white bg-animate bg-red hover-bg-light-red inline-flex items-center ma2 tc br2 pa2" href={`https://www.youtube.com/watch?v=${post.frontmatter.youtube}`} title="YouTube">
    <svg class="dib h2 w2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" fill-rule="nonzero"/></svg>
    <span class="f6 ml3 pr2">YouTube</span>
  </a> <a target="_blank" class="no-underline near-white bg-animate bg-green hover-bg-light-green inline-flex items-center ma2 tc br2 pa2" href="https://open.spotify.com/show/3bKCmhqOyBadoYW3DmyNEF" title="Spotify">
    <svg class="dib h2 w2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill-rule="nonzero"/></svg>
    <span class="f6 ml3 pr2">Spotify</span>
  </a> <a target="_blank" class="no-underline near-white bg-animate bg-purple hover-bg-light-purple inline-flex items-center ma2 tc br2 pa2" href="https://itunes.apple.com/us/podcast/fullstak/id1453763280?mt=2&ign-mpt=uo%3D4" title="Apple Podcasts"> <svg class="dib h2 w2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M11.93 24s2.633 0 2.633-7.794c0-1.451-1.18-2.633-2.633-2.633s-2.634 1.182-2.634 2.633C9.296 24 11.93 24 11.93 24zm3.23-2.656c.115-.447.205-.896.275-1.351l.053-.36c.115-.05.23-.098.346-.15 1.828-.828 3.367-2.243 4.348-3.993.447-.803.777-1.67.973-2.572.227-1.008.285-2.059.166-3.088-.105-.963-.361-1.904-.77-2.787-.465-1.039-1.111-1.986-1.924-2.784-.828-.827-1.807-1.505-2.875-1.972-1.098-.496-2.303-.752-3.52-.782-1.22-.03-2.438.166-3.582.603-1.098.419-2.106 1.037-2.979 1.834-.827.752-1.534 1.67-2.046 2.678-.437.858-.736 1.776-.902 2.723-.166.979-.166 1.986-.016 2.98.135.872.391 1.73.768 2.543.888 1.881 2.393 3.444 4.258 4.394.226.104.451.21.692.314.015.121.046.256.06.392.075.438.166.889.271 1.325-.406-.136-.813-.287-1.204-.468-2.152-.976-3.972-2.662-5.101-4.754-.512-.947-.873-1.955-1.098-3.01-.257-1.158-.302-2.377-.15-3.566.15-1.112.466-2.211.933-3.22.556-1.188 1.339-2.286 2.271-3.204.916-.916 2.06-1.684 3.31-2.211C9.02.311 10.42.018 11.828.001c1.412-.015 2.824.24 4.139.758 1.266.498 2.434 1.238 3.43 2.166.965.895 1.76 1.962 2.346 3.139.496.993.842 2.076 1.008 3.175.18 1.144.18 2.317-.016 3.446-.166 1.053-.512 2.091-.979 3.053-1.053 2.122-2.799 3.868-4.92 4.922-.527.256-1.084.481-1.655.661l-.021.023zm.52-4.295l.01-.47c0-.316 0-.632-.046-.943-.015-.121-.045-.226-.075-.346.557-.451 1.023-1.023 1.369-1.67.256-.481.451-1.008.557-1.551.121-.602.15-1.233.061-1.865-.074-.557-.227-1.098-.451-1.61-.285-.616-.677-1.188-1.158-1.67-.497-.481-1.054-.872-1.686-1.159-.692-.3-1.445-.48-2.197-.496-.752-.015-1.52.121-2.227.392-.632.256-1.219.617-1.73 1.083-.513.466-.934 1.008-1.235 1.624-.257.496-.436 1.024-.542 1.58-.105.572-.119 1.159-.045 1.73.075.557.226 1.099.451 1.609.346.768.857 1.445 1.49 2.002l-.091.406c-.06.316-.045.617-.045.947v.422c-1.054-.646-1.927-1.58-2.513-2.663-.347-.617-.587-1.279-.723-1.972-.166-.768-.195-1.564-.09-2.347.09-.707.286-1.399.572-2.032.346-.781.857-1.504 1.459-2.121.617-.617 1.339-1.113 2.121-1.459.873-.391 1.82-.602 2.769-.632.964-.016 1.927.15 2.813.497.813.315 1.551.781 2.197 1.368.631.587 1.174 1.278 1.564 2.047.316.632.557 1.309.678 2.001.121.723.15 1.459.045 2.182-.09.707-.285 1.399-.588 2.046-.586 1.31-1.594 2.438-2.828 3.176l.114-.106zm-3.75-9.575c1.465 0 2.654 1.188 2.654 2.656 0 1.473-1.189 2.662-2.654 2.662-1.467 0-2.655-1.189-2.655-2.648s1.188-2.649 2.655-2.649v-.021z"></path></svg>
    <span class="f6 ml3 pr2">Apple Podcasts</span>
  </a> <a target="_blank" class="no-underline near-white bg-animate bg-blue hover-bg-light-blue inline-flex items-center ma2 tc br2 pa2" href="https://www.google.com/podcasts?feed=aHR0cHM6Ly9hbmNob3IuZm0vcy85NGZiMTY0L3BvZGNhc3QvcnNz" title="Google Podcasts">
  <svg class="dib h2 w2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><title>Google Podcasts icon</title><path d="M10.5 7.636v8.727h3V7.636zM3 11.182a1.5 1.5 0 1 1-3.001-.001A1.5 1.5 0 0 1 3 11.182z"></path><path d="M3 12.818a1.5 1.5 0 1 1-3.001-.001A1.5 1.5 0 0 1 3 12.818z"></path><path d="M0 11.182h3v1.636H0v-1.636zM24 12.818a1.5 1.5 0 1 1-3.001-.001 1.5 1.5 0 0 1 3.001.001z"></path><path d="M24 11.182a1.5 1.5 0 1 1-3.001-.001 1.5 1.5 0 0 1 3.001.001z"></path><path d="M24 12.818h-3v-1.636h3v1.636zM8.182 16.091a1.5 1.5 0 1 1-3.001-.001 1.5 1.5 0 0 1 3.001.001z"></path><path d="M8.182 17.727a1.5 1.5 0 1 1-3.001-.001 1.5 1.5 0 0 1 3.001.001z"></path><path d="M5.182 16.091h3v1.636h-3v-1.636zM8.182 6.273a1.5 1.5 0 1 1-3.001-.001 1.5 1.5 0 0 1 3.001.001zM8.182 11.591a1.5 1.5 0 1 1-3.001-.001 1.5 1.5 0 0 1 3.001.001z"></path><path d="M5.182 6.273h3v5.352h-3V6.273zM18.818 7.909a1.5 1.5 0 1 1-3.001-.001 1.5 1.5 0 0 1 3.001.001z"></path><path d="M18.818 6.273a1.5 1.5 0 1 1-3.001-.001 1.5 1.5 0 0 1 3.001.001z"></path><path d="M18.818 7.909h-3V6.273h3v1.636zM13.5 3.136a1.5 1.5 0 1 1-3.001-.001 1.5 1.5 0 0 1 3.001.001z"></path><path d="M13.5 1.5a1.5 1.5 0 1 1-3.001-.001A1.5 1.5 0 0 1 13.5 1.5z"></path><path d="M13.5 3.136h-3V1.5h3v1.636zM13.5 22.5a1.5 1.5 0 1 1-3.001-.001 1.5 1.5 0 0 1 3.001.001z"></path><path d="M13.5 20.864a1.5 1.5 0 1 1-3.001-.001 1.5 1.5 0 0 1 3.001.001z"></path><path d="M13.5 22.5h-3v-1.636h3V22.5zM18.818 17.727a1.5 1.5 0 1 1-3.001-.001 1.5 1.5 0 0 1 3.001.001zM18.818 12.409a1.5 1.5 0 1 1-3.001-.001 1.5 1.5 0 0 1 3.001.001z"></path><path d="M18.818 17.727h-3v-5.318h3v5.318zM13.5 7.636a1.5 1.5 0 1 1-3.001-.001 1.5 1.5 0 0 1 3.001.001zM13.5 16.364a1.5 1.5 0 1 1-3.001-.001 1.5 1.5 0 0 1 3.001.001z"></path></svg>
    <span class="f6 ml3 pr2">Google Podcasts</span>
  </a></div>
        <div className="lh-copy mt3" dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />

<div className="pa4-l">
  <form class="bg-light-red mw7 center pa4 br2-ns ba b--black-10" action="https://gmail.us20.list-manage.com/subscribe/post?u=cd9534d13c2fcd4e20e32977c&amp;id=55b16eeb45" method="post" name="mc-embedded-subscribe-form" target="_blank">
    <fieldset className="cf bn ma0 pa0">
      <legend className="pa0 f5 f4-ns mb3 black-80">Aby nie przegapić nowych materiałów zapisz się na newsletter</legend>
      <div className="cf">
        <label className="clip" for="email-address">Email Address</label>
        <input className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" name="EMAIL" id="mce-EMAIL" placeholder="Twój adres e-mail" required />
        <div style={{position: 'absolute', left: '-5000px'}}><input type="text" name="b_cd9534d13c2fcd4e20e32977c_55b16eeb45" tabindex="-1" value="" /></div>
        <input className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns" type="submit" value="Subskrybuj" />
      </div>
    </fieldset>
    <div><br/>Z newslettera w każdej chwili można się bardzo łatwo wypisać. Wystarczy w stopce wiadomości kliknąć w link i już nigdy nie otrzymasz kolejnej wiadomości. Jeżeli interesuje Cię polityka prywatności oraz sprawy związane z tzw. RODO to zapraszam pod <a href="/privacy-policy-cookies">ten link</a>.
<br/><br/>
Do wysyłania newslettera korzystamy z Mailchimpa. Decydując się na korzystanie z newslettera wyrażasz zgodę na przetwarzanie Twojego adresu e-mail przez tę firmę. Więcej o praktykach prywatności tej firmy przeczytasz <a href="https://mailchimp.com/legal/terms/">tutaj</a>.
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
        youtube,
        anchorfm,
        full_cover {
          publicURL
          childImageSharp {
            sizes(maxWidth: 930 ) {
              srcSet, aspectRatio, src, sizes
            }
          }
        },
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
