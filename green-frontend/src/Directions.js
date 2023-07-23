import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import LoginPage from "./Login";
import Sdf from "./pages/sdf";
import RegistrationForm from "./pages/registration/Registration";
import { Dashboard } from "./pages/dashboard/dashboard";
import Sale from "./pages/sale";
import ServiceRepairRequest from "./pages/technician/ServiceRequest";
import SRR from "./Invoices/SRR";
import CS from "./Invoices/CS";
import ServiceTracker from "./pages/technician/ServiceTracker";
import ServiceUpdate from "./pages/technician/ServiceUpdate";

export default function Directions() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/sdf" element={<Sdf />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/sale" element={<Sale />} />
          <Route
            path="/ServiceRepairRequest"
            element={<ServiceRepairRequest />}
          />
          <Route path="/srr" element={<SRR />} />
          <Route path="/CS.Invoice" element={<CS />} />
          <Route path="/ServiceTracker" element={<ServiceTracker />} />
          <Route path="/ServiceUpdate" element={<ServiceUpdate />} />
        </Routes>
      </Router>
    </div>
  );
}
