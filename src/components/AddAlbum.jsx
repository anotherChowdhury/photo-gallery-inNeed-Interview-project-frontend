import axios from 'axios'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { albumUrl, photoUrl } from '../urls'
import Navbar from './Navbar'

const AddAlbum = () => {
  const [photos, setPhotos] = useState([])
  const [privacy, setPrivacy] = useState(true)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [albumId, setAlbumId] = useState(0)
  const [urls, setUrls] = useState([])
  const [urlId, setUrlId] = useState(0)

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(photos)
    try {
      const {
        data: { album }
      } = await axios.post(
        albumUrl,
        { name, description, is_public: privacy },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      )

      let formData = new FormData()

      formData.append('albumId', album.aid)

      photos.forEach((image) => {
        formData.append('photos', image)
      })

      const {
        data: { photos: uploaded }
      } = await axios.post(photoUrl, formData, {
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        }
      })

      setAlbumId(album.aid)
    } catch (err) {
      console.log(err.response)
    }
  }

  const handlePrivacy = (e) => {
    console.log(privacy)
    if (e.target.value == 'public') setPrivacy(true)
    else setPrivacy(false)
  }

  const handleUpload = (e) => {
    const newFiles = []
    const newUrls = []
    for (const file of e.target.files) {
      console.log(file)
      if (!photos.find((photo) => photo.name === file.name)) newFiles.push(file)
    }

    console.log('newfiles', newFiles)

    if (newFiles.length) {
      console.log('In newfile if coniditon')
      for (const [index, file] of newFiles.entries()) {
        console.log('In newfile url loop')
        console.log(file)
        const url = URL.createObjectURL(file)
        console.log(url)
        newUrls.push({ url, id: urlId + index + 1, name: file.name })
      }

      setUrlId(urlId + newFiles.length)
      setUrls([...urls, ...newUrls])
      setPhotos([...photos, ...e.target.files])
    }
  }

  const deletePhoto = (urlId, fileName) => {
    const updatedPhotos = photos.filter((photo) => photo.name !== fileName)
    const updatedUrls = urls.filter((url) => url.id !== urlId)
    setPhotos(updatedPhotos)
    setUrls(updatedUrls)
  }

  if (albumId)
    return (
      <Redirect
        to={{
          pathname: `/albums/${albumId}`
        }}
      />
    )

  return (
    <>
      <Navbar user={localStorage.getItem('userId')} />
      <div className="Album">
        <form className="addAlbum" onSubmit={onSubmit}>
          <input
            type="text"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Album Name"
            required
          />
          <input
            type="text"
            name="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Album Description"
            required
          />
          <label style={{ cursor: 'grabbing' }} id="fileLabel">
            Upload Photos , Selected Photos {photos.length}
            <input type="file" name="photos" multiple onChange={handleUpload} hidden required />
          </label>
          <label>
            Public
            <input type="radio" value="public" onChange={handlePrivacy} name="privacy" required />
          </label>
          <label>
            Private
            <input type="radio" value="private" on onChange={handlePrivacy} name="privacy" />
          </label>
          <button type="submit">Upload Photos</button>
        </form>

        {urls.length ? (
          <div className="photoGrid">
            {urls.map((url, index) => {
              return (
                <div className="photoContainer" key={index}>
                  <img src={url.url} alt={url.name} />
                  {deletePhoto ? <button onClick={() => deletePhoto(url.id, url.name)}>Delete Photo </button> : ''}
                </div>
              )
            })}
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default AddAlbum
