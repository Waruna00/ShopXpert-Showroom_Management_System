import React from "react";
import { UserProvider } from "../../UserProvider";
import StoreKeeperNav from "../../comp/NavBar/StoreKeeperNav";
import { Col, Row } from "react-bootstrap";

export default function ManagerDashboard() {
  return (
    <>
      <UserProvider>
        <StoreKeeperNav />
        <Row>
          <Col xl={1}></Col>
          <Col xl={10}>
            <div className="kpi-container" style={{ margin: "auto" }}>
              <iframe
                title="Development Project Data PowerBI - Final - Page 1"
                width="1140"
                height="541.25"
                src="https://app.powerbi.com/reportEmbed?reportId=6f854a31-3fdf-4745-a488-95e8498d5710&autoAuth=true&ctid=aa232db2-7a78-4414-a529-33db9124cba7"
                frameborder="0"
                allowFullScreen="true"
              ></iframe>
            </div>
          </Col>
          <Col xl={1}></Col>
        </Row>
      </UserProvider>
    </>
  );
}
