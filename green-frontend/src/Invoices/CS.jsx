import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBTypography,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

export default function CS() {
  const location = useLocation();
  const Data = location.state;
  useEffect(() => {
    document.getElementById("printBtn").focus();
  }, []);

  function TableRow() {
    return Data.RowData.map((rowsData, index) => {
      var { itemCode, itemName, qty, price, amount } = rowsData;
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            <Form.Label>{itemCode}</Form.Label>
          </td>
          <td>
            <Form.Label>{itemName}</Form.Label>
          </td>
          <td>
            <Form.Label>{qty}</Form.Label>
          </td>
          <td>
            <Form.Label>{price}</Form.Label>
          </td>
          <td>
            <Form.Label>{parseFloat(amount).toFixed(2)}</Form.Label>
          </td>
        </tr>
      );
    });
  }
  return (
    <MDBContainer className="py-5">
      <MDBCard className="p-4">
        <MDBCardBody>
          <MDBContainer className="mb-2 mt-3">
            <MDBRow className="d-flex align-items-baseline">
              <MDBCol xl="12">
                <p
                  style={{
                    color: "#7e8d9f",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  <strong>CASH SALE INVOICE</strong>
                </p>
              </MDBCol>
              <MDBCol xl="3" className="float-end"></MDBCol>
            </MDBRow>
          </MDBContainer>
          <MDBContainer>
            <MDBCol md="12" className="text-center">
              <MDBIcon
                fab
                icon="mdb"
                size="4x"
                className="ms-0 "
                style={{ color: "#5d9fc5" }}
              />
              <p className="pt-0">GREEN Computer Solution (PVT) Ltd.</p>
            </MDBCol>
          </MDBContainer>
          <hr />
          <MDBRow>
            <MDBCol xl="8">
              <MDBTypography listUnStyled>
                <li className="text-muted">
                  To: <span style={{ color: "#5d9fc5" }}>John Lorem</span>
                </li>
                <li className="text-muted">Street, City</li>
                <li className="text-muted">State, Country</li>
                <li className="text-muted">
                  <MDBIcon fas icon="phone-alt" /> 123-456-789
                </li>
              </MDBTypography>
            </MDBCol>
            <MDBCol xl="4">
              <p className="text-muted">Invoice</p>
              <MDBTypography listUnStyled>
                <li className="text-muted">
                  <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                  <span className="fw-bold ms-1">No : </span> {Data.BillNo}
                </li>
                <li className="text-muted">
                  <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                  <span className="fw-bold ms-1">Date : </span>
                  {Date().toString().slice(0, 15)}
                </li>
              </MDBTypography>
            </MDBCol>
          </MDBRow>
          <MDBRow className="my-2 mx-1 justify-content-center">
            <MDBTable striped borderless>
              <MDBTableHead
                className="text-white"
                style={{ backgroundColor: "#84B0CA" }}
              >
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Item Code</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Amount</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <TableRow />
              </MDBTableBody>
            </MDBTable>
          </MDBRow>
          <MDBRow>
            <MDBCol xl="8"></MDBCol>
            <MDBCol xl="4">
              <p className="text-black float-start">
                <span className="text-black me-3"> Total Amount</span>
                <span style={{ fontSize: "20px" }}>
                  <b> Rs. {parseFloat(Data.state.total).toFixed(2)}</b>
                </span>
              </p>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol xl="12">
              <p>
                <b>Terms & Conditions</b>
              </p>
              <p style={{ textAlign: "justify" }}>
                All items are non-refundable and non returnable. Warranty is
                void if the product is damaged by misuse, abuse, alteration,
                accident, improper handling or operation, or if unauthorized
                repairs are attempted or made. This warranty does not cover any
                third party software or virus related problems. GREEN Computer
                Solution (PVT) Ltd. is not responsible for any data loss or
                damage to any software or hardware. GREEN Computer Solution
                (PVT) Ltd. is not responsible for any consequential or
                incidental damages. All items are subject to availability.
                Prices are subject to change without prior notice.
                <hr />
                <b>
                  I hereby agree to the above terms and conditions and authorize
                  GREEN Computer Solution (PVT) Ltd. to perform the repair(s) as
                  described above.
                </b>
                <br></br>
                <br></br>
                <br></br>
                --------------------------------------
                <br></br>
                [Customer Signature]
              </p>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
      <br></br>
      <Button
        id="printBtn"
        style={{ display: "block", margin: "auto" }}
        onClick={() => window.print()}
      >
        PRINT
      </Button>
    </MDBContainer>
  );
}
