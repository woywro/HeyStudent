import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { defineSuffix } from "../../../utils/defineSuffix";
import { useUserDataContext } from "../../../context/userDataContext";
import { useUserContext } from "../../../context/userContext";
import { ItemType } from "../../../types";
import styled from "styled-components";
import { Button } from "../../../components/Button";
import { Text } from "../../../components/Text";

interface Props {
  data: ItemType;
}

const StyledIsInterested = styled.div`
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

export const IsInterested = ({ data }: Props) => {
  const { user } = useUserContext();
  const { userData, setUserData } = useUserDataContext([]);
  const [interested, setInterested] = useState(data.willStudy.length);

  const [array, setArray] = useState(data.willStudy);

  const handleObserveCourse = async () => {
    let a = userData.likedItems;
    a.push(data.id);
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
      const docRef = doc(db, "Courses", data.id);
      updateDoc(docRef, { willStudy: newArray });
      setInterested(newArray.length);
      handleObserveCourse();
      const docRef1 = doc(db, "Courses", data.id);
      updateDoc(docRef1, { willStudyCount: -newArray.length });
    }
  };

  const handleDislikeCourse = () => {
    let newArray = array.filter((e) => e.uid !== user.uid);
    const docRef = doc(db, "Courses", data.id);
    updateDoc(docRef, { willStudy: newArray });
    const docRef1 = doc(db, "Courses", data.id);
    updateDoc(docRef1, { willStudyCount: -newArray.length });
    setArray(newArray);
    setInterested(newArray.length);
  };

  return (
    <StyledIsInterested>
      <Text>
        {interested}{" "}
        {defineSuffix(
          interested,
          "osoba zainteresowana",
          "osoby zainteresowane",
          "osób zainteresowanych"
        )}
      </Text>
      {user && (
        <>
          {array.map((e) => e.uid).includes(user.uid) ? (
            <>
              <Text>Jesteś zainteresowany tym kierunkiem!</Text>
              <Button onClick={handleDislikeCourse}>
                Nie jestem zainteresowany
              </Button>
            </>
          ) : (
            <Button onClick={handleLikeCourse}>Jestem zainteresowany</Button>
          )}
        </>
      )}
    </StyledIsInterested>
  );
};
