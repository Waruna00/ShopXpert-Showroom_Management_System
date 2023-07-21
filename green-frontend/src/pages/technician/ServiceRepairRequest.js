import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../../comp/NavBar";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "./ServiceRepairRequest.css";
import techImg from "../../Images/Tech.jpg";

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

function handleKeyDownCusCode(event) {
  if (event.key === "Enter") {
    //document.getElementById("cus-name").value = "Customer Name";
    //document.getElementById("cus-email").value = "Customer Email";
    //document.getElementById("cus-phone").value = "Customer Phone";
  }
}

export default function ServiceRepairRequest() {
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
                  <Button className="row-btn" variant="secondary">
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
                  <Button className="row-btn" variant="secondary">
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
