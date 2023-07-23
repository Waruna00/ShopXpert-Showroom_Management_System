import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../../comp/NavBar";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "./style/ServiceRepairRequest.css";
import techImg from "../../Images/Tech.jpg";

export default function ServiceUpdate() {
  const [billData, setBillData] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  var data = {};
  useEffect(() => {
    fetch("http://localhost:8080/api/technician/findbyid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invoiceno: "1" }),
    })
      .then((response) => response.json())
      .then((data) => {
        //setCustomer(data);
        console.log("Invoice :", data);
        setBillData({
          invoiceno: data.serviceno,
          itemname: data.item_name,
          serial: data.serial,
          itemdescription: data.item_description,
          customercode: data.customer.cus_Code,
          customername:
            data.customer.first_Name + " " + data.customer.last_Name,
          customeremail: data.customer.email,
          customerphone: data.customer.phone,
          status: data.status,
          estimation: data.estimation,
          repairdate: data.date,
          repaircost: data.cost,
          repairdetails: data.description,
        });
        console.log("New Invoice :", data);
        document.getElementById("job-number").value =
          "CS - " + billData.invoiceno;
        document.getElementById("item-name").value = billData.itemname;
        document.getElementById("item-serial").value = billData.serial;
        document.getElementById("item-des").value = billData.itemdescription;
        document.getElementById("cus-code").value = billData.customercode;
        document.getElementById("cus-name").value = billData.customername;
        document.getElementById("cus-email").value = billData.customeremail;
        document.getElementById("cus-phone").value = billData.customerphone;
        document.getElementById("job-details").value = billData.repairdetails;
        document.getElementById("job-estimation").value = billData.estimation;
        document.getElementById("job-date").value = billData.repairdate;
        document.getElementById("job-cost").value = billData.repaircost;
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

    const tempcustomer = {
        cus_Code: cusCode,
        email: cusEmail,
        phone: cusPhone,
    };

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
      customer: tempcustomer,
    });
    console.log("Updated : ", updatedData);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    };

    fetch("http://localhost:8080/api/technician/update", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

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
                    value={"CS - " + billData.invoiceno}
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
                    value={billData.customercode}
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
                    value={billData.customername}
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
                    value={billData.customeremail}
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
                    value={billData.customerphone}
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
                    value={billData.repairdate}
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
                  <Button className="row-btn" variant="secondary">
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
