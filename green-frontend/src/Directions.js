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

export default function Directions() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/sdf" element={<Sdf />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registration" element={<RegistrationForm />} />
        </Routes>
      </Router>
    </div>
  );
}
