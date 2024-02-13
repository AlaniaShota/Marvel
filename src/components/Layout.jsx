import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./navigation";

export const Layout = () => {
  return (
    <>
      <Header />
      <span className="container">
        <Outlet />
      </span>
      <p className="footerText">
        Data provided by Marvel.
        <span className="footerMarvel">© 2024 MARVEL</span>
      </p>
    </>
  );
};
