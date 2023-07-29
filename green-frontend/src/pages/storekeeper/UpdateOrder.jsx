import React, { useEffect } from "react";
import { useState } from "react";
import NavBar from "../../comp/NavBar";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation, useNavigate } from "react-router-dom"; 

function TableRows({ rows }) {
  return rows.map((rowsData, index) => {
    var { product_code, product_name, product_description, quantity } =
      rowsData;

    return (
      <tr key={index}>
        <td>
          <Form.Label>{index + 1}</Form.Label>
        </td>
        <td>
          <Form.Label>{product_code}</Form.Label>
        </td>
        <td>
          <Form.Label>{product_name}</Form.Label>
        </td>
        <td>
          <Form.Label>{product_description}</Form.Label>
        </td>
        <td>
          <Form.Label>{quantity}</Form.Label>
        </td>
      </tr>
    );
  });
}

export default function UpdateOrder() {
  const [orderDetails, setOrderDetails] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  function cancelOrder() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: orderDetails.order_no,
        status: "Canceled by user",
      }),
    };
    fetch("http://localhost:8080/api/order/statusupdate", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.getElementById("cancel-btn").disabled = true;
        document.getElementById("card-1").style.backgroundColor = "#ffcccb";
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderid: "1" }),
    };
    fetch(
      "http://localhost:8080/api/order/findOrderProductsById",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const updatedOrderDetails = data.map((order) => ({
          product_code: order.product.product_code,
          product_name: order.product.name,
          product_description: order.product.description,
          quantity: order.quantity,
        }));
        setOrderItems(updatedOrderDetails);
        setOrderDetails({
          order_no: location.state.order_no,
          order_date: location.state.date,
          order_status: location.state.status,
          create_by: location.state.created_by,
        });

        console.log("status : ", location.state.status);
        if (location.state.status === "Pending") {
          document.getElementById("cancel-btn").disabled = false;
          console.log("true");
        } else if (
          location.state.status === "Canceled by user" ||
          location.state.status === "Canceled by admin"
        ) {
          document.getElementById("card-1").style.backgroundColor = "#ffcccb";
          document.getElementById("cancel-btn").disabled = true;
          console.log("false");
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <NavBar />
      <div className="main-page">
        <div>
          <label className="h-txt-1">STOCK ORDER DETAILS</label>
        </div>
        <div className="card-comp" id="card-1">
          <Row style={{ width: "100%" }}>
            <Col xl={2}>
              <Form.Label>Order No : {orderDetails.order_no}</Form.Label>
            </Col>
            <Col xl={2}>
              <Form.Label>Date : {orderDetails.order_date}</Form.Label>
            </Col>
            <Col xl={3}>
              <Form.Label>
                Order Status : {orderDetails.order_status}
              </Form.Label>
            </Col>
            <Col xl={2}>
              <Form.Label>Created By : {orderDetails.create_by}</Form.Label>
            </Col>
            <Col xl={3}>
              <Button
                className="row-btn"
                variant="danger"
                id="cancel-btn"
                onClick={cancelOrder}
              >
                CANCEL ORDER
              </Button>
            </Col>
          </Row>
        </div>

        <div
          className="card-comp scroll"
          id="card-2"
          style={{ height: "40vh" }}
        >
          <Row>
            <label className="h-txt-2">Item List</label>
          </Row>
          <div className="ruler" />
          <table id="tbl" className="table table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Item Description</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <TableRows rows={orderItems} />
            </tbody>
          </table>
        </div>
        <div id="tot-price">
          <Row style={{ marginTop: "15px" }}>
            <Col xl={9}></Col>
            <Col xl={3}>
              <Button
                className="row-btn"
                variant="secondary"
                onClick={() => navigate("/ViewOrder")}
              >
                Back
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
