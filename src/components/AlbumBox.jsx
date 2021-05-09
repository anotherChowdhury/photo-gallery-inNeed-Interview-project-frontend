import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { userId } from './userId'

const AlbumBox = ({ album }) => {
  return (
    <div className="card">
      <Link to={`/albums/${album.aid}`}>
        <header>
          <h4>{album.name}</h4>
        </header>
        <div className="albumCover">
          <img src={album.photos[0].image_link} alt="" />
        </div>
        {album.user ? (
          <Link to={`/public/${album.user.uid}`}>
            <p className="userProfileLink">{album.user.name}</p>
          </Link>
        ) : (
          ''
        )}
        <p>{album.description}</p>
      </Link>
    </div>
  )
}

export default AlbumBox
