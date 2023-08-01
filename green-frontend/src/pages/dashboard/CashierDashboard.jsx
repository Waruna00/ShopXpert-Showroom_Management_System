import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { UserProvider } from "../../UserProvider";
import CashierNav from "../../comp/NavBar/CashierNav";

const MainWrapper = styled.div`
  padding-top: 40px;
`;

export const CashierDashboard = (props) => {
  return (
    <UserProvider>
      <CashierNav />
    </UserProvider>
  );
};
