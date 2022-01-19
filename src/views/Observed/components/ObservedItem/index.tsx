import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { useState } from "react";
import { IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useCallback } from "react";
import { useUserContext } from "../../../../context/userContext";
import { useUserDataContext } from "../../../../context/userDataContext";
import Link from "next/link";
import { ItemType } from "../../../../types";
import { ChangeEvent } from "react";
import {
  StyledObservedItem,
  StyledCourseTitle,
  StyledCourseUniversity,
  StyledCourseCity,
} from "./style";

interface Props {
  element: ItemType;
  likedArray: ItemType[];
  setLikedArray: (arg: any) => void;
}

export const ObservedItem = ({ element, likedArray, setLikedArray }: Props) => {
  const ROUTE_POST_ID = "element/[id]";
  const { userData, setUserData } = useUserDataContext();
  const { user } = useUserContext();
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
    const newArray = userData.likedItems.filter((x) => x !== element.id);
    setUserData({ likedItems: newArray });
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
        <IconButton color="primary">
          <StarIcon
            sx={{ color: "secondary.main" }}
            onClick={handleStopObserve}
          />
        </IconButton>
      </StyledObservedItem>
    </Link>
  );
};
