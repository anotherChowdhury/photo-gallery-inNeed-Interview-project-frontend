import React, { useState, useContext } from 'react'
import axios from 'axios'
import { loginUrl } from '../urls'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import Navbar from './Navbar'

const Login = ({ refresh }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [redirect, setRedirect] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(loginUrl, { email, password })
      localStorage.setItem('token', data.accessToken)
      localStorage.setItem('userId', data.userId)
      setRedirect(true)
    } catch (err) {
      const {
        data: {
          error: { message }
        }
      } = err.response

      setError(message)
    }
  }

  if (redirect) return <Redirect to={{ pathname: '/public' }} />
  return (
    <>
      <Navbar />
      <div className="login">
        <form className="loginForm" onSubmit={onSubmit}>
          {error ? <p className="warning">Wrong Credentials </p> : ''}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button type="submit">Log In</button>
        </form>
      </div>
    </>
  )
}
export default Login
