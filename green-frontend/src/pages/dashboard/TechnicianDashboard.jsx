import React from "react";
import styled from "styled-components";
import { UserProvider } from "../../UserProvider";
import TechnicianNav from "../../comp/NavBar/TechnicianNav";

export default function TechnicianDashboard() {
  return (
    <UserProvider>
      <TechnicianNav />
    </UserProvider>
  );
}
