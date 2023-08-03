import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "./style/CustomerRegistration.css";
import techImg from "../../Images/Tech.jpg";
import ManagerNav from "../../comp/NavBar/ManagerNav";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import StoreKeeperNav from "../../comp/NavBar/StoreKeeperNav";
import TechnicianNav from "../../comp/NavBar/TechnicianNav";
import CashierNav from "../../comp/NavBar/CashierNav";

export default function ManageCustomer() {
  const authState = useContext(AuthContext);
  const [customer, setCustomer] = useState({
    code: "",
    address: "",
    email: "",
    first_name: "",
    last_name: "",
    nic: "",
    phone: "",
  });

  const clearData = () => {
    setCustomer({
      code: "",
      address: "",
      email: "",
      first_name: "",
      last_name: "",
      nic: "",
      phone: "",
    });
  };

  // Function to handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your validation logic here
    // Check if required fields are filled
    if (
      !customer.code ||
      !customer.first_name ||
      !customer.last_name ||
      !customer.phone
    ) {
      alert(
        "Please fill in required fields: Code, First Name, Last Name and Phone"
      );
      return;
    }
    // Add logic to handle API call to update customer details
    // For example:
    fetch("http://localhost:8080/api/customer/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response accordingly
        console.log(data);
        alert("Customer details updated successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("Error updating customer details.");
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
      {/* Your UI and form elements */}
      <Row className="form-row">
        <Col xl={4}>
          <img className="img-comp" src={techImg} alt="placeholder" />
        </Col>
        <Col xl={8}>
          <div className="card-comp">
            <div className="card-header">
              <h3 align="center">Update Customer Details</h3>
            </div>

            <div className="card-body">
              <Form onSubmit={handleSubmit}>
                <Row className="form-row">
                  <Col xl={4}>
                    <Form.Label>Customer Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="code"
                      value={customer.code}
                      onChange={handleInputChange}
                      placeholder="Customer Code"
                    />
                  </Col>
                  <Col xl={4}>
                    <Form.Label>NIC</Form.Label>
                    <Form.Control
                      type="text"
                      name="nic"
                      value={customer.nic}
                      onChange={handleInputChange}
                      placeholder="NIC (Optional)"
                    />
                  </Col>
                </Row>
                {/* Add other rows and form fields for other attributes */}
                <Row className="form-row">
                  {/* Add other fields and buttons similar to the UpdateProduct.jsx */}
                  {/* Example: */}
                  <Col xl={4}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      value={customer.first_name}
                      onChange={handleInputChange}
                      placeholder="First Name"
                    />
                  </Col>
                  <Col xl={4}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="last_name"
                      value={customer.last_name}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                    />
                  </Col>
                </Row>
                <Row className="form-row">
                  <Col xl={4}>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={customer.phone}
                      onChange={handleInputChange}
                      placeholder="Phone"
                    />
                  </Col>
                  <Col xl={4}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={customer.email}
                      onChange={handleInputChange}
                      placeholder="Email (Optional)"
                    />
                  </Col>
                </Row>

                <Row className="form-row">
                  <Col xl={4}>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={customer.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                    />
                  </Col>
                </Row>
                <Row className="form-row">
                  <Col xl={4}>
                    <Button
                      type="submit"
                      className="row-btn"
                      variant="secondary"
                    >
                      Save
                    </Button>
                  </Col>
                  <Col xl={4}>
                    <Button
                      type="button"
                      onClick={clearData}
                      variant="secondary"
                      className="row-btn"
                    >
                      Clear
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
