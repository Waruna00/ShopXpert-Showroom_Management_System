import React, { useEffect } from "react";
import { useState } from "react";
import { Row, Col, FormControl } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation, useNavigate } from "react-router-dom";
import StoreKeeperNav from "../../comp/NavBar/StoreKeeperNav";
import Modal from "react-bootstrap/Modal";

function TableRows({
  rows,
  setModalShow,
  setTempProductCode,
  setTempQty,
  setAddedQty,
  setTempIndex,
}) {
  return rows.map((rowsData, index) => {
    var {
      product_code,
      product_name,
      product_description,
      quantity,
      added_quantity,
    } = rowsData;

    return (
      <tr key={index}>
        <td>
          <Form.Label>{index + 1}</Form.Label>
        </td>
        <td>
          <Form.Label>{product_code}</Form.Label>
        </td>
        <td>
          <Form.Label>{product_name}</Form.Label>
        </td>
        <td>
          <Form.Label>{product_description}</Form.Label>
        </td>
        <td>
          <Form.Label>{quantity}</Form.Label>
        </td>
        <td>
          <Form.Label>{added_quantity}</Form.Label>
        </td>
        <td>
          <Button
            className="row-btn"
            variant="secondary"
            onClick={() => {
              setModalShow(true);
              setTempProductCode(product_code);
              setTempQty(quantity);
              setAddedQty(added_quantity);
              setTempIndex(index);
            }}
          >
            Add Serial
          </Button>
        </td>
      </tr>
    );
  });
}

export default function UpdateOrder() {
  const [orderDetails, setOrderDetails] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [serials, setSerials] = useState([]);
  const [tempProductCode, setTempProductCode] = useState("");
  const [tempQty, setTempQty] = useState(0);
  const [addedQty, setAddedQty] = useState(0);

  const [tempIndex, setTempIndex] = useState(0);

  function SerialSelector(props) {
    const handleAddKeyPress = (dataset) => {
      console.log("new serials : ", dataset);
      var item = {
        productCode: tempProductCode,
        serials: dataset,
      };

      orderItems[tempIndex].added_quantity = dataset.length;

      setSerials([...serials, item]);
      console.log("serials : ", serials);
    };
    const MyComponent = () => {
      const [inputText, setInputText] = useState("");
      const [tableData, setTableData] = useState([]);

      const handleInputChange = (event) => {
        setInputText(event.target.value);
      };

      const handleInputKeyPress = (event) => {
        if (event.key === "Enter" && tableData.length <= parseInt(tempQty)) {
          if (!tableData.includes(inputText)) {
            setTableData([...tableData, inputText]);
          } else {
            alert("Serial already exists");
          }
          setInputText("");
        } else if (tableData.length >= parseInt(tempQty)) {
          alert("Maximum serials reached");
        }
      };

      return (
        <div>
          <Form.Label>Add Serial Number</Form.Label>
          <div className="ruler" />
          <FormControl
            placeholder="Enter serial number"
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
          />

          <Row>
            <Col xl={1}></Col>
            <Col xl={3}>
              <Form.Label>#</Form.Label>
            </Col>
            <Col xl={5}>
              <Form.Label>Serial Number</Form.Label>
            </Col>
            <Col xl={2}></Col>
          </Row>
          <div className="ruler" />

          {tableData.map((text, index) => (
            <Row key={index}>
              <Col xl={1}></Col>
              <Col xl={3}>{index + 1}</Col>
              <Col xl={5}>{text}</Col>
              <Col xl={2}></Col>
            </Row>
          ))}

          <div className="ruler" />
          <Row>
            <Col xl={9}></Col>
            <Col xl={1}>
              <Button
                onClick={async () => {
                  //setNewSerials([...newSerials, tableData]);
                  handleAddKeyPress(tableData);
                  props.onHide();
                }}
              >
                Add
              </Button>
            </Col>
            <Col xl={1}>
              <Button onClick={props.onHide}>Close</Button>
            </Col>
          </Row>
        </div>
      );
    };

    return (
      <div>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {tempProductCode}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MyComponent />
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }

  function cancelOrder() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: orderDetails.order_no,
        status: "Canceled",
      }),
    };
    fetch("http://localhost:8080/api/order/statusupdate", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.getElementById("cancel-btn").disabled = true;
        document.getElementById("card-1").style.backgroundColor = "#ffcccb";
        Location.reload();
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderid: location.state.order_no }),
    };
    fetch(
      "http://localhost:8080/api/order/findOrderProductsById",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const updatedOrderDetails = data.map((order) => ({
          product_code: order.product.productCode,
          product_name: order.product.name,
          product_description: order.product.description,
          quantity: order.quantity,
          added_quantity: 0,
        }));
        setOrderItems(updatedOrderDetails);
        setOrderDetails({
          order_no: location.state.order_no,
          order_date: location.state.date,
          order_status: location.state.status,
          create_by: location.state.created_by,
        });

        console.log("status : ", location.state.status);
        if (location.state.status === "Pending") {
          document.getElementById("cancel-btn").disabled = false;
          document.getElementById("process-btn").disabled = false;
          console.log("true");
        } else if (
          location.state.status === "Canceled" ||
          location.state.status === "Completed"
        ) {
          document.getElementById("card-1").style.backgroundColor = "#ffcccb";
          document.getElementById("cancel-btn").disabled = true;
          document.getElementById("process-btn").disabled = true;
          console.log("false");
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleProcessKeyDown = () => {
    console.log("serials : ", serials);
    serials.map((serial) => {
      var tempProduct = serial.productCode;
      //serialsList.push(serial.serials);
      serial.serials.map((serial) => {
        var requestBody = {
          serial_no: serial,
          product_code: tempProduct,
        };
        console.log("requestBody : ", requestBody);
        var requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        };
        fetch("http://localhost:8080/api/item/additem", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log("data : ", data);
            const requestOptions = {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: orderDetails.order_no,
                status: "Completed",
              }),
            };
            fetch(
              "http://localhost:8080/api/order/statusupdate",
              requestOptions
            )
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                document.getElementById("cancel-btn").disabled = true;
                document.getElementById("card-1").style.backgroundColor =
                  "#ffcccb";
                Location.reload();
              })
              .catch((error) => console.error(error));
            navigate("/StockRecievedNote", {
              state: {
                added_serials: serials,
                order_details: orderDetails,
                order_items: orderItems,
              },
            });
          })
          .catch((error) => console.error(error));
      });
    });
    //console.log("serialsList : ", serialsList);
  };
  return (
    <>
      <StoreKeeperNav />
      <div className="main-page">
        <div>
          <label className="h-txt-1">STOCK ORDER DETAILS</label>
        </div>
        <div className="card-comp" id="card-1">
          <Row style={{ width: "100%" }}>
            <Col xl={2}>
              <Form.Label>Order No : {orderDetails.order_no}</Form.Label>
            </Col>
            <Col xl={2}>
              <Form.Label>Date : {orderDetails.order_date}</Form.Label>
            </Col>
            <Col xl={3}>
              <Form.Label>
                Order Status : {orderDetails.order_status}
              </Form.Label>
            </Col>
            <Col xl={2}>
              <Form.Label>Created By : {orderDetails.create_by}</Form.Label>
            </Col>
            <Col xl={3}>
              <Button
                className="row-btn"
                variant="danger"
                id="cancel-btn"
                onClick={cancelOrder}
              >
                CANCEL ORDER
              </Button>
            </Col>
          </Row>
        </div>

        <div
          className="card-comp scroll"
          id="card-2"
          style={{ height: "40vh" }}
        >
          <Row>
            <label className="h-txt-2">Item List</label>
          </Row>
          <div className="ruler" />
          <table id="tbl" className="table table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Item Description</th>
                <th>Ordered Qty</th>
                <th>Added Qty</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <TableRows
                rows={orderItems}
                setModalShow={setModalShow}
                setAddedQty={setAddedQty}
                setTempProductCode={setTempProductCode}
                setTempQty={setTempQty}
                setTempIndex={setTempIndex}
              />
            </tbody>
          </table>
        </div>
        <div id="tot-price">
          <Row style={{ marginTop: "15px" }}>
            <Col xl={8}></Col>
            <Col xl={2}>
              <Button
                className="row-btn"
                variant="secondary"
                onClick={() => navigate("/ManageOrder")}
              >
                Back
              </Button>
            </Col>
            <Col xl={2}>
              <Button
                id="process-btn"
                className="row-btn"
                variant="secondary"
                onClick={handleProcessKeyDown}
              >
                Process
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <SerialSelector show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
