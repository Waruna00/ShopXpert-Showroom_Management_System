import React from "react";
import "./style.css";
import { Button } from "react-bootstrap";
import logo from "../../Images/green-logo.png";

const NotFoundPage = () => {
  return (
    <div className="bg-purple">
      <div className="stars">
        <div className="custom-navbar">
          <div className="brand-logo">
            <img src={logo} alt="logo" className="logo" />
          </div>
        </div>
        <div className="central-body">
          <img
            className="image-404"
            src="http://salehriaz.com/404Page/img/404.svg"
            width="300px"
            alt="404 Error"
          />
          <Button
            variant="outline-light"
            className="btn-go-home"
            onClick={() => window.location.replace("/")}
          >
            GO BACK HOME
          </Button>
        </div>
        <div className="objects">
          <img
            className="object_rocket"
            src="http://salehriaz.com/404Page/img/rocket.svg"
            width="40px"
            alt="Rocket"
          />
          <div className="earth-moon">
            <img
              className="object_earth"
              src="http://salehriaz.com/404Page/img/earth.svg"
              width="100px"
              alt="Earth"
            />
            <img
              className="object_moon"
              src="http://salehriaz.com/404Page/img/moon.svg"
              width="80px"
              alt="Moon"
            />
          </div>
          <div className="box_astronaut">
            <img
              className="object_astronaut"
              src="http://salehriaz.com/404Page/img/astronaut.svg"
              width="140px"
              alt="Astronaut"
            />
          </div>
        </div>
        <div className="glowing_stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
