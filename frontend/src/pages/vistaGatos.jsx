import React, { useState, useEffect } from "react";
import axios from "axios";

const VistaGatos = () => {
  const [gatos, setGatos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realiza la solicitud GET para obtener los gatos
        const response = await axios.get("http://localhost:3001/gatos");
        console.log("estos son los gatos", response.data);

        // Actualiza el estado con los datos obtenidos
        setGatos(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1
        style={{
          fontSize: "1.875rem" /* text-3xl */,
          margin: "1.25rem 0" /* my-5 */,
        }}
      >
        Lista de Gatos
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
      {gatos.map((gato, index) => (
            <ProductCard key={index} data={gato} />
          
        ))}
      </div>
    </div>
  );
};

export default VistaGatos;
