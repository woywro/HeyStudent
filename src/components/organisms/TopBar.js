import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LeftDrawer from "./LeftDrawer";
import { dataContext } from "../../App";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router";
import { logout } from "../../firebase/firebase";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useCallback, useState } from "react";

export const TopBar = () => {
  const context = useContext(dataContext);
  const [isOpen, setOpen] = useState(false);
  let navigate = useNavigate();
  const location = useLocation();
  const handleOpenMenu = useCallback(() => {
    navigate(-1);
  }, []);
  const handleCloseMenu = useCallback(() => {
    setOpen(!isOpen);
  }, []);
  const handleLogin = useCallback(() => {
    navigate("/login", { replace: false });
  }, []);
  const handleLogout = useCallback(() => {
    navigate("/", { replace: false });
    logout();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <LeftDrawer isOpen={isOpen} setOpen={setOpen} />
      <AppBar elevation={0} position="static" sx={{ color: "white" }}>
        <Toolbar>
          {location.pathname == "/element" ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={handleOpenMenu}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          ) : (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={handleCloseMenu}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            HeyStudent
          </Typography>

          {context.user ? (
            <Button color="inherit" onClick={handleLogout}>
              Wyloguj
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Zaloguj
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
