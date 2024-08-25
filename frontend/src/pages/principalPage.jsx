import React from 'react'
import videoBg from "../assets/3969596-uhd_3840_2160_25fps.mp4"
import '../components/style/principalstyle.css'
import { useNavigate } from 'react-router-dom';

const principalPage = () => {
    const navigate = useNavigate();

  const handleAdoptClick = () => {
    // Redirige a la página de adopción
    navigate('/'); // Cambia '/adoptar' por la ruta que desees
  };
  return (
    <div className='main'>
        <div className="overlay"></div>
        <video src={videoBg} autoPlay loop muted/>
        <div className='content'>
            <h1 className='tit'>"Hasta que no hayas amado a un animal, una parte de tu alma permanecerá dormida"</h1>
            <br></br>
            <p className='titdos'>Date una oportunidad y dales una oportunidad</p>
            <br></br>
            <button className='btn-adop' onClick={handleAdoptClick}>¡Quiero Adoptar!</button>
        </div>
    </div>
  )
}

export default principalPage