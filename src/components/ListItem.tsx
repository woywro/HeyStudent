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
import styled from "styled-components";

const StyledListItem = styled.li`
  border-radius: 10px;
  width: 100%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: inline-grid;
  grid-template-columns: 1fr 3fr 3fr 3fr 1fr;
  justify-items: start;
  align-items: center;
  position: relative;
  margin: 15px;
  padding: 10px;
  cursor: pointer;
`;
const StyledCourseTitle = styled.h1`
  font-size: 18px;
  font-weight: normal;
`;
const StyledCourseUniversity = styled.p`
  font-size: 15px;
`;
const StyledCourseCity = styled.p`
  font-size: 15px;
`;
const StyledCourseMatch = styled.p`
  font-size: 18px;
`;

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
    <Link
      href={{
        pathname: ROUTE_POST_ID,
        query: { id: item.id },
      }}
      passHref
    >
      <StyledListItem>
        <StyledCourseMatch>
          {item.university == "Politechnika Gdańska" ? "PG" : "UG"}
        </StyledCourseMatch>
        <StyledCourseTitle>{item.name.join(" ")}</StyledCourseTitle>
        <StyledCourseUniversity>{item.university}</StyledCourseUniversity>
        <StyledCourseCity>{item.city}</StyledCourseCity>
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
      </StyledListItem>
    </Link>
  );
};
