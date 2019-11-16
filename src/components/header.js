import { Link, graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Img from 'gatsby-image'
import MenuIcon from './menuicon.svg'
import CloseIcon from './closeicon.svg'
import './header.scss'

const Header = ({ siteTitle, data }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return(
  <div className='avenir' id='headerBox'>
    <div className="flex items-start" id='navBar'>
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
        render={data => <Img fluid={data.avatar.childImageSharp.fluid} className="mb2 logoType" />}
      />
          </Link>
        </h1>
        <div className={mobileOpen ? 'menuTop open' : 'menuTop'}>
          <Link to="/">Blog</Link>
          <Link to="/podcast">Podcast</Link>
          <Link to="/newsletter">Newsletter</Link>
          <Link to="/autor">Autor</Link>
        </div>
      </div>
      <div className='opener' onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen && <img src={CloseIcon} alt="close mobile menu icon" />}
        {!mobileOpen && <img src={MenuIcon} alt="open mobile menu icon" />}
      </div>
    </div>
  </div>)
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
