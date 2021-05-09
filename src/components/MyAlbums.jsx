import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { allAlbumsByUser } from '../urls'
import AlbumBox from './AlbumBox'
import Navbar from './Navbar'

const MyAlbums = () => {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { albums }
        } = await axios.get(allAlbumsByUser, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })

        console.log(albums)
        setLoading(false)
        setAlbums(albums)
      } catch (err) {
        const {
          response: {
            data: {
              error: { message }
            }
          }
        } = err
        setLoading(false)
        setError(message)
      }
    }

    getData()
  }, [])

  if (loading)
    return (
      <div>
        <Navbar user={localStorage.getItem('userId')} />
        <p>Loading</p>
      </div>
    )
  if (error)
    return (
      <div>
        <Navbar user={localStorage.getItem('userId')} />
        <p>{error}</p>
      </div>
    )
  return (
    <>
      <Navbar user={localStorage.getItem('userId')} />
      <div className="gridContainer">
        {albums.map((album) => {
          return <AlbumBox album={album} />
        })}
      </div>
    </>
  )
}

export default MyAlbums
