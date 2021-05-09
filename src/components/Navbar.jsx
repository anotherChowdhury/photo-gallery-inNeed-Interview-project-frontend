import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

const Navbar = ({ user }) => {
  const [logOut, setLogOut] = useState(false)

  if (!user)
    return (
      <div className="nav">
        <p>Welcome To Photo Gallery</p>
        <Link to="/public">Public Albums</Link>
        <Link id="register" to="/register">
          Resgister
        </Link>
      </div>
    )
  if (logOut) return <Redirect to="/login" />

  return (
    <div className="nav">
      <ul>
        <li>
          <Link to="/public">Public Albums</Link>
        </li>
        <li>
          <Link to="/user">My Albums</Link>
        </li>
        <li>
          <Link to="/albums/new">Add Album</Link>
        </li>
        <li>
          <button
            onClick={() => {
              localStorage.removeItem('token')
              localStorage.removeItem('userId')
              setLogOut(true)
            }}
          >
            Log out
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
