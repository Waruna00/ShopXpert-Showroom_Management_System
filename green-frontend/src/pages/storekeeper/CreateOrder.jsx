import React, { useEffect } from "react";
import { useState } from "react";
import NavBar from "../../comp/NavBar";
import { Row, Col, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TableRows({ rows, tableRowRemove }) {
  return rows.map((rowsData, index) => {
    var { itemCode, itemName, itemDes, qty } = rowsData;

    return (
      <tr key={index}>
        <td>
          <Form.Label>{index + 1}</Form.Label>
        </td>
        <td>
          <Form.Label>{itemCode}</Form.Label>
        </td>
        <td>
          <Form.Label>{itemName}</Form.Label>
        </td>
        <td>
          <Form.Label>{itemDes}</Form.Label>
        </td>
        <td>
          <Form.Label>{qty}</Form.Label>
        </td>
        <td>
          <Button
            className="row-btn"
            variant="danger"
            onClick={() => tableRowRemove(index)}
          >
            Remove
          </Button>
        </td>
      </tr>
    );
  });
}

function setData(data) {
  document.getElementById("item-name").value = data.name;
  document.getElementById("item-des").value = data.description;
  document.getElementById("item-price").value = data.price;
}

export default function CreateOrder() {
  const [updated, setUpdated] = useState("");
  const [orderDetails, setOrderDetails] = useState({});

  const handleKeyDownItemCode = (event) => {
    if (event.key === "Enter") {
      setUpdated(event.target.value);
      fetch("http://localhost:8080/api/product/get", {
        method: "POST",
        body: JSON.stringify({ productcode: event.target.value }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error(error));
      document.getElementById("item-qty").focus();
    }
  };
  const [rows, initRow] = useState([]);

  function clearData() {
    document.getElementById("item-code").value = "";
    document.getElementById("item-name").value = "";
    document.getElementById("item-des").value = "";
    document.getElementById("item-qty").value = "";
  }

  const addRowTable = () => {
    const data = {
      itemCode: document.getElementById("item-code").value,
      itemName: document.getElementById("item-name").value,
      itemDes: document.getElementById("item-des").value,
      qty: parseInt(document.getElementById("item-qty").value),
    };

    const existingOrderIndex = rows.findIndex(
      (rows) => rows.itemCode === data.itemCode
    );
    if (existingOrderIndex !== -1) {
      const updatedOrders = [...rows];
      updatedOrders[existingOrderIndex].qty += parseInt(data.qty);
      initRow(updatedOrders);
    } else {
      initRow([...rows, data]);
    }
    clearData();
    console.log(rows);
  };
  const tableRowRemove = (index) => {
    const dataRow = [...rows];
    dataRow.splice(index, 1);
    initRow(dataRow);
  };

  function sendOrderRequest() {
    const data = {
      date: new Date().toJSON().slice(0, 10),
      orderStatus: "Pending",
      // Add any other necessary data here
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    return fetch("http://localhost:8080/api/order/add", requestOptions)
      .then((response) => response.json())
      .catch((error) => {
        // Handle any errors here
        console.error(error);
      });
  }

  function handleSaveKeyDown() {
    sendOrderRequest()
      .then((orderDetails) => {
        console.log(orderDetails.orderId);
        rows.forEach((row) => {
          const data = {
            orderid: orderDetails.orderId,
            productcode: row.itemCode,
            quantity: row.qty,
          };
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          };

          fetch(
            "http://localhost:8080/api/order/addOrderProduct",
            requestOptions
          )
            .then((response) => response.json())
            .then((responseData) => {
              console.log(responseData);
            })
            .catch((error) => {
              console.error(error);
            });
        });
        initRow([]);
        clearData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <NavBar />
      <div className="main-page">
        <div>
          <label className="h-txt-1">STOCK ORDER REQUEST</label>
        </div>
        <div className="card-comp" id="card-1">
          <Row style={{ width: "100%" }}>
            <Col xl={4}>
              <Form.Label>Item Code</Form.Label>
            </Col>
            <Col xl={2}>
              <Form.Label>Item Name</Form.Label>
            </Col>
            <Col xl={4}>
              <Form.Label>Item Description</Form.Label>
            </Col>
            <Col xl={1}>
              <Form.Label>Quantity</Form.Label>
            </Col>
          </Row>

          <Row>
            <Col xl={3}>
              <Form.Control
                type="text"
                id="item-code"
                placeholder="Item Code"
                onKeyDown={handleKeyDownItemCode}
              />
            </Col>
            <Col xl={1}>
              <Button className="row-btn" variant="secondary">
                Find
              </Button>
            </Col>

            <Col xl={2}>
              <Form.Control
                type="text"
                edita
                id="item-name"
                placeholder="Item Name"
                readOnly
              />
            </Col>
            <Col xl={4}>
              <Form.Control
                type="text"
                id="item-des"
                placeholder="Description"
                readOnly
              />
            </Col>
            <Col xl={1}>
              <Form.Control
                type="text"
                id="item-qty"
                placeholder="Quantity"
                //onKeyDown={}
              />
            </Col>
            <Col xl={1}>
              <Button
                className="row-btn"
                variant="secondary"
                onClick={addRowTable}
                id="add-btn"
              >
                Add
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              <TableRows rows={rows} tableRowRemove={tableRowRemove} />
            </tbody>
          </table>
        </div>
        <div id="tot-price">
          <Row style={{ marginTop: "15px" }}>
            <Col xl={8}></Col>
            <Col xl={2}>
              <Button
                className="row-btn"
                variant="secondary"
                onClick={clearData}
              >
                Clear
              </Button>
            </Col>
            <Col xl={2}>
              <Button
                className="row-btn"
                variant="secondary"
                onClick={handleSaveKeyDown}
              >
                Save
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
