import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header.jsx";
import CartTab from "./cartTab.jsx";
import { useSelector } from "react-redux";

const Layout = () => {
  const statusTabCart = useSelector(store => store.cart.statusTab);
  return (
    <div className="bg-white-200">
      <main
        className={`w-[1200px] max-w-full m-auto p-5 transform transition-transform duration-500
        ${statusTabCart === false ? "" : "-translate-x-40"}`}
      >
        <Header />
        <Outlet />
      </main>
      <CartTab />
    </div>
  );
};

export default Layout;
