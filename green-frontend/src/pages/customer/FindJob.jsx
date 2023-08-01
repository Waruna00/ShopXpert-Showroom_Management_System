import React from "react";
import { useState } from "react";
import { Button, Col, Form, FormControl, Row } from "react-bootstrap";

export default function FindJob() {
  const [jobData, setJobData] = useState([]);

  const handleConfirmEstimation = () => {
    const jobno = document.getElementById("jobno").value;
    const newStatus = "estimation-approved";

    fetch(
      `http://localhost:8080/api/technician/updatestatus?serviceNo=${jobno}&newStatus=${newStatus}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers here
        },
        // Add any additional options here
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        console.log(data);
        alert("Estimation Confirmed");
        window.location.reload();
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
      });
  };

  const handleFindButton = () => {
    const jobno = document.getElementById("jobno").value;
    var requestBody = {
      invoiceno: jobno,
    };
    fetch("http://localhost:8080/api/technician/findbyid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setJobData(data);
        document.getElementById("jobStatus").value = data.status;
        document.getElementById("estimation").value =
          "Rs : " + parseFloat(data.estimation).toFixed(2);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="main-page">
        <label
          style={{ fontSize: "20px", textAlign: "center" }}
          className="h-txt-3"
        >
          JOB STATUS TRACKER
        </label>
        <br />
        <br />
        <div className="card-comp">
          <Row>
            <Col xl={4}>
              <Form.Label>Job ID</Form.Label>
            </Col>
            <Col xl={1}></Col>

            <Col xl={4}>
              <Form.Label>Job Status</Form.Label>
            </Col>
            <Col xl={3}>
              <Form.Label>Estimation</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col xl={4}>
              <FormControl
                id="jobno"
                type="text"
                placeholder="Enter Job ID"
                className="mr-sm-2"
              />
            </Col>
            <Col xl={1}>
              <Button onClick={handleFindButton}>Find</Button>
            </Col>
            <Col xl={4}>
              <FormControl
                id="jobStatus"
                type="text"
                placeholder="Job Status"
                className="mr-sm-2"
              />
            </Col>
            <Col xl={3}>
              <FormControl
                id="estimation"
                type="text"
                placeholder="Estimation"
                className="mr-sm-2"
              />
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col xl={5}></Col>
            <Col xl={2}>
              {jobData.status === "estimation-completed" ? (
                <Button onClick={handleConfirmEstimation}>
                  Confirm Estimation
                </Button>
              ) : (
                <Button disabled>Confirm Estimation</Button>
              )}
            </Col>
            <Col xl={5}></Col>
          </Row>
        </div>
      </div>
    </>
  );
}
