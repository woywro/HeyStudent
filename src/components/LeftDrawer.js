import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// import { useNavigate } from "react-router-dom";
import { dataContext } from "../App";
import { useContext, useCallback } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useUserContext } from "../context/userContext";

export default function LeftDrawer({ isOpen, setOpen }) {
  const matches = useMediaQuery("(min-width:600px)");
  const { user } = useUserContext();
  // let navigate = useNavigate();
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
                // onClick={() => navigate("/", { replace: false })}
              />
            </ListItem>
            {user && (
              <>
                <ListItem sx={{ padding: 1 }} button>
                  <ListItemText
                    primary="Obserwowane kierunki"
                    // onClick={() => navigate("/observed", { replace: false })}
                  />
                </ListItem>
                <Divider />
                <ListItem sx={{ padding: 1 }} button>
                  <ListItemText
                    primary="Dodawanie kierunku"
                    // onClick={() => navigate("/add", { replace: false })}
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
