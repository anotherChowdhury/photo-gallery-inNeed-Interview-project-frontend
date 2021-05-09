import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AddAlbum from './components/AddAlbum.jsx'
import AddPhotos from './components/AddPhotos.jsx'
import Album from './components/Album.jsx'
import Login from './components/Login.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import PublicAlbums from './components/PublicAlbums.jsx'
import Register from './components/Register.jsx'
import UserContextProvider from './contexts/UserContext'
import './App.css'
import Profile from './components/UserProfile.jsx'
import Home from './components/Home.jsx'
import { useState } from 'react'
import MyAlbums from './components/MyAlbums.jsx'
function App() {
  // context is not updating , hence re-rendering the whole app, let's see if this worsks,have to check it later why context isn't updating
  // context, refesh nothing works, can be race condition. need to look into it
  const [refresh, setRerfesh] = useState(false)
  const refrershApp = () => setRerfesh(true)

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PublicAlbums} />

        <Route path="/register" exact component={Register} />

        {/*public albums rouute, redirec to this after login */}
        <Route path="/public" exact>
          <UserContextProvider>
            <PublicAlbums />
          </UserContextProvider>
        </Route>

        {/*users public albums route, redirect to this when username is clicked */}
        <Route path="/public/:userId" exact component={Profile} />

        {/*users albums route, redirect to this when my albums is clicked */}
        <PrivateRoute path="/user" component={MyAlbums} />

        <Route path="/login">
          <UserContextProvider>
            <Login refresh={refrershApp} />
          </UserContextProvider>
        </Route>

        <PrivateRoute path="/home" component={Home} />

        {/*create albums route, redirect to this when add albums is clicked , need to change and use AddPhotos inside it casue more than 80% code is the same for both*/}
        <PrivateRoute path="/albums/new" component={AddAlbum} />

        <Route path="/albums/:albumId" exact>
          <UserContextProvider>
            <Album />
          </UserContextProvider>
        </Route>

        <Route
          path="/addphotos"
          render={(props) => (
            <UserContextProvider>
              {' '}
              <AddPhotos {...props} />{' '}
            </UserContextProvider>
          )}
        />
      </Switch>
    </Router>
  )
}

export default App
