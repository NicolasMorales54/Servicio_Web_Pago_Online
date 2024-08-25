import { set } from "mongoose";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../stores/cart";

const Details = () => {
  const { items } = useSelector((store) => store.cart);
  console.log(items);
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:3000/gatos/${id}`)
      .then((res) => res.json())
      .then((data) => setDetails(data))
      .catch((err) => console.log(err));
  }, []);

  const handleMinusQuantity = () => {
    setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
  };

  const handlePlusQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: details._id, quantity: quantity }));
  };

  return (
    <div>
      <h2 className="text-3xl text-center">Detalles del gatito</h2>
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <img src={details.image} alt="" className="w-full" />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl uppercase font-bold">{details.nombre}</h1>
          <p className="font-bold text-3xl">{details.edad}</p>

          <div className="flex gap-5">
            <div className="flex gap-2 justify-center items-center">
              <button
                className="bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center"
                onClick={handleMinusQuantity}
              >
                -
              </button>
              <span className="bg-gray-200 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center">
                {quantity}
              </span>
              <button
                className="bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center"
                onClick={handlePlusQuantity}
              >
                +
              </button>
            </div>
            <button
              className="bg-slate-900 text-white px-7 py-3 rounded-xl shadow-2xl"
              onClick={handleAddToCart}
            >
              Comprar
            </button>
          </div>
          <p className="font-bold text-3xl">{details.raza}</p>
          <p className="font-bold text-3xl">{details.color}</p>
          <p className="font-bold text-3xl">{details.tamano}</p>
          <p className="font-bold text-3xl">{details.peso}</p>
          <p className="font-bold text-3xl">{details.sexo}</p>
          <p className="font-bold text-3xl">
            {details.disponible ? "Disponible" : "No Disponible"}
          </p>
          <p className="font-bold text-3xl">
            {details.vacunado ? "Vacunado" : "No Vacunado"}
          </p>
          <p className="font-bold text-3xl">{details.precio}</p>
          <p className="font-bold text-3xl">
            {details.esterilizado ? "Esterilizado" : "No Esterilizado"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
