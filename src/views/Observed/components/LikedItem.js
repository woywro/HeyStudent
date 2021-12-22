import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { Paper, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { useState } from "react";
import { IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import EventIcon from "@mui/icons-material/Event";
import { useCallback } from "react";
import { Recruitment } from "./Recruitment";
import { SubjectsDialog } from "./SubjectsDialog";
import SchoolIcon from "@mui/icons-material/School";
import { useUserContext } from "../../../context/userContext";
import { useUserDataContext } from "../../../context/userDataContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

export const LikedItem = ({ element, likedArray, setLikedArray }) => {
  const ROUTE_POST_ID = "element/[id]";
  const router = useRouter();
  const { userData, setUserData } = useUserDataContext();
  const { user, setUser } = useUserContext();
  const [openRecruitment, setOpenRecruitment] = useState(false);
  const [openSubjectsDialog, setOpenSubjectsDialog] = useState(false);
  const [array, setArray] = useState(element.willStudy);

  const handleOpenRecruitment = useCallback((e) => {
    e.stopPropagation();
    setOpenRecruitment(true);
  }, []);
  const handleOpenSubjectsDialog = useCallback((e) => {
    e.stopPropagation();
    setOpenSubjectsDialog(true);
  }, []);

  const handleDislikeCourse = (e) => {
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
      return 3;
    }
  };

  const courseName = element.name.join(" ");

  return (
    <>
      <Paper
        elevation={10}
        sx={{
          padding: 2,
          position: "relative",
          width: 1,
          marginBottom: 1.5,
          borderRadius: "20px",
          border: hasBorder(),
          borderColor: "secondary.main",
        }}
      >
        <Typography sx={{ padding: 0.5 }} variant="h5">
          {courseName}
        </Typography>
        <Typography variant="subtitle1">{element.university}</Typography>
        <Paper elevation={3} sx={{ borderRadius: "20px" }}>
          <Stack
            sx={{
              margin: 1,
            }}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <IconButton color="primary">
              <EventIcon
                sx={{ color: "secondary.main" }}
                onClick={handleOpenRecruitment}
              />
            </IconButton>
            <IconButton color="primary">
              <SchoolIcon
                sx={{ color: "secondary.main" }}
                onClick={handleOpenSubjectsDialog}
              />
            </IconButton>
            <IconButton color="primary">
              <StarIcon
                sx={{ color: "secondary.main" }}
                onClick={handleStopObserve}
              />
            </IconButton>
          </Stack>
        </Paper>
        <Link
          href={{
            pathname: ROUTE_POST_ID,
            query: { id: element.id },
          }}
          passHref
        >
          <a>
            <Button variant="outlined">zobacz</Button>
          </a>
        </Link>
      </Paper>
      <Recruitment
        element={element}
        isOpen={openRecruitment}
        setIsOpen={setOpenRecruitment}
      />
      <SubjectsDialog
        element={element}
        isOpen={openSubjectsDialog}
        setIsOpen={setOpenSubjectsDialog}
      />
    </>
  );
};
