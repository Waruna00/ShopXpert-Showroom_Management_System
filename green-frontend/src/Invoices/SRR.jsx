import React from "react";
import { useEffect, useState } from "react";
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
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SRR() {
  const navigate = useNavigate();
  const [billData, setBillData] = useState({});
  useEffect(() => {
    document.getElementById("printBtn").focus();

    fetch("http://localhost:8080/api/technician/getlastrepair")
      .then((response) => response.json())
      .then((data) => {
        setBillData({
          invoiceNo: data.serviceno,
          date: data.date,
          item_name: data.item_name,
          serial: data.serial,
          item_description: data.item_description,
          description: data.description,
          estimation: data.estimation,
          customerName:
            data.customer.first_Name + " " + data.customer.last_Name,
          customerAddress: data.customer.address,
          customerPhone: data.customer.phone,
          customerNIC: data.customer.customerNIC,
        });
        console.log("Last repair record:", billData);
        //setLastRepairNo(data.serviceno);
      })
      .catch((error) => {
        console.error("Error fetching last repair record:", error);
      });
  }, []);

  return (
    <>
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
                      width: "100%",
                    }}
                  >
                    <strong>SERVICE REPAIR REQUEST</strong>
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
                    To:{" "}
                    <span style={{ color: "#5d9fc5" }}>
                      {billData.customerName}
                    </span>
                  </li>
                  <li className="text-muted">
                    Address : {billData.customerAddress}
                  </li>
                  <li className="text-muted">NIC : {billData.customerNIC}</li>
                  <li className="text-muted">
                    <MDBIcon fas icon="phone-alt" />
                    Mobile : {billData.customerPhone}
                  </li>
                </MDBTypography>
              </MDBCol>
              <MDBCol xl="4">
                <p className="text-muted">Invoice</p>
                <MDBTypography listUnStyled>
                  <li className="text-muted">
                    <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                    <span className="fw-bold ms-1">No : </span> CS -{" "}
                    {billData.invoiceNo}
                  </li>
                  <li className="text-muted">
                    <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                    <span className="fw-bold ms-1">Date : </span>
                    {billData.date}
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
                    <th scope="col">Item Name</th>
                    <th scope="col">Serial No</th>
                    <th scope="col">Item Description</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr>
                    <td>{billData.item_name}</td>
                    <td>{billData.serial}</td>
                    <td>{billData.item_description}</td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </MDBRow>
            <MDBRow>
              <MDBCol xl="8">
                <p className="ms-3">
                  Service Repair Details : {billData.description}
                  <br></br>
                  <span className="text-black me-3"> Estimation Amount : </span>
                  <span style={{ fontSize: "25px" }}>
                    <b>RS. {parseFloat(billData.estimation).toFixed(2)}</b>
                  </span>
                </p>
              </MDBCol>
            </MDBRow>
            <hr />
            <MDBRow>
              <MDBCol xl="10">
                <p>
                  <b>
                    Please carefully read the following Terms and Conditions.
                  </b>
                  <br></br>
                  <br></br>
                  01. The Customer is solely responsible for backing up their
                  data before handing over the computer for repair.
                  <br></br>
                  <br></br>02. The Customer agrees to pay the agreed-upon
                  service charges for the repair and/or diagnosis of the
                  computer issue(s).
                  <br></br>
                  <br></br>
                  03.Service charges may vary depending on the complexity and
                  extent of the repair required. The Customer will be informed
                  of the estimated charges before the repair begins.
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol xl="10">
                <p>
                  <b>
                    I hereby agree to the above terms and conditions and
                    authorize GREEN Computer Solution (PVT) Ltd. to perform the
                    repair(s) as described above.
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
          onClick={() => {
            window.print();
            navigate("/ServiceRepairRequest");
          }}
        >
          PRINT
        </Button>
      </MDBContainer>
    </>
  );
}
