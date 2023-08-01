import React from "react";
import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useEffect, useContext } from "react";
import StoreKeeperNav from "../../comp/NavBar/StoreKeeperNav";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../../Context/AuthContext";
import ManagerNav from "../../comp/NavBar/ManagerNav";
import TechnicianNav from "../../comp/NavBar/TechnicianNav";
import CashierNav from "../../comp/NavBar/CashierNav";

export default function InventoryTracker() {
  const [product, setProduct] = useState([]);
  const [serials, setSerials] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const authState = useContext(AuthContext);

  function handleSerialKeyDown(itemCode) {
    fetch(`http://localhost:8080/api/item/availableitems?productId=${itemCode}`)
      .then((response) => response.json())
      .then((data) => {
        setSerials(data);
      })
      .catch((error) => console.error(error));
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
              {product.productCode} - {product.productName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table id="tbl" className="table table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Serial No</th>
                  <th>Inward Date</th>
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

  useEffect(() => {
    fetch("http://localhost:8080/api/item/avlitemsbyproduct")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const rows = data.map((products) => ({
            itemCode: products[0],
            itemName: products[1],
            itemDes: products[2],
            qty: products[3],
          }));
          initRow(rows);
        }
      })
      .catch((error) => {
        console.error("Error fetching service details:", error);
      });
  }, []);

  const [rows, initRow] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  function TableRows({ rows }) {
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
              variant="btn btn-secondary"
              onClick={() => {
                handleSerialKeyDown(itemCode);
                setProduct({
                  productCode: itemCode,
                  productName: itemName,
                });
                setModalShow(true);
              }}
            >
              Serial
            </Button>
          </td>
        </tr>
      );
    });
  }
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
      <div className="main-page">
        <div>
          <label className="h-txt-1">INVENTORY TRACKER</label>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div
          className="card-comp scroll"
          id="card-2"
          style={{ height: "60vh" }}
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
              <TableRows rows={filteredRows} />
            </tbody>
          </table>
        </div>
      </div>
      <SerialSelector show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
