import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import logo from "../../Images/green-logo.png";
import { useUser } from "../../UserProvider";
import jwt_decode from "jwt-decode";

function NavBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useUser();
  const [authorities, setAuthorities] = useState(null);

  useEffect(() => {
    if (user && user.jwt) {
      const decodedJwt = jwt_decode(user.jwt);
      setAuthorities(decodedJwt.authorities);
    }
  }, [user, user.jwt]);

  console.log("user", useUser());

  return (
    <div className="NavBar nav d-flex justify-content-around justify-content-lg-between">
      <div className="ms-md-5">
        <Link to="/">
          <Image src={logo} alt="logo" className="logo" />
        </Link>
      </div>
      <div className="btn_div">
        <NavDropdown title="Sale" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Cash Sale</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Sales Tracker</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.4">Price Tracker</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Inventory" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Stock Inward</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Stock Outward</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">
            Inventory Tracker
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Finance" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Dayend</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Account" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">User Details</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.1">
            Change Password
          </NavDropdown.Item>
        </NavDropdown>
        {user && user.jwt ? (
          <Button
            className="me-5 nav_btn"
            onClick={() => {
              // TODO: have this delete cookie on server side
              fetch("/api/auth/logout").then((response) => {
                if (response.status === 200) {
                  user.setJwt(null);
                  navigate("/");
                }
              });
            }}
          >
            Logout
          </Button>
        ) : pathname !== "/login" ? (
          <Button
            variant="primary"
            className="me-5 nav_btn"
            onClick={() => {
              navigate("/");
            }}
          >
            Login
          </Button>
        ) : (
          <></>
        )}

        {authorities &&
        authorities.filter((auth) => auth === "ROLE_INSTRUCTOR").length > 0 ? (
          <Link
            className="ms-5 ms-md-5 me-md-5 link"
            to="/instructors/dashboard"
          >
            Instructors
          </Link>
        ) : (
          <></>
        )}

        {user && user.jwt ? (
          <Button
            className="me-5 nav_btn"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default NavBar;
