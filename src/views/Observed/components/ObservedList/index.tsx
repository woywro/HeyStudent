import { useState } from "react";
import { useEffect } from "react";
import { ObservedItem } from "../ObservedItem";
import { useLoadingContext } from "../../../../context/loadingContext";
import { useUserContext } from "../../../../context/userContext";
import { db } from "../../../../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Container } from "./style";
import { LockedFunction } from "../../../../components/LockedFunction";
import { Loading } from "../../../../components/Loading";
import { Text } from "../../../../components/Text";

export const ObservedList = () => {
  const { user } = useUserContext();
  const [likedArray, setLikedArray] = useState([]);
  const { isLoading, setLoading } = useLoadingContext();

  const getData = async () => {
    setLoading(true);
    const array: any[] = [];
    const ref = collection(db, "Courses");
    const q = query(ref, where("id", "in", user.likedItems));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      array.push(doc.data());
    });
    setLikedArray(array);
    setLoading(false);
  };

  useEffect(() => {
    if (user && user.likedItems.length !== 0) {
      getData();
    }
  }, [user]);

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
