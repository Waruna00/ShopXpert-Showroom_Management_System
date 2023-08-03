import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "./style/ServiceRepairRequest.css";
import techImg from "../../Images/Tech.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import TechnicianNav from "../../comp/NavBar/TechnicianNav";

export default function ServiceUpdate() {
  const [updatedData, setUpdatedData] = useState({});
  const location = useLocation();
  let navigation = useNavigate();
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/api/technician/findbyid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invoiceno: location.state.jobNo }),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("job-number").value = data.serviceno;
        document.getElementById("item-name").value = data.item_name;
        document.getElementById("item-serial").value = data.serial;
        document.getElementById("item-des").value = data.item_description;
        document.getElementById("cus-code").value = data.customer.cuscode;
        document.getElementById("cus-name").value =
          data.customer.first_Name + " " + data.customer.last_Name;
        document.getElementById("cus-email").value = data.customer.email;
        document.getElementById("cus-phone").value = data.customer.phone;
        document.getElementById("job-details").value = data.description;
        document.getElementById("job-estimation").value = data.estimation;
        document.getElementById("job-date").value = data.date;
        document.getElementById("job-cost").value = data.cost;
        document.getElementById("job-status").value = data.status;
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
      });
  }, []);

  function handleUpdate() {
    var jobNumber = document.getElementById("job-number").value;
    var itemName = document.getElementById("item-name").value;
    var itemSerial = document.getElementById("item-serial").value;
    var itemDes = document.getElementById("item-des").value;
    var cusCode = document.getElementById("cus-code").value;
    var jobdescription = document.getElementById("job-details").value;
    var estimationAmount = document.getElementById("job-estimation").value;
    var jobStatus = document.getElementById("job-status").value;
    var jobCost = document.getElementById("job-cost").value;
    var jobDate = document.getElementById("job-date").value;
    var cusEmail = document.getElementById("cus-email").value;
    var cusPhone = document.getElementById("cus-phone").value;

    setUpdatedData({
      serviceno: parseInt(jobNumber.replace("CS - ", "")),
      item_name: itemName,
      serial: itemSerial,
      description: jobdescription,
      status: jobStatus,
      estimation: estimationAmount,
      cost: jobCost,
      date: jobDate,
      item_description: itemDes,
      customer: {
        cuscode: cusCode,
        email: cusEmail,
        phone: cusPhone,
      },
    });

    console.log(updatedData);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    };
    if (window.confirm("Are you sure you want to update this service?")) {
      fetch("http://localhost:8080/api/technician/update", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigation("/ServiceTracker");
          window.confirm("Service updated successfully.");
        })
        .catch((error) => {
          console.log(error);
          window.confirm("Error updating service. Please try again.");
        });
    }
  }

  return (
    <>
      <TechnicianNav />
      <br />
      <Row className="form-row">
        <Col xl={4}>
          <img className="img-comp" src={techImg} alt="placeholder" />
        </Col>
        <Col xl={8}>
          <div className="card-comp">
            <div className="card-header">
              <h3 align="center">Service Repair Request</h3>
            </div>

            <div className="card-body">
              <Row className="form-row">
                <Col xl={5}>
                  <Form.Label>Job Number</Form.Label>
                  <Form.Control
                    type="text"
                    id="job-number"
                    placeholder="Job Number"
                    readOnly
                  />
                </Col>
                <Col xl={1}></Col>
                <Col xl={5}>
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="item-name"
                    placeholder="Item Name"
                  />
                </Col>
              </Row>
              <Row className="form-row">
                <Col xl={5}>
                  <Form.Label>Item Serial No</Form.Label>
                  <Form.Control
                    type="text"
                    id="item-serial"
                    placeholder="Item Serial No"
                  />
                </Col>
                <Col xl={1}></Col>
                <Col xl={5}>
                  <Form.Label>Item Description</Form.Label>
                  <Form.Control
                    type="text"
                    id="item-des"
                    placeholder="Item Description"
                  />
                </Col>
              </Row>
              <Row className="form-row">
                <Col xl={5}>
                  <Form.Label>Customer Code</Form.Label>
                  <Form.Control
                    type="text"
                    id="cus-code"
                    placeholder="Customer Code"
                    readOnly
                  />
                </Col>
                <Col xl={1}></Col>
                <Col xl={5}>
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="cus-name"
                    placeholder="Customer Name"
                    readOnly
                  />
                </Col>
              </Row>
              <Row className="form-row">
                <Col xl={5}>
                  <Form.Label>Customer Email</Form.Label>
                  <Form.Control
                    type="text"
                    id="cus-email"
                    placeholder="Email Address"
                    readOnly
                  />
                </Col>
                <Col xl={1}></Col>
                <Col xl={5}>
                  <Form.Label>Customer Phone</Form.Label>
                  <Form.Control
                    type="text"
                    id="cus-phone"
                    placeholder="Phone Number"
                    readOnly
                  />
                </Col>
              </Row>
              <Row className="form-row">
                <Col xl={5}>
                  <Form.Label>Job Status</Form.Label>
                  <Form.Control as="select" id="job-status">
                    <option value="estimation-progress">
                      Estimation on progress
                    </option>
                    <option value="estimation-completed">
                      Estimation Completed
                    </option>
                    <option value="estimation-approved">
                      Estimation Approved
                    </option>
                    <option value="repair-progress">Repair on progress</option>
                    <option value="repair-completed">Repair Completed</option>
                  </Form.Control>
                </Col>
                <Col xl={1}></Col>
                <Col xl={5}>
                  <Form.Label>Repair Estimation</Form.Label>
                  <Form.Control
                    type="text"
                    id="job-estimation"
                    placeholder="Repair Estimation"
                  />
                </Col>
              </Row>
              <Row className="form-row">
                <Col xl={5}>
                  <Form.Label>Repair Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Repair Date"
                    id="job-date"
                    readOnly
                  />
                </Col>
                <Col xl={1}></Col>
                <Col xl={5}>
                  <Form.Label>Repair Cost</Form.Label>
                  <Form.Control
                    type="text"
                    id="job-cost"
                    placeholder="Repair Cost"
                  />
                </Col>
              </Row>
              <Row className="form-row">
                <Col xl={12}>
                  <Form.Label>Repair Details</Form.Label>
                  <Form.Control as="textarea" id="job-details" rows={3} />
                </Col>
              </Row>
              <Row className="form-row">
                <Col xl={7}></Col>
                <Col xl={2}>
                  <Button
                    className="row-btn"
                    variant="secondary"
                    onClick={handleUpdate}
                  >
                    Update
                  </Button>
                </Col>
                <Col xl={2}>
                  <Button
                    className="row-btn"
                    variant="secondary"
                    onClick={() => {
                      navigation("/ServiceTracker");
                      window.location.reload();
                    }}
                  >
                    Back
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
