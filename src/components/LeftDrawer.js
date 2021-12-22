import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { dataContext } from "../pages/_app";
import { useContext, useCallback } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useUserContext } from "../context/userContext";
import { useRouter } from "next/router";

export default function LeftDrawer({ isOpen, setOpen }) {
  const matches = useMediaQuery("(min-width:600px)");
  const router = useRouter();
  const { user } = useUserContext();
  const handleCloseMenu = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        anchor={"left"}
        open={isOpen}
        variant="temporary"
        onClose={handleCloseMenu}
      >
        <Box
          sx={{ width: "left" === "top" || "left" === "bottom" ? "auto" : 250 }}
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <List>
            <ListItem sx={{ padding: 1 }} button>
              <ListItemText
                primary="Wyszukiwanie"
                onClick={() => router.push("/")}
              />
            </ListItem>
            {user && (
              <>
                <ListItem sx={{ padding: 1 }} button>
                  <ListItemText
                    primary="Obserwowane kierunki"
                    onClick={() => router.push("/observed")}
                  />
                </ListItem>
                <Divider />
                <ListItem sx={{ padding: 1 }} button>
                  <ListItemText
                    primary="Dodawanie kierunku"
                    onClick={() => router.push("/add")}
                  />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
