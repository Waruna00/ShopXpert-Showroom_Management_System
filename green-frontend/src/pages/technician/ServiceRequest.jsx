import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../../comp/NavBar";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "./style/ServiceRepairRequest.css";
import techImg from "../../Images/Tech.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function clearData() {
  document.getElementById("job-number").value = "";
  document.getElementById("item-name").value = "";
  document.getElementById("item-serial").value = "";
  document.getElementById("item-des").value = "";
  document.getElementById("cus-code").value = "";
  document.getElementById("cus-name").value = "";
  document.getElementById("cus-email").value = "";
  document.getElementById("cus-phone").value = "";
  document.getElementById("job-details").value = "";
  document.getElementById("job-estimation").value = "";
}
const bill = {};

var data = {};
function handleKeyDownSave() {
  //var jobNumber = document.getElementById("job-number").value;
  var itemName = document.getElementById("item-name").value;
  var itemSerial = document.getElementById("item-serial").value;
  var itemDes = document.getElementById("item-des").value;
  var cusCode = document.getElementById("cus-code").value;
  var jobdescription = document.getElementById("job-details").value;
  var estimationAmount = document.getElementById("job-estimation").value;
  data = {
    itemname: itemName,
    serial: itemSerial,
    description: jobdescription,
    itemdescription: itemDes,
    status: "Pending",
    estimation: estimationAmount,
    customer: parseInt(cusCode),
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  console.log(data);
  fetch("http://localhost:8080/api/technician/addrepair", options)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error))
    .finally(() => console.log("Request completed."));
}

export default function ServiceRepairRequest() {
  const navigate = useNavigate();
  const [lastRepairNo, setLastRepairNo] = useState();
  const [customer, setCustomer] = useState(null);

  function handleKeyDownCusCode(event) {
    var customerId = document.getElementById("cus-code").value;
    if (event.key === "Enter") {
      fetch("http://localhost:8080/api/customer/findbyid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: parseInt(customerId) }),
      })
        .then((response) => response.json())
        .then((data) => {
          setCustomer(data);
          console.log("Customer details:", customer);
        })
        .catch((error) => {
          console.error("Error fetching customer details:", error);
        });

      document.getElementById("cus-name").value =
        customer.first_Name + " " + customer.last_Name;
      document.getElementById("cus-email").value = customer.email;
      document.getElementById("cus-phone").value = customer.phone;
    }
  }

  useEffect(() => {
    fetch("http://localhost:8080/api/technician/getlastrepair")
      .then((response) => response.json())
      .then((data) => {
        setLastRepairNo(data.serviceno);
      })
      .catch((error) => {
        console.error("Error fetching last repair record:", error);
      });
  }, []);

  return (
    <>
      <NavBar />
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
                    value={"CS - " + (parseInt(lastRepairNo) + 1)}
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
                    onKeyDown={handleKeyDownCusCode}
                  />
                </Col>
                <Col xl={1}>
                  <Form.Label></Form.Label>
                  <Button
                    className="row-btn"
                    onClick={() => {
                      navigate("/srr");
                    }}
                    variant="secondary"
                  >
                    Find
                  </Button>
                </Col>
                <Col xl={5}>
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="cus-name"
                    placeholder="Customer Name"
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
                  />
                </Col>
                <Col xl={1}></Col>
                <Col xl={5}>
                  <Form.Label>Customer Phone</Form.Label>
                  <Form.Control
                    type="text"
                    id="cus-phone"
                    placeholder="Phone Number"
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
                <Col xl={2}>
                  <Form.Label>Estimation : </Form.Label>
                </Col>
                <Col xl={3}>
                  <Form.Control type="text" id="job-estimation" />
                </Col>
                <Col xl={3}></Col>
                <Col xl={2}>
                  <Button
                    onClick={() => {
                      handleKeyDownSave();
                      navigate("/srr");
                      console.log(bill);
                    }}
                    className="row-btn"
                    variant="secondary"
                  >
                    Save
                  </Button>
                </Col>
                <Col xl={2}>
                  <Button
                    className="row-btn"
                    onClick={clearData}
                    variant="secondary"
                  >
                    Clear
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
