import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { db } from "../../firebase/firebase";
import { useUserContext } from "../../context/userContext";
import { useUserDataContext } from "../../context/userDataContext";
import Link from "next/link";
import { updateDoc, doc } from "firebase/firestore";
import { ItemType } from "../../types";
import {
  StyledListItem,
  CourseTitle,
  CourseUniversity,
  CourseCity,
  CourseMatch,
} from "./style";

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
        <CourseMatch>
          {item.university == "Politechnika Gdańska" ? "PG" : "UG"}
        </CourseMatch>
        <CourseTitle>{item.name.join(" ")}</CourseTitle>
        <CourseUniversity>{item.university}</CourseUniversity>
        <CourseCity>{item.city}</CourseCity>
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
