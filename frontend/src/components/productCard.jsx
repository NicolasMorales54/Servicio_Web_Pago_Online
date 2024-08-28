import React, { useState } from "react";
import { Link } from "react-router-dom";
import iconCart from "../assets/carrito-de-compras.png";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../stores/cart";
import "../components/style/cartStyle.css";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { FaHeartCircleCheck } from "react-icons/fa6";

const ProductCard = (props) => {
  const { items } = useSelector((store) => store.cart);
  console.log(items);
  const { _id, nombre, sexo, image, imagen } = props.data;
  const dispatch = useDispatch();
  const [currentImage, setCurrentImage] = useState(image);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: _id, quantity: 1 }));
  };

  const handleMouseEnter = () => {
    setCurrentImage(imagen); // Cambia a la imagen alternativa al hacer hover
  };

  const handleMouseLeave = () => {
    setCurrentImage(image); // Vuelve a la imagen original al quitar el hover
  };

  const isInCart = items.some(item => item.productId === _id);

  return (
    <div
      className="bg-white p-5 rounded-xl shadow-sm"
      style={{
        // Borde azul claro
        boxShadow: "1px 4px 8px 4px rgba(13, 200, 255, 0.6)", // Sombra azul claro
        marginBottom: "20px",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={_id}>
        <img
          src={currentImage}
          alt=""
          className="w-full h-80 object-cover object-top transition-opacity duration-1000 ease-in-out"
          style={{ borderRadius: "10px" }}
        />
      </Link>
      <h3 className="text-2xl py-3 text-center font-medium name-cat">
        {nombre}
      </h3>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-medium disponibilidad">
            {sexo}
          </p>
        </div>
        {isInCart ? (
          <FaHeartCircleCheck className="text-green-600" style={{ fontSize: "30px" }} />
        ) : (
          <button
            className="p-2 rounded-md text-sm flex gap-2 "
            onClick={handleAddToCart}
          >
            <BsFillPatchPlusFill
              className="hover:text-green-600 transition-colors duration-300"
              style={{ color: "#0dc8ff", fontSize: "30px" }}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
