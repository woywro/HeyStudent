import { useState } from "react";
import { useEffect } from "react";
import { ObservedItem } from "../ObservedItem";
import { useLoadingContext } from "../../../../context/loadingContext";
import { useUserContext } from "../../../../context/userContext";
import { useUserDataContext } from "../../../../context/userDataContext";
import { db } from "../../../../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Container } from "./style";
import { LockedFunction } from "../../../../components/LockedFunction";
import { Loading } from "../../../../components/Loading";
import { Text } from "../../../../components/Text";

export const ObservedList = () => {
  const { user } = useUserContext();
  const { userData } = useUserDataContext();
  const [likedArray, setLikedArray] = useState([]);
  const { isLoading, setLoading } = useLoadingContext();

  useEffect(() => {
    if (user && userData.likedItems.length !== 0) {
      const getData = async () => {
        setLoading(true);
        const array: any[] = [];
        const ref = collection(db, "Courses");
        const q = query(ref, where("id", "in", userData.likedItems));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          array.push(doc.data());
        });
        setLikedArray(array);
        setLoading(false);
      };
      getData();
    }
  }, [userData]);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : !user ? (
        <LockedFunction />
      ) : likedArray.length == 0 ? (
        <Text>Nie obserwujesz żadnych kierunków</Text>
      ) : (
        likedArray.map((element) => {
          return (
            <ObservedItem
              element={element}
              likedArray={likedArray}
              setLikedArray={setLikedArray}
            />
          );
        })
      )}
    </Container>
  );
};
