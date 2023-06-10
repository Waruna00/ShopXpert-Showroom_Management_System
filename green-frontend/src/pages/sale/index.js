import React from "react";
import { useState } from "react";
import NavBar from "../../NavBar";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Index() {
  const [updated, setUpdated] = useState("");

  const handleKeyDownItemCode = (event) => {
    if (event.key === "Enter") {
      setUpdated(event.target.value);
      console.log(updated);
    }
  };

  return (
    <>
      <NavBar />
      <div className="main-page">
        <div>
          <label className="h-txt-1">INVOICE NO : CS-DDMMYY-XXXXX</label>
        </div>
        <div className="card-comp" id="card-1">
          <Row style={{ width: "100%" }}>
            <Col xl={3}>
              <Form.Label>Item Code</Form.Label>
            </Col>
            <Col xl={2}>
              <Form.Label>Item Name</Form.Label>
            </Col>
            <Col xl={2}>
              <Form.Label>Description</Form.Label>
            </Col>
            <Col xl={1}>
              <Form.Label>Item Price</Form.Label>
            </Col>
            <Col xl={1}>
              <Form.Label>Quantity</Form.Label>
            </Col>
            <Col xl={2}>
              <Form.Label>Amount</Form.Label>
            </Col>
          </Row>

          <Row>
            <Col xl={2}>
              <Form.Control
                type="text"
                id="item-code"
                placeholder="Item Code"
                onKeyDown={handleKeyDownItemCode}
              />
            </Col>
            <Col xl={1}>
              <Button className="row-btn" variant="secondary">
                Find
              </Button>
            </Col>

            <Col xl={2}>
              <Form.Control
                type="text"
                edita
                id="item-name"
                placeholder="Item Name"
                readOnly
              />
            </Col>
            <Col xl={2}>
              <Form.Control
                type="text"
                id="item-des"
                placeholder="Description"
                readOnly
              />
            </Col>
            <Col xl={1}>
              <Form.Control
                type="text"
                id="item-des"
                placeholder="Price"
                readOnly
              />
            </Col>
            <Col xl={1}>
              <Form.Control
                type="text"
                id="item-qty"
                placeholder="Quantity"
                readOnly
              />
            </Col>
            <Col xl={2}>
              <Form.Control
                type="text"
                id="item-amount"
                placeholder="Amount"
                readOnly
              />
            </Col>
            <Col xl={1}>
              <Button className="row-btn" variant="secondary">
                Add
              </Button>
            </Col>
          </Row>
        </div>

        <div className="card-comp scroll" id="card-2">
          <Row>
            <label className="h-txt-2">Item List</label>
          </Row>
          <div className="ruler" />
          <Row>
            <Col xl={1}>
              <Form.Label className="h-txt-2">No</Form.Label>
            </Col>
            <Col xl={2}>
              <Form.Label className="h-txt-2">Item Code</Form.Label>
            </Col>
            <Col xl={2}>
              <Form.Label className="h-txt-2">Item Name</Form.Label>
            </Col>
            <Col xl={3}>
              <Form.Label className="h-txt-2">Description</Form.Label>
            </Col>
            <Col xl={1}>
              <Form.Label className="h-txt-2">Quantity</Form.Label>
            </Col>
            <Col xl={1}>
              <Form.Label className="h-txt-2">Amount</Form.Label>
            </Col>
            <Col xl={1}></Col>
            <Col xl={1}></Col>
          </Row>

          <Row>
            <Col xl={1}>
              <Form.Label>No</Form.Label>
            </Col>
            <Col xl={2}>
              <Form.Label>Item Code</Form.Label>
            </Col>
            <Col xl={2}>
              <Form.Label>Item Name</Form.Label>
            </Col>
            <Col xl={3}>
              <Form.Label>Description</Form.Label>
            </Col>
            <Col xl={1}>
              <Form.Label>Quantity</Form.Label>
            </Col>
            <Col xl={1}>
              <Form.Label>Amount</Form.Label>
            </Col>
            <Col xl={1}>
              <Button className="row-btn" variant="secondary">
                Serial
              </Button>
            </Col>
            <Col xl={1}>
              <Button className="row-btn" variant="danger">
                Remove
              </Button>
            </Col>
          </Row>

          <Row>
            <Col xl={1}>
              <Form.Label>No</Form.Label>
            </Col>
            <Col xl={2}>
              <Form.Label>Item Code</Form.Label>
            </Col>
            <Col xl={2}>
              <Form.Label>Item Name</Form.Label>
            </Col>
            <Col xl={3}>
              <Form.Label>Description</Form.Label>
            </Col>
            <Col xl={1}>
              <Form.Label>Quantity</Form.Label>
            </Col>
            <Col xl={1}>
              <Form.Label>Amount</Form.Label>
            </Col>
            <Col xl={1}>
              <Button className="row-btn" variant="secondary">
                Serial
              </Button>
            </Col>
            <Col xl={1}>
              <Button className="row-btn" variant="danger">
                Remove
              </Button>
            </Col>
          </Row>

          <Row>
            <Col xl={1}>
              <Form.Label>No</Form.Label>
            </Col>
            <Col xl={2}>
              <Form.Label>Item Code</Form.Label>
            </Col>
            <Col xl={2}>
              <Form.Label>Item Name</Form.Label>
            </Col>
            <Col xl={3}>
              <Form.Label>Description</Form.Label>
            </Col>
            <Col xl={1}>
              <Form.Label>Quantity</Form.Label>
            </Col>
            <Col xl={1}>
              <Form.Label>Amount</Form.Label>
            </Col>
            <Col xl={1}>
              <Button className="row-btn" variant="secondary">
                Serial
              </Button>
            </Col>
            <Col xl={1}>
              <Button className="row-btn" variant="danger">
                Remove
              </Button>
            </Col>
          </Row>
        </div>
        <div id="tot-price">
          <Row>
            <Col xl={8}></Col>
            <Col xl={2}>
              <label className="h-txt-2">Total Amount</label>
            </Col>
            <Col xl={2}>
              <Form.Control
                type="text"
                id="tot-amount"
                placeholder="RS. XX,XXX.XX"
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "15px" }}>
            <Col xl={8}></Col>
            <Col xl={2}>
              <Button className="row-btn" variant="secondary">
                Clear
              </Button>
            </Col>
            <Col xl={2}>
              <Button className="row-btn" variant="secondary">
                Save
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
