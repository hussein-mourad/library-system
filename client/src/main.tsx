import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPanel from "@/components/admin";
import jwtTokenAuthProvider, {
  fetchJsonWithAuthJWTToken,
} from "@/providers/auth-provider";
import Library from "@/components/library";
import drfProvider from "./providers/drf-provider";
import { API_URL } from "@/config";

const apiUrl = `${API_URL}/api`;
const authProvider = jwtTokenAuthProvider({
  obtainAuthTokenUrl: `${apiUrl}/token/`,
  refreshTokenUrl: `${apiUrl}/token/refresh/`,
});
const dataProvider = drfProvider(apiUrl, fetchJsonWithAuthJWTToken);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <Library dataProvider={dataProvider} authProvider={authProvider} />
          }
        />
        <Route
          path="/admin/*"
          element={
            <AdminPanel
              dataProvider={dataProvider}
              authProvider={authProvider}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
