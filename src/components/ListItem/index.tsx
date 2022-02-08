import { db } from "../../firebase/firebase";
import { useUserContext } from "../../context/userContext";
import Link from "next/link";
import { updateDoc, doc } from "firebase/firestore";
import { ItemType } from "../../types";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  StyledListItem,
  CourseTitle,
  CourseUniversity,
  CourseCity,
} from "./style";
import { Text } from "../Text";
import { useCallback } from "react";
import { Loading } from "../Loading";

interface Props {
  item: ItemType;
  key: string;
}

export const ListItem = ({ item, key }: Props) => {
  const ROUTE_POST_ID = "/course/[id]";
  const { user, setUser } = useUserContext();

  const handleObserve = useCallback(
    async (e) => {
      console.log(user);
      e.stopPropagation();
      let a = user.likedItems;
      a.push(item.id);
      setUser({ likedItems: a, uid: user.uid, name: user.name });
      await updateDoc(doc(db, "Users", user.uid.toString()), {
        likedItems: a,
      });
    },
    [user]
  );
  const handleStopObserve = useCallback(
    async (e) => {
      e.stopPropagation();
      const newArray: string[] = user.likedItems.filter(
        (a: string) => a !== item.id
      );
      setUser({ likedItems: newArray, uid: user.uid, name: user.name });
      await updateDoc(doc(db, "Users", user.uid.toString()), {
        likedItems: newArray,
      });
    },
    [user]
  );

  return (
    <Link
      href={{
        pathname: ROUTE_POST_ID,
        query: { id: item.id.toString() },
      }}
      passHref
    >
      <StyledListItem>
        <CourseTitle>{item.name.join(" ")}</CourseTitle>
        <CourseUniversity>{item.university}</CourseUniversity>
        <CourseCity>{item.city}</CourseCity>
        {user &&
          (user.likedItems.includes(item.id) ? (
            <Text onClick={handleStopObserve}>
              <AiFillHeart />
            </Text>
          ) : (
            <Text onClick={handleObserve}>
              <AiOutlineHeart />
            </Text>
          ))}
      </StyledListItem>
    </Link>
  );
};
