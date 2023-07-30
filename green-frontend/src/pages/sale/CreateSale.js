import React from "react";
import { useState } from "react";
import NavBar from "../../comp/NavBar";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

var NetTotal = 0.0;
var amt = 0.0;

function TableRows({ rows, tableRowRemove }) {
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
  const [addButtonCondition, setAddButtonCondition] = useState(false);
  const [rows, initRow] = useState([]);
  const navigate = useNavigate();

  function handleSaveKeyDown() {
    alert("Enter key pressed");

    console.log(NetTotal);
    const billData = {
      user: parseInt(document.getElementById("user-code").value),
      total: parseInt(document.getElementById("net-total").value),
      products: rows.map((rows) => ({
        productCode: rows.itemCode,
        quantity: parseInt(rows.qty),
      })),
    };

    console.log("BillFata : ", billData);

    fetch("http://localhost:8080/api/bill/createbill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(billData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/CS.invoice", {
          state: { state: billData, RowData: rows, BillNo: data },
        });
      })
      .catch((error) => console.error(error));
  }

  function clearFeilds() {
    document.getElementById("item-code").value = "";
    document.getElementById("item-name").value = "";
    document.getElementById("item-des").value = "";
    document.getElementById("item-price").value = "";
    document.getElementById("item-qty").value = "";
    document.getElementById("item-amount").value = "";
    setAddButtonCondition(false);
  }
  const handleKeyDownQty = (event) => {
    if (event.key === "Enter") {
      var qty = event.target.value;
      const itemCode = updated;
      fetch(
        `http://localhost:8080/api/item/availableitemscount?productId=${itemCode}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (qty <= data) {
            var price = document.getElementById("item-price").value;
            var amount = qty * price * 1.0;
            document.getElementById("item-amount").value = amount;
            setAddButtonCondition(true);
          } else {
            alert("Not enough items in the stock, Only " + data + " left");
          }
        })
        .catch((error) => console.error(error));
    }
  };
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
  const addRowTable = () => {
    var amount = document.getElementById("item-amount").value;

    const data = {
      itemCode: document.getElementById("item-code").value,
      itemName: document.getElementById("item-name").value,
      itemDes: document.getElementById("item-des").value,
      qty: document.getElementById("item-qty").value,
      price: document.getElementById("item-price").value,
      amount: document.getElementById("item-amount").value,
    };
    const existingOrderIndex = rows.findIndex(
      (rows) => rows.itemCode === data.itemCode
    );
    if (existingOrderIndex !== -1) {
      const updatedItem = [...rows];
      let actualQty = parseInt(updatedItem[existingOrderIndex].qty);
      updatedItem[existingOrderIndex].qty = actualQty + parseInt(data.qty);
      amt = data.amount;
      let AM = parseFloat(updatedItem[existingOrderIndex].amount);
      updatedItem[existingOrderIndex].amount = AM + parseFloat(data.amount);

      fetch(
        `http://localhost:8080/api/item/availableitemscount?productId=${data.itemCode}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (updatedItem[existingOrderIndex].qty <= data) {
            NetTotal = parseFloat(NetTotal) + parseFloat(amt);
            document.getElementById("net-total").value = NetTotal;

            initRow(updatedItem);
          } else {
            alert("Not enough items in the stock, Only " + data + " left");
          }
        })
        .catch((error) => console.error(error));
    } else {
      initRow([...rows, data]);
      NetTotal = parseFloat(NetTotal) + parseFloat(amount);
      document.getElementById("net-total").value = NetTotal;
    }

    // initRow([...rows, data]);
    clearFeilds();
  };
  const tableRowRemove = (index) => {
    const dataRow = [...rows];
    dataRow.splice(index, 1);
    var amount =
      document.getElementsByTagName("tr")[index + 1].cells[6].childNodes[0]
        .textContent;
    NetTotal = parseFloat(NetTotal) - parseFloat(amount);

    document.getElementById("net-total").value = NetTotal;
    initRow(dataRow);
  };

  return (
    <>
      <NavBar />
      <div className="main-page">
        <div>
          <Row>
            <Col xl={6}>
              <label className="h-txt-1">CREATE CASH SALE</label>
            </Col>
            <Col xl={2}>
              <Form.Label>Customer Code : </Form.Label>
            </Col>
            <Col xl={3}>
              <Form.Control type="text" id="user-code"></Form.Control>
            </Col>
            <Col xl={1}>
              <Button className="row-btn" variant="secondary">
                Find
              </Button>
            </Col>
          </Row>
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
                editable="false"
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
              {addButtonCondition && (
                <Button
                  className="row-btn"
                  variant="secondary"
                  id="add-btn"
                  onClick={addRowTable}
                >
                  Add
                </Button>
              )}
              {!addButtonCondition && (
                <Button
                  className="row-btn"
                  variant="secondary"
                  disabled="true"
                  id="add-btn"
                >
                  Add
                </Button>
              )}
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
              <Button
                className="row-btn"
                variant="secondary"
                onClick={console.log("Clear Button")}
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
