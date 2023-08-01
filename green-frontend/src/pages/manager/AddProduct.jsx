import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "./style/AddProduct.css";
import techImg from "../../Images/Tech.jpg";
import ManagerNav from "../../comp/NavBar/ManagerNav";

function clearData() {
  document.getElementById("product-code").value = "";
  document.getElementById("product-name").value = "";
  document.getElementById("product-des").value = "";
  document.getElementById("product-price").value = "";
}

export default function AddProduct() {
  const [validity, setValidity] = useState(false);

  const validateKeyDown = () => {
    var productCode = document.getElementById("product-code").value;
    if (productCode === "") {
      alert("Please enter a product code");
      return;
    } else {
      fetch(
        `http://localhost:8080/api/product/existsbycode?code=${productCode}`
      )
        .then((response) => response.json())
        .then((data) => data)
        .then((exists) => {
          if (exists) {
            setValidity(exists);
            console.log("validity", validity);
          } else {
            setValidity(exists);
            console.log("validity", validity);
          }
        });
    }
  };

  const handleProcessKeyDown = () => {
    var productCode = document.getElementById("product-code").value;
    fetch(`http://localhost:8080/api/product/existsbycode?code=${productCode}`)
      .then((response) => response.json())
      .then((data) => data)
      .then((exists) => {
        if (exists) {
          setValidity(exists);
        } else {
          setValidity(exists);
        }
      });
    if (validity) {
      alert("Product already exists");
    } else {
      var data = {
        productcode: document.getElementById("product-code").value,
        name: document.getElementById("product-name").value,
        description: document.getElementById("product-des").value,
        price: document.getElementById("product-price").value,
      };

      fetch("http://localhost:8080/api/product/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.status === 200) {
          alert("Product added successfully");
          window.location.reload();
        } else {
          alert("Error adding product");
        }
      });
    }
  };

  return (
    <>
      <ManagerNav />
      <br />
      <Row className="form-row">
        <Col xl={4}>
          <img className="img-comp" src={techImg} alt="placeholder" />
        </Col>
        <Col xl={8}>
          <div className="card-comp">
            <div className="card-header">
              <h3 align="center">Add Product Details</h3>
            </div>

            <div className="card-body">
              <Row className="form-row">
                <Col xl={4}>
                  <Form.Label>Product Code</Form.Label>
                  <Form.Control
                    type="text"
                    id="product-code"
                    placeholder="Product Code"
                  />
                </Col>
                <Col xl={2}>
                  <Form.Label></Form.Label>
                  <Button
                    className="row-btn"
                    onClick={validateKeyDown}
                    variant="secondary"
                  >
                    Validate
                  </Button>
                </Col>
              </Row>
              <Row className="form-row">
                <Col xl={5}>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="product-name"
                    placeholder="Product Name"
                  />
                </Col>
                <Col xl={1}></Col>
                <Col xl={5}>
                  <Form.Label>Product Description</Form.Label>
                  <Form.Control
                    type="text"
                    id="product-des"
                    placeholder="Product Description"
                  />
                </Col>
              </Row>
              <Row className="form-row">
                <Col xl={5}>
                  <Form.Label>Product Price</Form.Label>
                  <Form.Control
                    type="number"
                    id="product-price"
                    placeholder="Product Price"
                    required
                  />
                </Col>
                <Col xl={1}></Col>
                <Col xl={2}>
                  <Form.Label></Form.Label>

                  {!validity ? (
                    <Button
                      className="row-btn"
                      variant="secondary"
                      onClick={handleProcessKeyDown}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button disabled className="row-btn" variant="secondary">
                      Save
                    </Button>
                  )}
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
              <Row className="form-row">
                <Col xl={7}></Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
