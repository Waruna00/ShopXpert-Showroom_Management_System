import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Login";
import RegistrationForm from "./pages/registration/Registration";
import { CashierDashboard } from "./pages/dashboard/CashierDashboard";
import Sale from "./pages/sale/CreateSale";
import ServiceRepairRequest from "./pages/technician/ServiceRequest";
import SRR from "./Invoices/SRR";
import CS from "./Invoices/CS";
import ServiceTracker from "./pages/technician/ServiceTracker";
import ServiceUpdate from "./pages/technician/ServiceUpdate";
import CreateOrder from "./pages/storekeeper/CreateOrder";
import InventoryTracker from "./pages/storekeeper/InventoryTracker";
import ViewOrder from "./pages/storekeeper/ViewOrder";
import UpdateOrder from "./pages/storekeeper/UpdateOrder";
import StockInward from "./pages/storekeeper/StockInward";
import DeliveryOrder from "./pages/sale/DeliveryOrder";
import DayEnd from "./pages/sale/DayEnd";
import StockOutward from "./pages/storekeeper/StockOutward";
import { AuthContext } from "./Context/AuthContext";
import NotFoundPage from "./pages/errorpage/NotFoundPage";
import TechnicianDashboard from "./pages/dashboard/TechnicianDashboard";
import StoreKeeperDashboard from "./pages/dashboard/StoreKeeperDashboard";
import FindJob from "./pages/customer/FindJob";
import ManageOrder from "./pages/manager/ManageOrder";
import AddSerial from "./pages/manager/AddSerial";
import SRN from "./Invoices/SRN";
import ManagerDashboard from "./pages/dashboard/ManagerDashboard";
import AddProduct from "./pages/manager/AddProduct";
import { useContext } from "react";
import UpdateProduct from "./pages/manager/UpdateProduct";

export default function Directions() {
  const authState = useContext(AuthContext);

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* Cashire */}
          {authState.role === "CASHIER" && (
            <>
              <Route path="/dashboard" element={<CashierDashboard />} />
              <Route path="/CreateSale" element={<Sale />} />
              <Route path="/CS.Invoice" element={<CS />} />
              <Route path="/DeliveryOrder" element={<DeliveryOrder />} />
              <Route path="/Dayend" element={<DayEnd />} />
              <Route path="/InventoryTracker" element={<InventoryTracker />} />
            </>
          )}

          {/* Technician */}
          {authState.role === "TECHNICIAN" && (
            <>
              <Route path="/dashboard" element={<TechnicianDashboard />} />
              <Route path="/srr" element={<SRR />} />
              <Route
                path="/ServiceRepairRequest"
                element={<ServiceRepairRequest />}
              />
              <Route path="/ServiceTracker" element={<ServiceTracker />} />
              <Route path="/ServiceUpdate" element={<ServiceUpdate />} />
              <Route path="/InventoryTracker" element={<InventoryTracker />} />
            </>
          )}

          {/* Storekeeper */}
          {authState.role === "STOREKEEPER" && (
            <>
              <Route path="/dashboard" element={<StoreKeeperDashboard />} />
              <Route path="/CreateOrder" element={<CreateOrder />} />
              <Route path="/InventoryTracker" element={<InventoryTracker />} />
              <Route path="/ViewOrder" element={<ViewOrder />} />
              <Route path="/UpdateOrder" element={<UpdateOrder />} />
              <Route path="/StockInward" element={<StockInward />} />
              <Route path="/StockOutward" element={<StockOutward />} />
            </>
          )}

          {/* Manager */}
          {authState.role === "MANAGER" && (
            <>
              <Route path="/registration" element={<RegistrationForm />} />
              <Route path="/dashboard" element={<ManagerDashboard />} />
              <Route path="/ManageOrder" element={<ManageOrder />} />
              <Route path="/AddSerial" element={<AddSerial />} />
              <Route path="/StockRecievedNote" element={<SRN />} />
              <Route path="/AddProduct" element={<AddProduct />} />
              <Route path="/UpdateProduct" element={<UpdateProduct />} />
              <Route path="/InventoryTracker" element={<InventoryTracker />} />
            </>
          )}

          {/* Customer */}
          <Route path="/FindServiceJob" element={<FindJob />} />
        </Routes>
      </Router>
    </div>
  );
}
