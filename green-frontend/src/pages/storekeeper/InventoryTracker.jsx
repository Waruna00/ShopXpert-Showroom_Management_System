import React from "react";
import NavBar from "../../comp/NavBar";
import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useEffect } from "react";

export default function InventoryTracker() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/product/allproducts")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        products.forEach((products) => console.log(products));
        if (data.length > 0) {
          const rows = data.map((products) => ({
            itemCode: products.product_code,
            itemName: products.name,
            itemDes: products.description,
            qty: 10,
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
  const tableRowRemove = (index) => {
    const dataRow = [...rows];
    dataRow.splice(index, 1);
    initRow(dataRow);
  };

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
            <Button className="row-btn" variant="btn btn-secondary">
              Serial
            </Button>
          </td>
        </tr>
      );
    });
  }
  return (
    <>
      <NavBar />
      <div className="main-page">
        <div>
          <label className="h-txt-1">INVENTORY TRACKER</label>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Service Jobs..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div
          className="card-comp scroll"
          id="card-2"
          style={{ height: "70vh" }}
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
    </>
  );
}
