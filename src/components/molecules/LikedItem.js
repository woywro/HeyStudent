import { doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { dataContext } from "../../App";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { Paper, Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import EventIcon from "@mui/icons-material/Event";
import { useCallback } from "react";
import { Recruitment } from "./Recruitment";
import { SubjectsDialog } from "./SubjectsDialog";
import SchoolIcon from "@mui/icons-material/School";
export const LikedItem = ({ element, likedArray, setLikedArray }) => {
  const context = useContext(dataContext);
  let navigate = useNavigate();
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
    let newArray = array.filter((e) => e.uid !== context.user.uid);
    const docRef = doc(db, "Courses", element.id);
    updateDoc(docRef, { willStudy: newArray });
    const docRef1 = doc(db, "Courses", element.id);
    updateDoc(docRef1, { willStudyCount: -newArray.length });
    setArray(newArray);
  };

  const viewMore = useCallback(() => {
    context.setChoosen(element);
    navigate("/element", { replace: false });
  }, []);

  const handleStopObserve = useCallback((e) => {
    e.stopPropagation();
    const newArray = context.userData.likedItems.filter(
      (x) => x !== element.id
    );
    context.setUserData({ likedItems: newArray });
    setLikedArray(likedArray.filter((z) => z.id !== element.id));
    updateDoc(doc(db, "Users", context.user.uid), {
      likedItems: newArray,
    });
    handleDislikeCourse(e);
  }, []);

  const hasBorder = () => {
    if (array.map((e) => e.uid).includes(context.user.uid)) {
      return 3;
    }
  };

  const courseName = element.name.join(" ");

  return (
    <>
      <Paper
        elevation={10}
        onClick={viewMore}
        sx={{
          padding: 2,
          position: "relative",
          cursor: "pointer",
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
