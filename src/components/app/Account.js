import React from "react"
import { navigate } from "@reach/router"
import { getUser, logout } from '../../services/auth'

export default () => {
  const gatsbyUser = getUser()

  return (
    <div>
      Witaj {gatsbyUser.user.username}!
      <a href="#" onClick={(e) => {
        e.preventDefault()
        logout(() => navigate('/'))
      }}>Logout</a>
    </div>
  );
}
