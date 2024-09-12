import React, { useState, useEffect } from "react";
import ProductCard from "../components/productCard";
import axios from "axios";
import "../components/style/homeStyle.css";


const Home = () => {
    const [gatos, setGatos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realiza la solicitud GET para obtener los gatos
        const response = await axios.get("http://localhost:3001/gatos");
        console.log("estos son los gatos", response.data);

        // Actualiza el estado con los datos obtenidos
        setGatos(response.data);
        console.log("estos son los gatos 2 ", gatos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Nuevo useEffect para depurar el estado de 'gatos'
  useEffect(() => {
    console.log("Gatos actualizados:", gatos);
  }, [gatos]);
  
  return (
    <div className="home-container">
        <h1 className='conocelos'>Conócelos...</h1>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5'>
        {gatos.map((gato, index) => (
            <ProductCard key={index} data={gato} />
          
        ))}
        </div>
    </div>
  )
}

export default Home