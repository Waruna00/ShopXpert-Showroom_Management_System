import React from "react";
import { UserProvider } from "../../UserProvider";
import StoreKeeperNav from "../../comp/NavBar/StoreKeeperNav";
import { Col, Row } from "react-bootstrap";

export default function StoreKeeperDashboard() {
  return (
    <>
      <UserProvider>
        <StoreKeeperNav />
      </UserProvider>
    </>
  );
}
