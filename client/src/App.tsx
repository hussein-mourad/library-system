import AdminPanel from "@/components/admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HelloWorld from "./HelloWorld";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HelloWorld />} />
        <Route path="/admin/*" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
