import { Link, graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Img from 'gatsby-image'
import './header.css'

const Header = ({ siteTitle, data }) => (
  <div
    className='avenir'
    style={{
      background: `linear-gradient(0deg, rgba(89,54,252,1) 0%, rgba(136,71,253,1) 100%)`,
    }}
  >
    <div className="flex items-start" style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}>
      <div id="headerLayer" className="w-75 mr2">
        <h1 className='ma0 pa0 mt1'>
          <Link to="/" style={{color: `white`, textDecoration: `none`}}>
          <StaticQuery
        query={graphql`
          query {
            avatar: file(relativePath: { eq: "fullstak-logo.png" }) {
              childImageSharp {
                fluid(maxWidth: 200, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        `}
        render={data => <Img fluid={data.avatar.childImageSharp.fluid} className="mb2" style={{width: '290px'}} />}
      />
          </Link>
        </h1>
      </div>
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
