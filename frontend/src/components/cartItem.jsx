import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeQuantity, deleteFromCart } from "../stores/cart";
import { TiDelete } from "react-icons/ti";

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

  console.log(details);
  
  const handleDeleteItem = () => {
    dispatch(deleteFromCart({ productId }));
  };

  return (
    <div className="flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-5 rounded-md">
      <img src={details.image} alt="" className="w-16" />
      <h3 className="">{details.nombre}</h3>
      <div className="w-20 flex justify-between gap-2">
        <button
          className="bg-gray-200 rounded-full w-6 h-6 text-cyan-600"
          style={{ marginLeft: "80px" }}
          onClick={handleDeleteItem}
        >
          <TiDelete style={{ fontSize: "30px", marginLeft: "-3.2px", marginTop: "-2.5px" }} />
        </button>
      </div>

      <div className="flex justify-between items-center"></div>
    </div>
  );
};

export default CartItem;
