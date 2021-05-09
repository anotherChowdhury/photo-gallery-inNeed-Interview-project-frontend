import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { publicAlbumsUrl } from '../urls'
import AlbumBox from './AlbumBox'
import Navbar from './Navbar'
const PublicAlbums = () => {
  const [loading, setLoading] = useState(true)
  const [albums, setAlbums] = useState([])
  const [error, setError] = useState('')
  const [page, setPage] = useState({ 1: 0 })
  const [currentPage, setCurrentPage] = useState(1)
  const [disableNext, setDisableNext] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const config = {}
        const token = localStorage.getItem('token')
        if (token) {
          config.headers = {
            Authorization: token
          }
        }
        const {
          data: { albums }
        } = await axios.get(`${publicAlbumsUrl}?lastReceivedId=${page[currentPage - 1]}`, config)
        console.log(albums)
        setPage({ ...page, [currentPage]: albums[albums.length - 1].aid })
        setDisableNext(false)
        setLoading(false)
        setAlbums(albums)
      } catch (err) {
        setDisableNext(true)
      }
    }

    getData()
  }, [currentPage])

  const handlePrev = () => {
    if (disableNext) setCurrentPage(currentPage - 2)
    else setCurrentPage(currentPage - 1)
  }

  if (loading) return <p>Loading</p>

  if (error && currentPage == 1) return <p>{error}</p>

  return (
    <>
      <Navbar user={localStorage.getItem('userId')} />
      <div className="gridContainer">
        {albums.map((album) => {
          return <AlbumBox album={album} key={album.aid} />
        })}
      </div>

      <button onClick={() => setCurrentPage(currentPage + 1)} disabled={disableNext}>
        Next
      </button>

      <button onClick={handlePrev} disabled={currentPage == 1}>
        Previous
      </button>
    </>
  )
}

export default PublicAlbums
