import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import { registerUrl } from '../urls'
import Navbar from './Navbar'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [redirect, setRedirect] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(registerUrl, { name, email, password })
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

  const checkPassword = (e) => {
    if (e.target.value && e.target.value == password) {
      setError('')
    } else {
      setError('Passwords do not match')
    }
  }

  if (redirect) return <Redirect to="/login" />

  return (
    <>
      <Navbar />
      <div className="signup">
        <form onSubmit={handleSubmit} className="singupForm">
          {error ? <p className="error">{error}</p> : ''}
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            onChange={(e) => {
              setName(e.target.value)
            }}
            value={name}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm-password"
            required
            onChange={checkPassword}
          />
          <br />
          <button type="submit" disabled={error}>
            Register
          </button>
          <p>
            Already Registered ?<Link to="/login"> Login </Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default Register
