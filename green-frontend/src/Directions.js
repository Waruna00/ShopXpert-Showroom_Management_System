import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Login";
import RegistrationForm from "./pages/registration/Registration";
import { Dashboard } from "./pages/dashboard/dashboard";
import Sale from "./pages/sale/CreateSale";
import ServiceRepairRequest from "./pages/technician/ServiceRequest";
import SRR from "./Invoices/SRR";
import CS from "./Invoices/CS";
import ServiceTracker from "./pages/technician/ServiceTracker";
import ServiceUpdate from "./pages/technician/ServiceUpdate";
import CreateOrder from "./pages/storekeeper/CreateOrder";
import InventoryTracker from "./pages/storekeeper/InventoryTracker";
import { ServiceContext } from "./Context/ServiceContext";
import ViewOrder from "./pages/storekeeper/ViewOrder";
import UpdateOrder from "./pages/storekeeper/UpdateOrder";
import StockInward from "./pages/storekeeper/StockInward";
import DeliveryOrder from "./pages/sale/DeliveryOrder";
import DayEnd from "./pages/sale/DayEnd";
import StockOutward from "./pages/storekeeper/StockOutward";

export default function Directions() {
  const [jobNo, setJobNo] = useState("");
  return (
    <div>
      <Router>
        <ServiceContext.Provider value={{ jobNo, setJobNo }}>
          <Routes>
            {/* Common */}
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Cashire */}
            <Route path="/CreateSale" element={<Sale />} />
            <Route path="/CS.Invoice" element={<CS />} />
            <Route path="/DeliveryOrder" element={<DeliveryOrder />} />
            <Route path="/Dayend" element={<DayEnd />} />

            {/* Technician */}
            <Route path="/srr" element={<SRR />} />
            <Route
              path="/ServiceRepairRequest"
              element={<ServiceRepairRequest />}
            />
            <Route path="/ServiceTracker" element={<ServiceTracker />} />
            <Route path="/ServiceUpdate" element={<ServiceUpdate />} />

            {/* Storekeeper */}
            <Route path="/CreateOrder" element={<CreateOrder />} />
            <Route path="/InventoryTracker" element={<InventoryTracker />} />
            <Route path="/ViewOrder" element={<ViewOrder />} />
            <Route path="/UpdateOrder" element={<UpdateOrder />} />
            <Route path="/StockInward" element={<StockInward />} />
            <Route path="/StockOutward" element={<StockOutward />} />

            {/* Manager */}
            <Route path="/registration" element={<RegistrationForm />} />
          </Routes>
        </ServiceContext.Provider>
      </Router>
    </div>
  );
}
