import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserContextProvider from '../contexts/UserContext'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('token') ? (
        <UserContextProvider>
          <Component {...props} />{' '}
        </UserContextProvider>
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)

export default PrivateRoute
