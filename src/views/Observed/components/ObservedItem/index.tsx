import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { useState } from "react";
import { useCallback } from "react";
import { useUserContext } from "../../../../context/userContext";
import Link from "next/link";
import { ItemType } from "../../../../types";
import { ChangeEvent } from "react";
import {
  StyledObservedItem,
  StyledCourseTitle,
  StyledCourseUniversity,
  StyledCourseCity,
} from "./style";
import { Text } from "../../../../components/Text";
import { Button } from "../../../../components/Button";

interface Props {
  element: ItemType;
  likedArray: ItemType[];
  setLikedArray: (arg: any) => void;
}

export const ObservedItem = ({ element, likedArray, setLikedArray }: Props) => {
  const ROUTE_POST_ID = "course/[id]";
  const { user, setUser } = useUserContext();
  const [array, setArray] = useState(element.willStudy);

  const handleDislikeCourse = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    let newArray = array.filter((e) => e.uid !== user.uid);
    const docRef = doc(db, "Courses", element.id);
    updateDoc(docRef, { willStudy: newArray });
    const docRef1 = doc(db, "Courses", element.id);
    updateDoc(docRef1, { willStudyCount: -newArray.length });
    setArray(newArray);
  };

  const handleStopObserve = useCallback((e) => {
    e.stopPropagation();
    const newArray = user.likedItems.filter((x) => x !== element.id);
    setUser({ likedItems: newArray });
    setLikedArray(likedArray.filter((z) => z.id !== element.id));
    updateDoc(doc(db, "Users", user.uid), {
      likedItems: newArray,
    });
    handleDislikeCourse(e);
  }, []);

  const hasBorder = () => {
    if (array.map((e) => e.uid).includes(user.uid)) {
      return "2px solid #039be5;";
    }
  };

  return (
    <Link
      href={{
        pathname: ROUTE_POST_ID,
        query: { id: element.id },
      }}
      passHref
    >
      <StyledObservedItem hasBorder={hasBorder}>
        <StyledCourseTitle>{element.name.join(" ")}</StyledCourseTitle>
        <StyledCourseUniversity>{element.university}</StyledCourseUniversity>
        <StyledCourseCity>{element.city}</StyledCourseCity>
        <Button onClick={handleStopObserve}>x</Button>
      </StyledObservedItem>
    </Link>
  );
};
