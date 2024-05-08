import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/admin";
import IndexPage from "./pages";
import { QueryClient, QueryClientProvider } from "react-query";
import MainLayout from "@/components/layouts";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<IndexPage />} />
          </Route>
          <Route path="/admin/*" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
  </QueryClientProvider>
);
