import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import { db } from "../firebase/firebase";
import { useUserContext } from "../context/userContext";
import { useUserDataContext } from "../context/userDataContext";
import Link from "next/link";
import { updateDoc, doc } from "firebase/firestore";
import { ItemType } from "../types";

interface Props {
  item: ItemType;
  key: string;
}

export const ListItem = ({ item, key }: Props) => {
  const ROUTE_POST_ID = "/element/[id]";
  const { user } = useUserContext();
  const { setUserData, userData } = useUserDataContext();

  async function handleObserve() {
    let a = userData.likedItems;
    a.push(item.id);
    setUserData({ likedItems: a });
    await updateDoc(doc(db, "Users", user.uid), {
      likedItems: a,
    });
  }
  async function handleStopObserve() {
    const newArray: string[] = userData.likedItems.filter(
      (e: string) => e !== item.id
    );
    setUserData({ likedItems: newArray });
    await updateDoc(doc(db, "Users", user.uid), {
      likedItems: newArray,
    });
  }

  return (
    <Paper
      elevation={5}
      sx={{
        position: "relative",
        padding: 1,
        borderRadius: "20px",
        marginTop: 1,
        width: 1,
      }}
    >
      <Grid container spacing={0.5}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
              padding: 1,
            }}
          >
            {item.name.join(" ")}
          </Typography>
        </Grid>
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            padding: 0,
          }}
        >
          {user &&
            userData !== "" &&
            (userData.likedItems.includes(item.id) ? (
              <IconButton color="primary">
                <StarIcon
                  sx={{ color: "secondary.main" }}
                  onClick={handleStopObserve}
                />
              </IconButton>
            ) : (
              <IconButton color="primary">
                <StarBorderIcon
                  sx={{ color: "secondary.main" }}
                  onClick={handleObserve}
                />
              </IconButton>
            ))}
        </Box>
        <Grid item xs={12}>
          <Typography variant="body2">{item.university}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            {item.type}, {item.degree}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Link
            href={{
              pathname: ROUTE_POST_ID,
              query: { id: item.id },
            }}
            passHref
            // replace
          >
            <a>
              <Button variant="outlined">zobacz</Button>
            </a>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};
