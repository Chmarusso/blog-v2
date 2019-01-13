import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
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
      <div class="mr2">
        <img src="http://tachyons.io/img/logo.jpg" class="br-100 pa1 ba b--black-10 h3 w3" alt="avatar" />
      </div>
      <div class="w-75 mr2">
        <h1 className='ma0 pa0 mt1'>
          <Link to="/" style={{color: `white`, textDecoration: `none`}}>
            {siteTitle}
          </Link>
        </h1>
        <i className='white fw1'>blog about web technologies</i>
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
