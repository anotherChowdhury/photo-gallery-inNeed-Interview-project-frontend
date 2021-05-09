import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { albumUrl, photoUrl } from '../urls'
import UserContextProvider, { UserContext } from '../contexts/UserContext'
import { useParams } from 'react-router-dom'
import AddPhotos from './AddPhotos'
import Photo from './Phtoto'
import Navbar from './Navbar'
const Album = () => {
  const { albumId } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [photos, setPhotos] = useState([])
  const [isOwner, setOwner] = useState(false)
  const [addPhotos, setAddPhotos] = useState(false)
  const [editAlbum, setEditAlbum] = useState(false)
  const [album, setAlbum] = useState({})

  const getData = async () => {
    const userId = localStorage.getItem('userId')

    let config = {}
    if (localStorage.getItem('token')) config = { headers: { Authorization: localStorage.getItem('token') } }
    try {
      const {
        data: { album }
      } = await axios.get(`${albumUrl}/${albumId}`, config)
      setAlbum(album)
      setPhotos(album.photos)
      if (album.user_id == userId) setOwner(true)
      setLoading(false)
    } catch (err) {
      console.log(err)
      const {
        data: {
          error: { message }
        }
      } = err.response

      setError(message)
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const addPhotostoAlbum = (newPhotos) => {
    setPhotos([...photos, ...newPhotos])
    setAddPhotos(false)
  }

  const deletePhoto = async (id) => {
    try {
      await axios.delete(`${photoUrl}/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })

      const updatedPhotoList = photos.filter((photo) => photo.pid !== id)
      setPhotos(updatedPhotoList)
    } catch (err) {
      console.log(err)
    }
  }
  if (loading) return <p>Loading</p>

  if (error) return <p>{error}</p>

  if (addPhotos)
    return (
      <UserContextProvider>
        <AddPhotos album={{ aid: albumId }} add={addPhotostoAlbum} />
      </UserContextProvider>
    )

  if (editAlbum) return

  return (
    <>
      <Navbar user={localStorage.getItem('userId')} />
      <div className="album">
        <p>{album.name}</p>
        <p>{album.description}</p>
        <p>privacy - {album.is_public ? 'Public' : 'Private'}</p>
        {isOwner ? (
          <>
            <button onClick={() => setAddPhotos(true)}>Add Photos to album</button>
            <div className="photoGrid">
              {photos.map((photo) => {
                return <Photo photo={photo} owner={true} delete={deletePhoto} />
              })}
            </div>{' '}
          </>
        ) : (
          <div className="photoGrid">
            {photos.map((photo) => {
              return <Photo photo={photo} />
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default Album
