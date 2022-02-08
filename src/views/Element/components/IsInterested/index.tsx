import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { defineSuffix } from "../../../../utils/defineSuffix";
import { useUserContext } from "../../../../context/userContext";
import { ItemType } from "../../../../types";
import { Button } from "../../../../components/Button";
import { Text } from "../../../../components/Text";
import { StyledIsInterested } from "./style";

interface Props {
  data: ItemType;
}

export const IsInterested = ({ data }: Props) => {
  const { user, setUser } = useUserContext();
  const [interested, setInterested] = useState(data.willStudy.length);

  const [willStudy, setWillStudy] = useState(data.willStudy);

  const handleObserveCourse = async () => {
    let a = user.likedItems;
    a.push(data.id);
    setUser({ likedItems: a });
    await updateDoc(doc(db, "Users", user.uid), {
      likedItems: a,
    });
  };

  const handleLikeCourse = async () => {
    const newUser = {
      uid: user.uid,
    };
    const newArray = [...willStudy, newUser];
    const docRef = doc(db, "Courses", data.id);
    updateDoc(docRef, { willStudy: newArray });
    setInterested(newArray.length);
    setWillStudy(newArray);
    handleObserveCourse();
  };

  const handleDislikeCourse = () => {
    let newArray = willStudy.filter((e) => e.uid !== user.uid);
    const docRef = doc(db, "Courses", data.id);
    updateDoc(docRef, { willStudy: newArray });
    setWillStudy(newArray);
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
          {willStudy.map((e) => e.uid).includes(user.uid) ? (
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
