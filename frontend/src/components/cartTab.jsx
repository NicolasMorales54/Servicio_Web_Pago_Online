import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./cartItem";
import { toggleStatusTab } from "../stores/cart";

const CartTab = () => {
  const carts = useSelector((store) => store.cart.items);
  const statusTab = useSelector((store) => store.cart.statusTab);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = async () => {
      let total = 0;
      for (const item of carts) {
        try {
          const response = await fetch(`http://localhost:3000/gatos/${item.productId}`);
          const data = await response.json();
          total += data.precio * item.quantity;
        } catch (err) {
          console.error(err);
        }
      }
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [carts]);

  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  }
  return (
    <div className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px]
    transform transition-transform duration-500
    ${statusTab === false ? "translate-x-full" : ""}
    `}>
      <h2 className="p-5 text-white text-2xl">Carrito</h2>
      <div className="p-5">
        {carts.map((item, key) => (
          <CartItem key={key} data={item} />
        ))}
      </div>
      <div className="p-5 text-white">
        <p className="text-xl">Valor Total: ${totalPrice.toFixed(2)}</p>
      </div>
      <div className="grid grid-cols-2">
        <button className="bg-black text-white" onClick={handleCloseTabCart}>CLOSE</button>
        <button className="bg-amber-600 text-white">CHECKOUT</button>
      </div>
    </div>
  );
};

export default CartTab;
