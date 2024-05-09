import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../header";

function MainLayout() {
  return (
    <div>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default MainLayout;
