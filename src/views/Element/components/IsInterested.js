import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { dataContext } from "../../../App";
import { useContext, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { Box } from "@mui/system";
import { defineSuffix } from "../../../utils/defineSuffix";
import { useCallback } from "react";
import {
  userDataContext,
  useUserDataContext,
} from "../../../context/userDataContext";
import { useUserContext } from "../../../context/userContext";
import { useChoosenContext } from "../../../context/choosenContext";

export const IsInterested = () => {
  const { choosen, setChoosen } = useChoosenContext();

  const { user, setUser } = useUserContext();
  const { userData, setUserData } = useUserDataContext();
  const [interested, setInterested] = useState(choosen.willStudy.length);

  const [array, setArray] = useState(choosen.willStudy);

  const handleObserveCourse = async () => {
    let a = userData.likedItems;
    a.push(choosen.id);
    setUserData({ likedItems: a });
    await updateDoc(doc(db, "Users", user.uid), {
      likedItems: a,
    });
  };

  const handleLikeCourse = async () => {
    if (!array.map((e) => e.uid).includes(user.uid)) {
      let newArray = array.slice();
      const newUser = {
        uid: user.uid,
      };
      newArray.push(newUser);
      setArray(newArray);
      const docRef = doc(db, "Courses", choosen.id);
      updateDoc(docRef, { willStudy: newArray });
      setInterested(newArray.length);
      handleObserveCourse();
      const docRef1 = doc(db, "Courses", choosen.id);
      updateDoc(docRef1, { willStudyCount: -newArray.length });
    }
  };

  const handleDislikeCourse = () => {
    let newArray = array.filter((e) => e.uid !== user.uid);
    const docRef = doc(db, "Courses", choosen.id);
    updateDoc(docRef, { willStudy: newArray });
    const docRef1 = doc(db, "Courses", choosen.id);
    updateDoc(docRef1, { willStudyCount: -newArray.length });
    setArray(newArray);
    setInterested(newArray.length);
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 1,
          width: 1,
          position: "relative",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexFlow: "column",
          padding: 0,
          backgroundColor: "primary.main",
        }}
      >
        <Typography variant="subtitle1">
          {interested}{" "}
          {defineSuffix(
            interested,
            "osoba zainteresowana",
            "osoby zainteresowane",
            "osób zainteresowanych"
          )}
        </Typography>
        {user && (
          <>
            {array.map((e) => e.uid).includes(user.uid) ? (
              <>
                <Typography variant="subtitle2">
                  Jesteś zainteresowany tym kierunkiem!
                </Typography>
                <Button
                  color="secondary"
                  sx={{
                    margin: 0.5,
                  }}
                  variant="contained"
                  onClick={handleDislikeCourse}
                >
                  Nie jestem zainteresowany
                </Button>
              </>
            ) : (
              <Button
                sx={{
                  margin: 0.5,
                  color: "secondary.main",
                  borderColor: "secondary.main",
                }}
                variant="outlined"
                onClick={handleLikeCourse}
              >
                Jestem zainteresowany
              </Button>
            )}
          </>
        )}
      </Box>
    </>
  );
};
