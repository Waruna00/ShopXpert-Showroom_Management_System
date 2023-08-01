import React, { useEffect } from "react";
import { useState } from "react";
import NavBar from "../../comp/NavBar/CashierNav";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TableRows({ rows, tableRowRemove, setAddedRows, addedRows }) {
  return rows.map((rowsData, index) => {
    var { itemCode, itemName, itemDes, serial_no } = rowsData;

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
          <Form.Label>{serial_no}</Form.Label>
        </td>
        <td>
          <Button
            className="row-btn"
            variant="secondary"
            onClick={() => {
              var data = {
                itemCode: itemCode,
                itemName: itemName,
                itemDes: itemDes,
                serial_no: serial_no,
              };
              setAddedRows([...addedRows, data]);
              tableRowRemove(index);
            }}
          >
            Add
          </Button>
        </td>
      </tr>
    );
  });
}

function AddedTableRows({ rows, addedRows, initRow, addTableRowRemove }) {
  return addedRows.map((rowsData, index) => {
    var { itemCode, itemName, itemDes, serial_no } = rowsData;

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
          <Form.Label>{serial_no}</Form.Label>
        </td>

        <td>
          <Button
            onClick={() => {
              var data = {
                itemCode: itemCode,
                itemName: itemName,
                itemDes: itemDes,
                serial_no: serial_no,
              };
              initRow([...rows, data]);
              addTableRowRemove(index);
            }}
          >
            Remove
          </Button>
        </td>
      </tr>
    );
  });
}

export default function DeliveryOrder() {
  const [rows, initRow] = useState([]);
  const [addedRows, setAddedRows] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/item/pendingitems")
      .then((response) => response.json())
      .then((data) => {
        const rowsData = data.map((item) => ({
          itemCode: item.product.product_code,
          itemName: item.product.name,
          itemDes: item.product.description,
          serial_no: item.serial_no,
        }));
        initRow(rowsData);
      })
      .catch((error) => console.error(error));
  }, []);

  const addRowTable = (data) => {
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
  };
  const tableRowRemove = (index) => {
    const dataRow = [...rows];
    dataRow.splice(index, 1);
    initRow(dataRow);
  };

  const addTableRowRemove = (index) => {
    const dataRow = [...addedRows];
    dataRow.splice(index, 1);
    setAddedRows(dataRow);
  };

  function updateItemData(invoice) {
    addedRows.forEach((item) => {
      const data = {
        serial_no: item.serial_no,
        status: "AVL",
        inward_invoice_no: invoice.invoice_no,
      };

      fetch("http://localhost:8080/api/item/updateitem", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          window.alert("Successfully saved");
          window.location.reload();
        })
        .catch((error) => console.error(error));
    });
  }

  function handleSaveKeyDown() {
    if (window.confirm("Are you sure you want to save?")) {
      fetch("http://localhost:8080/api/inwardinvoice/addinvoice ")
        .then((response) => response.json())
        .then((data) => {
          updateItemData(data);
        })
        .catch((error) => console.error(error));
    }
  }

  return (
    <>
      <NavBar />
      <div className="main-page">
        <div>
          <label className="h-txt-1">DELIVERY ORDER</label>
        </div>

        <div
          className="card-comp scroll"
          id="card-2"
          style={{ height: "35vh" }}
        >
          <Row>
            <label className="h-txt-2">Pending Deliveries</label>
          </Row>
          <div className="ruler" />
          <table id="tbl" className="table table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Item Description</th>
                <th>Serial No</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <TableRows
                rows={rows}
                addRowTable={addRowTable}
                tableRowRemove={tableRowRemove}
                setAddedRows={setAddedRows}
                addedRows={addedRows}
                initRow={initRow}
              />
            </tbody>
          </table>
        </div>

        <div
          className="card-comp scroll"
          id="card-2"
          style={{ height: "35vh" }}
        >
          <Row>
            <label className="h-txt-2">Inward Invoice</label>
          </Row>
          <div className="ruler" />
          <table id="tbl" className="table table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Item Description</th>
                <th>Serial No</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <AddedTableRows
                addedRows={addedRows}
                addTableRowRemove={addTableRowRemove}
                addRowTable={addRowTable}
                rows={rows}
                initRow={initRow}
              />
            </tbody>
          </table>
        </div>
        <div id="tot-price">
          <Row style={{ marginTop: "15px" }}>
            <Col xl={8}></Col>
            <Col xl={2}></Col>
            <Col xl={2}>
              <Button
                className="row-btn"
                variant="secondary"
                onClick={() => {
                  if (addedRows.length > 0) handleSaveKeyDown();
                  else window.alert("Please add items to the inward");
                }}
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
