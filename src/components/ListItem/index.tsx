import { db } from "../../firebase/firebase";
import { useUserContext } from "../../context/userContext";
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
import { Text } from "../Text";

interface Props {
  item: ItemType;
  key: string;
}

export const ListItem = ({ item, key }: Props) => {
  const ROUTE_POST_ID = "/course/[id]";
  const { user, setUser } = useUserContext();

  async function handleObserve() {
    let a = user.likedItems;
    a.push(item.id);
    setUser({ likedItems: a });
    await updateDoc(doc(db, "Users", user.uid), {
      likedItems: a,
    });
  }
  async function handleStopObserve() {
    const newArray: string[] = user.likedItems.filter(
      (e: string) => e !== item.id
    );
    setUser({ likedItems: newArray });
    await updateDoc(doc(db, "Users", user.uid), {
      likedItems: newArray,
    });
  }

  return (
    <Link
      href={{
        pathname: ROUTE_POST_ID,
        query: { id: item.id.toString() },
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
          (user.likedItems.includes(item.id) ? (
            <Text onClick={handleStopObserve}>stop</Text>
          ) : (
            <Text onClick={handleObserve}>start</Text>
          ))}
      </StyledListItem>
    </Link>
  );
};
