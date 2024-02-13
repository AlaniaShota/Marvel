import React from "react";
import { Search } from "./Search";
import { Link } from "react-router-dom";
import shopImg from "../../assets/shopping-cart.png";

import "./Header.scss";

export const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header-navigation-link">
        Marvel
      </Link>
      <div className="header-content">
        <Link to="/order" className="header-navigation-icon">
          <img src={shopImg} alt="" className="header-navigation-img" />
        </Link>
        <Search />
      </div>
    </header>
  );
};
