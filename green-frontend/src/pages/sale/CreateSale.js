import React from "react";
import { useState } from "react";
import NavBar from "../../comp/NavBar";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

var NetTotal = 0.0;

function TableRows({ rows, tableRowRemove }) {
  console.log(rows);
  return rows.map((rowsData, index) => {
    var { itemCode, itemName, itemDes, price, qty, amount } = rowsData;

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
          <Form.Label>{price}</Form.Label>
        </td>
        <td>
          <Form.Label>{qty}</Form.Label>
        </td>
        <td>
          <Form.Label>{amount}</Form.Label>
        </td>
        <td>
          <Button className="row-btn" variant="secondary">
            Serial
          </Button>
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

export default function CreateSale() {
  const [updated, setUpdated] = useState("");

  const handleKeyDownQty = (event) => {
    if (event.key === "Enter") {
      var qty = event.target.value;
      var price = document.getElementById("item-price").value;
      var amount = qty * price * 1.0;
      document.getElementById("item-amount").value = amount;
    }
  };
  const handleKeyDownItemCode = (event) => {
    if (event.key === "Enter") {
      setUpdated(event.target.value);
      console.log(updated);

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

  const addRowTable = () => {
    var amount = document.getElementById("item-amount").value;
    NetTotal = parseFloat(NetTotal) + parseFloat(amount);
    document.getElementById("net-total").value = NetTotal;
    const data = {
      itemCode: document.getElementById("item-code").value,
      itemName: document.getElementById("item-name").value,
      itemDes: document.getElementById("item-des").value,
      qty: document.getElementById("item-qty").value,
      price: document.getElementById("item-price").value,
      amount: document.getElementById("item-amount").value,
    };
    initRow([...rows, data]);
    console.log(rows);
  };
  const tableRowRemove = (index) => {
    const dataRow = [...rows];
    dataRow.splice(index, 1);
    var amount =
      document.getElementsByTagName("tr")[index + 1].cells[6].childNodes[0]
        .textContent;
    console.log(amount);
    NetTotal = parseFloat(NetTotal) - parseFloat(amount);

    document.getElementById("net-total").value = NetTotal;
    initRow(dataRow);
  };

  return (
    <>
      <NavBar />
      <div className="main-page">
        <div>
          <label className="h-txt-1">INVOICE NO : CS-DDMMYY-XXXXX</label>
        </div>
        <div className="card-comp" id="card-1">
          <Row style={{ width: "100%" }}>
            <Col xl={3}>
              <Form.Label>Item Code</Form.Label>
            </Col>
            <Col xl={2}>
              <Form.Label>Item Name</Form.Label>
            </Col>
            <Col xl={2}>
              <Form.Label>Description</Form.Label>
            </Col>
            <Col xl={1}>
              <Form.Label>Item Price</Form.Label>
            </Col>
            <Col xl={1}>
              <Form.Label>Quantity</Form.Label>
            </Col>
            <Col xl={2}>
              <Form.Label>Amount</Form.Label>
            </Col>
          </Row>

          <Row>
            <Col xl={2}>
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
            <Col xl={2}>
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
                id="item-price"
                placeholder="Price"
                readOnly
              />
            </Col>
            <Col xl={1}>
              <Form.Control
                type="text"
                id="item-qty"
                placeholder="Quantity"
                onKeyDown={handleKeyDownQty}
              />
            </Col>
            <Col xl={2}>
              <Form.Control
                type="text"
                id="item-amount"
                placeholder="Amount"
                readOnly
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

        <div className="card-comp scroll" id="card-2">
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
                <th>Description</th>
                <th>Item Price</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <TableRows rows={rows} tableRowRemove={tableRowRemove} />
            </tbody>
          </table>
        </div>
        <div id="tot-price">
          <Row>
            <Col xl={8}></Col>
            <Col xl={2}>
              <label className="h-txt-2">Total Amount</label>
            </Col>
            <Col xl={2}>
              <Form.Control
                type="text"
                id="net-total"
                placeholder="RS. XX,XXX.XX"
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "15px" }}>
            <Col xl={8}></Col>
            <Col xl={2}>
              <Button className="row-btn" variant="secondary">
                Clear
              </Button>
            </Col>
            <Col xl={2}>
              <Button className="row-btn" variant="secondary">
                Save
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
