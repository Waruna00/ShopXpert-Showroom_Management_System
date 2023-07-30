import React from "react";
import { useState } from "react";
import NavBar from "../../comp/NavBar";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import e from "cors";

var NetTotal = 0.0;
var amt = 0.0;

function getAvailableItems(productId, setItemData, setSerials) {
  const url = `http://localhost:8080/api/item/availableitems?productId=${productId}`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setSerials(data);
      // handle the data here
    })
    .catch((error) => console.error(error));
}

function TableRows({
  rows,
  tableRowRemove,
  setModalShow,
  setItemData,
  setSerials,
}) {
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
            variant="secondary"
            onClick={() => {
              setItemData({
                name: itemName,
                code: itemCode,
                qty: qty,
              });
              getAvailableItems(itemCode, setItemData, setSerials);
              setModalShow(true);
            }}
          >
            Add Serial
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
  const [addButtonCondition, setAddButtonCondition] = useState(false);
  const [rows, initRow] = useState([]);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const [serials, setSerials] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [addedSerials, setAddedSerials] = useState([]);

  function addSerialNo(serial_no) {
    // Check if the serial number already exists in the state
    const exists = addedSerials.some((serial) => serial === serial_no);

    // If the serial number doesn't exist, add it to the state
    if (!exists && addedSerials.length < itemData.qty) {
      setAddedSerials([...addedSerials, serial_no]);
      console.log(addedSerials);
      return "Successfully added serial number";
    } else {
      console.log(addedSerials);
      return "Serial number already added choose a different no";
    }
  }

  function SerialSelector(props) {
    return (
      <div>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {itemData.code} - {itemData.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table id="tbl" className="table table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Serial No</th>
                  <th>Inward Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {serials.map((serial, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Form.Label>{index + 1}</Form.Label>
                      </td>
                      <td>
                        <Form.Label>{serial.serial_no}</Form.Label>
                      </td>
                      <td>
                        <Form.Label>{serial.Inward}</Form.Label>
                      </td>
                      <td>
                        <Button
                          className="row-btn"
                          variant="secondary"
                          onClick={() => {
                            console.log(serial.serial_no);
                            addSerialNo(serial.serial_no);
                            window.alert(addSerialNo(serial.serial_no));
                          }}
                        >
                          Add
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  function handleSaveKeyDown() {
    const totalQty = rows.reduce((acc, row) => acc + row.qty, 0);

    if (window.confirm("Are you sure you want to save the bill?") === true) {
      console.log("Qty", addedSerials.length);
      console.log("totalQty", parseInt(totalQty));
      if (parseInt(totalQty) === addedSerials.length) {
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
            var serialdata = {
              serials: addedSerials,
              status: "SOL",
              billNo: data,
            };
            console.log("Serial", serialdata);
            fetch("http://localhost:8080/api/item/updateitemstatus", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(serialdata),
            })
              .then((response) => {
                return response.json();
              })
              .catch((error) => console.error(error));

            navigate("/CS.invoice", {
              state: { state: billData, RowData: rows, BillNo: data },
            });
          })
          .catch((error) => console.error(error));
      } else {
        alert("Please add serial numbers to all items");
      }
    }
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
        <div
          style={{
            zIndex: -1,
            marginTop: "100px",
            position: "relative",
          }}
        ></div>
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              <TableRows
                rows={rows}
                tableRowRemove={tableRowRemove}
                setModalShow={setModalShow}
                setItemData={setItemData}
                setSerials={setSerials}
              />
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
      <SerialSelector show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
