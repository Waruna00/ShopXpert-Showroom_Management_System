import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../Images/green-logo.png";

function StoreKeeperNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="NavBar nav d-flex justify-content-around justify-content-lg-between">
      <div className="ms-md-5">
        <Link to="/dashboard">
          <Image src={logo} alt="logo" className="logo" />
        </Link>
      </div>
      <div className="btn_div">
        <NavDropdown title="Order" id="basic-nav-dropdown">
          <NavDropdown.Item href="/CreateOrder">Create Order</NavDropdown.Item>
          <NavDropdown.Item href="/ViewOrder">View Order</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Inventory" id="basic-nav-dropdown">
          <NavDropdown.Item href="/StockInward">Stock Inward</NavDropdown.Item>
          <NavDropdown.Item href="/StockOutward">
            Stock Outward
          </NavDropdown.Item>
          <NavDropdown.Item href="/InventoryTracker">
            Inventory Tracker
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Finance" id="basic-nav-dropdown">
          <NavDropdown.Item disabled href="/Dayend">
            Dayend
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Account" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">User Details</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.1">
            Change Password
          </NavDropdown.Item>
        </NavDropdown>
        {localStorage.getItem("token") ? (
          <Button
            className="me-5 nav_btn"
            onClick={() => {
              // TODO: have this delete cookie on server side
              fetch("/api/auth/logout").then((response) => {
                if (response.status === 200) {
                  localStorage.clear();
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
              localStorage = localStorage.clear();
              //navigate("/");
            }}
          >
            Login
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default StoreKeeperNav;
