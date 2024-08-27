import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import iconCart from "../assets/carrito-de-compras.png";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatusTab } from "../stores/cart";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import iconH from "../assets/corazon.png";

const Header = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const { items } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    let total = 0;
    items.forEach((item) => (total += item.quantity));
    setTotalQuantity(total);
  }, [items]);
  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab());
  };

  return (
    <header
      className="flex justify-between items-center m-5"
      
    >
      {/* Envuelve el ícono de flecha en un Link */}
      <Link to="/">
        <FaArrowAltCircleLeft
          className="text-3xl"
          style={{ color: "#0dc8ff" }}
        />
      </Link>
      <div
        className="w-10 h-10 bg-gray-100 rounded-full
            flex justify-center items-center relative"
        onClick={handleOpenTabCart}
      >
        <img src={iconH} alt="" className="w-8" />
        <span
          className="absolute top-2/3 right-1/2 bg-red-500 text-white text-sm
                w-5 h-5 rounded-full flex justify-center items-center"
        >
          {totalQuantity}
        </span>
      </div>
    </header>
  );
};

export default Header;
