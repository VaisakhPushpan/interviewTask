import React from 'react'
import { useParams } from 'react-router-dom'

const ImagePopUp = () => {
    const {id} = useParams();
  return (
    <div>
      image popup
    </div>
  )
}

export default ImagePopUp
