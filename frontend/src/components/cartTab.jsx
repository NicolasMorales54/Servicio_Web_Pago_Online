import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./cartItem";
import { toggleStatusTab } from "../stores/cart";
import axios from 'axios';

const CartTab = () => {
  const carts = useSelector((store) => store.cart.items);
  const statusTab = useSelector((store) => store.cart.statusTab);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    correo: "",
  }); // Estado para los datos del formulario

  useEffect(() => {
    const calculateTotalPrice = async () => {
      let total = 0;
      for (const item of carts) {
        try {
          const response = await fetch(
            `http://localhost:3000/gatos/${item.productId}`
          );
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
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, carts };
    try {
      const response = await axios.post('http://localhost:3000/registro', dataToSend);
      alert(response.data.successMessage);
      handleCloseModal();
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-80 h-full grid grid-rows-[60px_1fr_60px]
    transform transition-transform duration-500
    ${statusTab === false ? "translate-x-full" : ""}
    `}
      >
        <h2 className="p-5 text-white text-2xl">Lista de Intereses</h2>
        <div className="p-5">
          {carts.map((item, key) => (
            <CartItem key={key} data={item} />
          ))}
        </div>
        <div className="grid grid-cols-2">
          <button className="bg-black text-white" onClick={handleCloseTabCart}>
            CERRAR
          </button>
          <button className="bg-amber-600 text-white" onClick={handleOpenModal}>
            ENVIAR SOLICITUD
          </button>{" "}
        </div>
      </div>

      {/* Contenido del componente */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Formulario de Adopción</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">
                Nombre:
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="border p-2 w-full mt-1"
                  required
                />
              </label>
              <label className="block mb-2">
                Apellido:
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="border p-2 w-full mt-1"
                  required
                />
              </label>
              <label className="block mb-2">
                Teléfono:
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="border p-2 w-full mt-1"
                  required
                />
              </label>
              <label className="block mb-4">
                Correo Electrónico:
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  className="border p-2 w-full mt-1"
                  required
                />
              </label>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 text-white px-4 py-2 rounded"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CartTab;
