import React from "react";
import { UserProvider } from "../../UserProvider";
import StoreKeeperNav from "../../comp/NavBar/StoreKeeperNav";

export default function StoreKeeperDashboard() {
  return (
    <>
      <UserProvider>
        <StoreKeeperNav />
      </UserProvider>
    </>
  );
}
