import { set } from "mongoose";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../stores/cart";
import "../components/style/detallesStyle.css";
import { FaHeartCircleCheck } from "react-icons/fa6";

const Details = () => {
  const { items } = useSelector((store) => store.cart);
  console.log(items);
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:3000/gatos/${id}`)
      .then((res) => res.json())
      .then((data) => setDetails(data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: details._id, quantity: 1 }));
  };

  // Verifica si el gatito ya está en el carrito
  const isInCart = items.find((item) => item.productId === details._id);

  return (
    <div>
      <h2 className="text-3xl text-center detalles">Detalles del gatito</h2>
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <img
            src={details.image}
            alt=""
            className=""
            style={{ borderRadius: "10px", height: "500px", width: "350px", marginLeft: "100px" }}
          />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl uppercase font-bold nombre-gato">
            {details.nombre}
          </h1>
          <p className="descripcion-gato">{details.descripcion}</p>
          <div className="border-t border-gray-300 pt-5 datos-gatos">
            <div className="flex justify-between">
              <span className="font-bold text-xl">Raza:</span>
              <span className="text-xl">{details.raza}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-xl">Color:</span>
              <span className="text-xl">{details.color}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-xl">Peso:</span>
              <span className="text-xl">{details.peso}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-xl">Sexo:</span>
              <span className="text-xl">{details.sexo}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-xl">Edad:</span>
              <span className="text-xl">{details.edad}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-xl">Disponible:</span>
              <span className="text-xl">
                {details.disponibilidad ? "Si" : "No"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-xl">Vacunado:</span>
              <span className="text-xl">
                {details.vacunado ? "Si" : "No"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-xl">Esterilizado:</span>
              <span className="text-xl">
                {details.esterilizado ? "Si" : "No"}
              </span>
            </div>
          </div>
          <div className="flex gap-5">
            {isInCart ? (
              <p className="text-green-500 font-bold text-xl flex items-center">
                <FaHeartCircleCheck className="mr-2" /> Ya está en la lista de
                interés
              </p>
            ) : (
              <button
                className="bg-slate-900 text-white px-7 py-3 rounded-xl shadow-2xl"
                onClick={handleAddToCart}
              >
                Me Interesa
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
