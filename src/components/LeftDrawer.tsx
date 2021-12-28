import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useCallback } from "react";
import { useUserContext } from "../context/userContext";
import { useRouter } from "next/router";

interface Props {
  isOpen: boolean;
  setOpen: (arg: boolean) => void;
}

export default function LeftDrawer({ isOpen, setOpen }: Props) {
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
        <Box role="presentation" onClick={() => setOpen(false)}>
          <List>
            <ListItem sx={{ padding: 1 }} button>
              <ListItemText
                primary="Strona główna"
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
