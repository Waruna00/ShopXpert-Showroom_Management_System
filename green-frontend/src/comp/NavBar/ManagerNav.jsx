import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Image, Nav } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavSeparator from "react-bootstrap/NavDropdown";
import logo from "../../Images/green-logo.png";
import { AuthContext } from "../../Context/AuthContext";

function ManagerNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { token, logout } = useContext(AuthContext);

  return (
    <div className="NavBar nav d-flex justify-content-around justify-content-lg-between">
      <div className="ms-md-5">
        <Link to="/">
          <Image src={logo} alt="logo" className="logo" />
        </Link>
      </div>
      <div className="btn_div">
        <NavDropdown title="Sale" id="basic-nav-dropdown">
          <NavDropdown.Item href="/CreateSale">Cash Sale</NavDropdown.Item>
          <NavDropdown.Item disabled href="#action/3.2">
            Sales Tracker
          </NavDropdown.Item>
          <NavDropdown.Item disabled href="#action/3.4">
            Price Tracker
          </NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title="Inventory" id="basic-nav-dropdown">
          <NavDropdown.Item href="/ManageOrder">Manage Order</NavDropdown.Item>
          <NavDropdown.Item href="/InventoryTracker">
            Inventory Tracker
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/AddProduct">Add Product</NavDropdown.Item>
          <NavDropdown.Item href="/UpdateProduct">
            Update Product
          </NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title="" id="basic-nav-dropdown">
          <NavDropdown.Item href="/Dayend">Dayend</NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title="Account" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">User Details</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.1">
            Change Password
          </NavDropdown.Item>
        </NavDropdown>

        {token ? (
          <Button
            className="me-5 nav_btn"
            onClick={() => {
              // TODO: have this delete cookie on server side
              fetch("/api/auth/logout").then((response) => {
                if (response.status === 200) {
                  logout();
                  navigate("/");
                  window.location.reload();
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
              logout();
              navigate("/");
              window.location.reload();
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

export default ManagerNav;
