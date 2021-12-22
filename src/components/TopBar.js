import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LeftDrawer from "./LeftDrawer";
import { dataContext } from "../pages/_app";

import { logout } from "../firebase/firebase";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useCallback, useState } from "react";
import { useUserContext } from "../context/userContext";
import { useRouter } from "next/router";

export const TopBar = () => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const { user } = useUserContext();
  const handleBack = useCallback(() => {
    router.back();
  }, []);
  const handleCloseMenu = useCallback(() => {
    setOpen(!isOpen);
  }, []);
  const handleLogin = useCallback(() => {
    router.push("/login");
  }, []);
  const handleLogout = useCallback(() => {
    router.push("/");
    logout();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <LeftDrawer isOpen={isOpen} setOpen={setOpen} />
      <AppBar elevation={0} position="static" sx={{ color: "white" }}>
        <Toolbar>
          {router.pathname == "/element/[id]" ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={handleBack}
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

          {user ? (
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
