import "./banner.css";
import React from "react";
import { NavLink } from "react-router-dom";
import Banner_Product from "../../assets/images/Banner_Product.png";

function Banner(props) {
  return (
    <div className="banner">
      <img src={Banner_Product} alt="image_product" />
      <div className="banner_title">
        <h1>Nike Jordan</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora
          assumenda, fugit, ullam et cupiditate quidem dolorem mollitia tenetur
          maxime.
        </p>
        <NavLink to="/products">
          <div className="btn__buyProduct">MUA NGAY</div>
        </NavLink>
      </div>

   
    </div>
  );
}

export default Banner;
