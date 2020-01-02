import React from "react"
import { Router } from "@reach/router"

import Layout from '../components/layout'
import PrivateRoute from '../components/app/PrivateRoute'
import Account from '../components/app/Account'
import Login from '../components/app/Login'
import FbConnect from '../components/app/FbConnect'
import GhConnect from '../components/app/GhConnect'

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute component={Account} path="/app/account" />
      <Login path="/app/login" />
      <FbConnect path="/app/facebook/connect" />
      <GhConnect path="/app/github/connect" />
    </Router>
  </Layout>
)
export default App
