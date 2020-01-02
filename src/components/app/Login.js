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

export default () => {
  const [error, setError] = React.useState(null);
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post('http://localhost:1337/auth/local', {
        identifier: emailRef.current.value,
        password: passwordRef.current.value
      })
      setUser(data)
      setError(null)
      navigate('/app/account')
    } catch {
      setError('Błąd logowania')
    }
  }

  return (
    <main className="pa4 black-80">
      <SEO title="Logowanie" />
      {error && <ErrorMessage text={error} />}
      <form className="measure center" onSubmit={handleSubmit}>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0 mb0">
          <legend className="f4 fw6 ph0 mh0">Logowanie do systemu</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" for="email-address">Email</label>
            <input
              ref={emailRef}
              className="pa2 input-reset ba bg-transparent w-100"
              type="email"
              name="email-address"
              id="email-address"
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" for="password">Hasło</label>
            <input
              ref={passwordRef}
              className="b pa2 input-reset ba bg-transparent w-100"
              type="password"
              name="password"
              id="password"
            />
          </div>
        </fieldset>
        <div className="">
          <input
            className="b w-100 tc ph3 pv3 input-reset ba white bg-purple dim pointer f6 dib"
            type="submit"
            value="Logowanie"
          />
        </div>
        <div className="mt3 loginBtns">
          <p className="tc">lub zaloguj się poprzez</p>
          <div className="flex justify-between">
            <a
              href="http://localhost:1337/connect/facebook"
              className="w-100 w-40-ns pa2 pv2 tc bg-blue white pointer f6 dib dim"
            >
              Facebook
            </a>
            <a
              href="http://localhost:1337/connect/github"
              className="w-100 w-40-ns pa2 pv2 tc bg-near-white black pointer f6 dib dim"
            >
              Github
            </a>
          </div>
        </div>
        <div className="mt3">
          <p>Nie masz konta? Zarejestruj się</p>
        </div>
      </form>
    </main>
  );
}
