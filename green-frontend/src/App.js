import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Directions from "./Directions";
import { UserProvider } from "./UserProvider";

import { AuthContext } from "./Context/AuthContext";
import { useEffect, useState } from "react";
import React from "react";

function App({ children }) {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    login: (token, role) => {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      setAuthState({ token, role });
    },
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setAuthState({ token: null, role: null });
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token !== authState.token || role !== authState.role) {
      setAuthState({ token, role });
    }
  }, [authState.token, authState.role]);

  return (
    <AuthContext.Provider value={authState}>
      <UserProvider>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              login: authState.login,
              logout: authState.logout,
            });
          }
          return child;
        })}
        <div>
          <Directions />
        </div>
      </UserProvider>
    </AuthContext.Provider>
  );
}

export default App;
