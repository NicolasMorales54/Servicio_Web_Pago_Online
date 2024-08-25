import React from 'react'
import videoBg from '../assets/3969596-uhd_3840_2160_25fps.mp4'
import '../components/style/prin.css'

const princ = () => {
  return (
    <div className="main">
        <video src={videoBg} autoPlay loop muted />
    </div>
  )
}

export default princ;