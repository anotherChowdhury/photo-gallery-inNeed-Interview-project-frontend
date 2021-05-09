import axios from 'axios'
import { useEffect, useState } from 'react'
import { userAlbumsUrl } from '../urls'
import AlbumBox from './AlbumBox'

const UsersAlbum = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { albums }
        } = await axios.get(userAlbumsUrl, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        setAlbums(albums)
        setLoading(false)
      } catch (err) {
        console.log(err)
        setError('Something went wrong')
      }
    }
    getData()
  })

  if (loading) return <p>Loading</p>

  if (error) return <p>{error}</p>

  return (
    <div className="publicAlbums">
      {albums.map((album) => {
        return <AlbumBox album={album} />
      })}
    </div>
  )
}

export default UsersAlbum
