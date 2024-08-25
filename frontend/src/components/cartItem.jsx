import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeQuantity } from "../stores/cart";

const CartItem = (props) => {
  const { productId, quantity } = props.data;
  const [details, setDetails] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:3000/gatos/${productId}`)
      .then((res) => res.json())
      .then((data) => setDetails(data))
      .catch((err) => console.log(err));
  }, [productId]);

  const handleMinusQuantity = () => {
    dispatch(
      changeQuantity({
        productId: productId,
        quantity: quantity - 1,
      })
    );
  };
  const handlePlusQuantity = () => {
    dispatch(
      changeQuantity({
        productId: productId,
        quantity: quantity + 1,
      })
    );
  };
  console.log(details);

  return (
    <div className="flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-5 rounded-md">
      <img src={details.image} alt="" className="w-12" />
      <h3>{details.nombre}</h3>
      <p>{details.precio * quantity}</p>
      <div className="w-20 flex justify-between gap-2">
        <button
          className="bg-gray-200 rounded-full w-6 h-6 text-cyan-600"
          onClick={handleMinusQuantity}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="bg-gray-200 rounded-full w-6 h-6 text-cyan-600"
          onClick={handlePlusQuantity}
        >
          +
        </button>
      </div>

      <div className="flex justify-between items-center">
      </div>
    </div>
  );
};

export default CartItem;
