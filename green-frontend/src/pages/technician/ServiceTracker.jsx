import React from "react";
import { Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import NavBar from "../../comp/NavBar";
import "./style/ServiceTracker.css";
import { useNavigate, useNavigation } from "react-router-dom";
import { useContext } from "react";
import { ServiceContext } from "../../Context/ServiceContext";
import { useHistory } from "react-router-dom";

function TableRows({ rows, tableRowRemove }) {
  return rows.map((rowsData, index) => {
    var {
      no,
      itemName,
      itemDes,
      serviceDetails,
      date,
      estimation,
      status,
      customer,
    } = rowsData;

    return (
      <tr key={index}>
        <td>
          <Form.Label>{no}</Form.Label>
        </td>
        <td>
          <Form.Label>{date}</Form.Label>
        </td>
        <td>
          <Form.Label>{itemName}</Form.Label>
        </td>
        <td>
          <Form.Label>{itemDes}</Form.Label>
        </td>
        <td>
          <Form.Label>{serviceDetails}</Form.Label>
        </td>
        <td>
          <Form.Label>{estimation}</Form.Label>
        </td>
        <td>
          <Form.Label>{status}</Form.Label>
        </td>
        <td>
          <Form.Label>{customer}</Form.Label>
        </td>
        <td>
          <Button
            className="row-btn"
            variant="btn btn-secondary"
            onClick={() => handleView.bind(this, no)}
          >
            View
          </Button>
        </td>
      </tr>
    );
  });
}

const handleView = (jobNo) => {
  //setServiceNo(jobNo);
  console.log(`Service no set to ${jobNo}`);
};

export default function ServiceTracker() {
  const [rows, initRow] = useState([]);
  const [services, setServices] = useState([]);
  const { setServiceNo, serviceNo } = useContext(ServiceContext);
  const navigation = useNavigate();

  // function handleView(jobNo) {
  //   history.push(`/service-tracker/${jobNo}`);
  // }

  useEffect(() => {
    fetch("http://localhost:8080/api/technician/getall")
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
        services.forEach((service) => console.log(service));
        if (data.length > 0) {
          const rows = data.map((service) => ({
            no: service.serviceno,
            itemName: service.item_name,
            itemDes: service.item_description,
            serviceDetails: service.description,
            date: service.date,
            estimation: service.estimation,
            status: service.status,
            customer: service.customer.first_Name,
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
              <th>Invoice No</th>
              <th>Date</th>
              <th>Item Name</th>
              <th>Item Description</th>
              <th>Service Details</th>
              <th>Estimation</th>
              <th>Status</th>
              <th>Customer</th>
              <th>View / Edit</th>
            </tr>
          </thead>
          <tbody>
            <TableRows rows={filteredRows} />
          </tbody>
        </table>
      </div>
      <div id="tot-price"></div>
    </>
  );
}
