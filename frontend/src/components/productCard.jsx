import React from "react";
import { Link } from "react-router-dom";
import iconCart from "../assets/carrito-de-compras.png";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../stores/cart";

const ProductCard = (props) => {
    const { items } = useSelector((store) => store.cart);
    console.log(items);
  const { _id, nombre, edad, disponibilidad, image } = props.data;
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart({ productId: _id, quantity: 1 }));
  };
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <Link to={_id}>
        <img
          src={image}
          alt=""
          className="w-full h-80 objet-cover object-top drop-shadow-[0_80px_30px_#0007]"
        />
      </Link>
      <h3 className="text-2xl py-3 text-center font-medium">{nombre}</h3>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-medium">{edad}</p>
          <p className="text-2xl font-medium">
            {disponibilidad ? "Disponible" : "No Disponible"}
          </p>
        </div>
        <button
          className="bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2"
          onClick={handleAddToCart}
        >
          <img src={iconCart} alt="" className="w-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
