import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "./style/CustomerRegistration.css";
import ManagerNav from "../../comp/NavBar/ManagerNav";
import techImg from "../../Images/Tech.jpg";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import StoreKeeperNav from "../../comp/NavBar/StoreKeeperNav";
import TechnicianNav from "../../comp/NavBar/TechnicianNav";
import CashierNav from "../../comp/NavBar/CashierNav";

function clearData() {
  document.getElementById("address").value = "";
  document.getElementById("email").value = "";
  document.getElementById("first-name").value = "";
  document.getElementById("last-name").value = "";
  document.getElementById("nic").value = "";
  document.getElementById("phone").value = "";
}

export default function CustomerRegistration() {
  const authState = useContext(AuthContext);
  const handleRegisterCustomer = () => {
    var data = {
      address: document.getElementById("address").value,
      email: document.getElementById("email").value,
      firstname: document.getElementById("first-name").value,
      lastname: document.getElementById("last-name").value,
      nic: document.getElementById("nic").value,
      phone: document.getElementById("phone").value,
    };

    // Modify the URL and other details based on your backend API
    fetch("http://localhost:8080/api/customer/addcustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        alert("Customer registered successfully");
        clearData();
      } else {
        alert("Error registering customer");
      }
    });
  };

  return (
    <>
      {authState.role === "STOREKEEPER" ? (
        <StoreKeeperNav />
      ) : authState.role === "MANAGER" ? (
        <ManagerNav />
      ) : authState.role === "TECHNICIAN" ? (
        <TechnicianNav />
      ) : authState.role === "CASHIER" ? (
        <CashierNav />
      ) : (
        <></>
      )}
      <br />
      <Row className="form-row">
        <Col xl={4}>
          <img className="img-comp" src={techImg} alt="placeholder" />
        </Col>
        <Col xl={8}>
          <div className="card-comp">
            <div className="card-header">
              <h3 align="center">Customer Registration</h3>
            </div>
            <div className="card-body">
              <Row className="form-row">
                <Col xl={5}>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="first-name"
                    placeholder="First Name"
                    required
                  />
                </Col>
                <Col xl={1}></Col>
                <Col xl={5}>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="last-name"
                    placeholder="Last Name"
                    required
                  />
                </Col>
              </Row>
              <Row className="form-row">
                <Col xl={4}></Col>
                <Col xl={2}></Col>
              </Row>
              <Row className="form-row">
                <Col xl={5}>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    id="address"
                    placeholder="Address"
                    required
                  />
                </Col>
                <Col xl={1}></Col>
                <Col xl={5}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" id="email" placeholder="Email" />
                </Col>
              </Row>
              <Row className="form-row">
                <Col xl={5}>
                  <Form.Label>NIC</Form.Label>
                  <Form.Control type="text" id="nic" placeholder="NIC" />
                </Col>
                <Col xl={1}></Col>
                <Col xl={5}>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    id="phone"
                    placeholder="Phone"
                    required
                  />
                </Col>
              </Row>
              <Row className="form-row">
                <Col xl={5}></Col>
                <Col xl={2}>
                  <Form.Label></Form.Label>
                  <Button
                    className="row-btn"
                    variant="secondary"
                    onClick={handleRegisterCustomer}
                  >
                    Register
                  </Button>
                </Col>
                <Col xl={2}>
                  <Form.Label></Form.Label>
                  <Button
                    className="row-btn"
                    onClick={clearData}
                    variant="secondary"
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
