import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { db } from "../firebase/firebase";
import { useUserContext } from "../context/userContext";
import { useUserDataContext } from "../context/userDataContext";
import Link from "next/link";
import { updateDoc, doc } from "firebase/firestore";
import { ItemType } from "../types";
import styled from "styled-components";
import breakpoint from "../theme/breakpoints";
import { shadow } from "../mixnins/shadow";

const StyledListItem = styled.li`
  border-radius: 10px;
  width: 100%;
  ${shadow}
  display: inline-grid;
  justify-items: center;
  align-items: center;
  position: relative;
  margin: 15px;
  padding: 10px;
  cursor: pointer;
  @media only screen and ${breakpoint.device.xs} {
    grid-template-columns: 1fr 2fr 1fr 1fr;
  }
  @media only screen and ${breakpoint.device.lg} {
    grid-template-columns: 1fr 3fr 3fr 3fr 1fr;
    grid-template-rows: 1fr;
  }
`;
const StyledCourseTitle = styled.h1`
  font-size: 18px;
  font-weight: normal;
`;
const StyledCourseUniversity = styled.p`
  font-size: 15px;
  @media only screen and ${breakpoint.device.xs} {
    display: none;
  }
  @media only screen and ${breakpoint.device.lg} {
    display: flex;
  }
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
