import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faLinkedin, faInstagram, faTwitter, faGithub, faDiscord, faFacebook } from '@fortawesome/free-brands-svg-icons'

import Header from './header'
import './layout.css'
import 'tachyons'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          className='avenir pageLayout'
          style={{
            margin: `0 auto`,
            maxWidth: 960,
          }}
        >
          {children}
          <footer className="pv4 ph3 ph5-m ph6-l mid-gray">
            <div className="tc">
              <a className="link dim gray dib h2 w2 br-100 mr3 pa2 bg-near-white ba b--black-10" href="https://www.youtube.com/c/arturchmaro" title="YouTube">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a className="link dim gray dib h2 w2 br-100 mr3 pa2 bg-near-white ba b--black-10" href="https://www.linkedin.com/in/arturchmaro" title="LinkedIN">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a className="link dim gray dib h2 w2 br-100 mr3 pa2 bg-near-white ba b--black-10" href="https://www.instagram.com/fullstak_pl/" title="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>

              <a className="link dim gray dib h2 w2 br-100 mr3 pa2 bg-near-white ba b--black-10" href="https://twitter.com/ArtiChmaro" title="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a className="link dim gray dib br-100 h2 w2 mr3 pa2 bg-near-white ba b--black-10" href="https://github.com/Chmarusso" title="Github">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a className="link dim gray dib br-100 h2 w2 mr3 pa2 bg-near-white ba b--black-10" href="https://discordapp.com/invite/Ft9nb4C" title="Discord">
                <FontAwesomeIcon icon={faDiscord} />
              </a>
              <a className="link dim gray dib br-100 h2 w2 mr3 pa2 bg-near-white ba b--black-10" href="https://www.facebook.com/fullstak/" title="Discord">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
            <small className="f6 db tc mt3">© 2018 - {new Date().getFullYear()} <b>FullStak</b></small>
            <small className="f6 db tc mt3">Ta strona korzysta z plików cookies: <a href='/privacy-policy-cookies'>Polityka prywatności i cookies</a></small>
            <small className="f7 db tc mt1">built with <a href='https://www.gatsbyjs.org'>Gatsby</a></small>
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
