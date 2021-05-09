import { useState } from 'react'
import axios from 'axios'
import { photoUrl } from '../urls'
import { Redirect } from 'react-router-dom'
import Navbar from './Navbar'

const AddPhotos = ({ album, setUpdate, add }) => {
  const [photos, setPhotos] = useState([])
  const [redirect, setRedirect] = useState(false)
  const [urls, setUrls] = useState([])
  const [urlId, setUrlId] = useState(0)

  const deletePhoto = (urlId, fileName) => {
    const updatedPhotos = photos.filter((photo) => photo.name !== fileName)
    const updatedUrls = urls.filter((url) => url.id !== urlId)
    setPhotos(updatedPhotos)
    setUrls(updatedUrls)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(photos)

      let formData = new FormData()

      formData.set('albumId', album.aid)

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

      add(uploaded)
      setRedirect(true)
    } catch (err) {
      console.log(err.response)
    }
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

  if (redirect) {
    setUpdate(false)
    return <Redirect to={{ pathname: `/albums/${album.aid}` }} />
  }

  return (
    <>
      <Navbar user={localStorage.getItem('userId')} />
      <div className="addPhotosToAlbum">
        <form className="addPhotos" onSubmit={handleSubmit}>
          <label id="fileLabel">
            Upload Photos to {album.name}, Selected Photos {photos.length}
            <input type="file" name="photos" multiple onChange={handleUpload} hidden />
          </label>
          <button type="submit">Upload</button>
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

export default AddPhotos
