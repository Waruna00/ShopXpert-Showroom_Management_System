import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
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

export default function SRN() {
  const location = useLocation();
  const Data = location.state;
  const navigate = useNavigate();
  useEffect(() => {
    document.getElementById("printBtn").focus();
  }, []);

  function TableRow() {
    return Data.order_items.map((rowsData, index) => {
      var { product_code, product_name, quantity } = rowsData;
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            <Form.Label>{product_code}</Form.Label>
          </td>
          <td>
            <Form.Label>{product_name}</Form.Label>
          </td>
          <td>
            <Form.Label>{quantity}</Form.Label>
          </td>
          <td>
            <Form.Label>
              {Data.added_serials.map((serial) => {
                if (serial.productCode === product_code) {
                  return serial.serials.length;
                }
              })}
            </Form.Label>
          </td>
          <td>
            <Form.Label>
              {Data.added_serials.map((serial) => {
                if (serial.productCode === product_code) {
                  return serial.serials.map((serial) => {
                    return (
                      <>
                        {serial}
                        <br />
                      </>
                    );
                  });
                }
              })}
            </Form.Label>
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
                  <strong>STOCK RECIEVED NOTE</strong>
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
                  <span className="fw-bold ms-1">
                    Order No : {Data.order_details.order_no}
                  </span>
                </li>
              </MDBTypography>
            </MDBCol>
            <MDBCol xl="4">
              <MDBTypography listUnStyled>
                <li className="text-muted">
                  <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
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
                  <th scope="col">Order Qty</th>
                  <th scope="col">Deliver Qty</th>
                  <th scope="col">Serial(s)</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <TableRow />
              </MDBTableBody>
            </MDBTable>
          </MDBRow>
          <MDBRow>
            <MDBCol xl="8"></MDBCol>
            <MDBCol xl="4"></MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol xl="8">
              <p>
                <br></br>
                Procceed By:
                <br></br>
                <br></br>
                <br></br>
                --------------------------------------
                <br></br>
                [Signature]
              </p>
            </MDBCol>
            <MDBCol xl="4">
              <p>
                <br></br>
                Recieved By:
                <br></br>
                <br></br>
                <br></br>
                --------------------------------------
                <br></br>
                [Storekeeper Signature]
              </p>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
      <br></br>
      <Button
        id="printBtn"
        style={{ display: "block", margin: "auto" }}
        onClick={() => {
          window.print();
          navigate("/ManageOrder");
        }}
      >
        PRINT
      </Button>
    </MDBContainer>
  );
}
