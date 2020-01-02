import React from "react"
import axios from "axios"
import { navigate } from "@reach/router"

import SEO from '../seo'
import { setUser } from "../../services/auth"

const ErrorMessage = ({ text }) => {
  return (
    <div className="mb4 flex items-center justify-center pa4 bg-washed-red navy">
      <svg className="w1" data-icon="info" viewBox="0 0 32 32">
        <title>info icon</title>
        <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"></path>
      </svg>
      <span className="lh-title ml3">{text}</span>
    </div>
  )
}

export default ({ location }) => {
  const [error, setError] = React.useState(null);
  console.log(location)

  React.useEffect(() =>{
    const connect = async () => {
      try {
        const url = `http://localhost:1337/auth/facebook/callback${location.search}`
        const { data } = await axios.get(url)
        setUser(data)
        setError(null)
        navigate('/app/account')
      } catch {
        setError('Błąd logowania')
      }
    }

    connect()
  }, [])

  return (
    <main className="pa4 black-80 measure center">
      <SEO title="Logowanie" />
      Logowanie via Facebook
      {error && <ErrorMessage text={error} />}
    </main>
  );
}
