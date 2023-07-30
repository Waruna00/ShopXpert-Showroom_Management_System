import React from "react";
import { Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import NavBar from "../../comp/NavBar";
import { useNavigate } from "react-router-dom";

function TableRows({ rows, navigation }) {
  const handleView = (order_no, date, status, created_by) => {
    navigation(`/UpdateOrder`, {
      state: { order_no, date, status, created_by },
    });
  };

  return rows.map((rowsData, index) => {
    var { order_no, date, status, created_by } = rowsData;

    return (
      <tr key={index}>
        <td>
          <Form.Label>{order_no}</Form.Label>
        </td>
        <td>
          <Form.Label>{date}</Form.Label>
        </td>
        <td>
          <Form.Label>{status}</Form.Label>
        </td>
        <td>
          <Form.Label>{created_by}</Form.Label>
        </td>

        <td>
          <Button
            className="row-btn"
            variant="btn btn-secondary"
            onClick={() => {
              handleView(order_no, date, status, created_by);
            }}
          >
            View
          </Button>
        </td>
      </tr>
    );
  });
}

export default function ViewOrder(props) {
  const [rows, initRow] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/order/findAll")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        orders.forEach((order) => console.log(order));
        if (data.length > 0) {
          const rows = data.map((order) => ({
            order_no: order.orderId,
            date: order.date,
            status: order.orderStatus,
            created_by: "Admin",
          }));
          initRow(rows);
        }
      })
      .catch((error) => {
        console.error("Error fetching service details:", error);
      });
  }, []);
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

  return (
    <>
      <NavBar />
      <br />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Service Jobs..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div style={{ height: "60vh" }} className="card-comp scroll" id="card-2">
        <Row>
          <label className="h-txt-2">Service List</label>
        </Row>
        <div className="ruler" />

        <table id="tbl" className="table table-striped">
          <thead>
            <tr>
              <th>Order No</th>
              <th>Date</th>
              <th>Status</th>
              <th>Created By</th>
              <th>View / Edit</th>
            </tr>
          </thead>
          <tbody>
            <TableRows rows={filteredRows} navigation={navigation} />
          </tbody>
        </table>
      </div>
      <div id="tot-price"></div>
    </>
  );
}
