const Photo = ({ photo, delete: deletePhoto }) => {
  return (
    <div className="photoContainer" key={photo.pid}>
      <img src={photo.image_link} alt="" key={photo.pid} />
      {deletePhoto ? <button onClick={() => deletePhoto(photo.pid)}>Delete Photo </button> : ''}
    </div>
  )
}

export default Photo
