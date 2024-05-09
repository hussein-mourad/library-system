import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { ToggleThemeButton, UserMenu } from "react-admin";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";

const pages = [
  {
    name: "Books",
    path: "/books",
  },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box component="nav" className="flex flex-grow items-center">
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box className="hidden md:flex items-center space-x-2 mr-3">
              <ImportContactsIcon />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  fontWeight: 500,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Library
              </Typography>
            </Box>

            <Box className="mr-6 md:hidden">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" component="a" href="/">
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box className="flex flex-grow md:hidden items-center space-x-2">
              <ImportContactsIcon />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  fontWeight: 500,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Library
              </Typography>
            </Box>

            <Box className="hidden md:flex flex-grow items-center">
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  variant="text"
                  href={page.path}
                  sx={{ color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <ToggleThemeButton />
            <UserMenu />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
export default Header;
