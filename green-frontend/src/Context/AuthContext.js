import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  role: null,
  login: (token, role) => {},
  logout: () => {},
});
