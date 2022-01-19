import { Button } from "../../../components/Button";
import { useState, useCallback } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { query, where, limit, updateDoc } from "firebase/firestore";
import { useUserContext } from "../../../context/userContext";
import { useLoadingContext } from "../../../context/loadingContext";
import { ItemType } from "../../../types";
import styled from "styled-components";
import { ListItem } from "../../../components/ListItem";
import { Loading } from "../../../components/Loading";

interface Props {
  element: ItemType;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  width: 100%;
`;

export const ShowSimilar = ({ element }: Props) => {
  const { user } = useUserContext();
  const { isLoading, setLoading } = useLoadingContext();
  const [similar, setSimilar] = useState<ItemType[]>([]);

  const similarLimit = useCallback(() => {
    if (user) {
      return limit(4);
    } else {
      return limit(2);
    }
  }, [user]);

  const search = useCallback(
    async (
      colToSearch: string,
      field: string,
      operator: string,
      value: string
    ) => {
      setLoading(true);
      const array: any[] = [];
      const ref = collection(db, colToSearch);
      const q = query(ref, where(field, operator, value), similarLimit());
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        array.push(doc.data());
      });
      const arrayFiltered: any[] = array.filter((e) => e.id !== element.id);
      setSimilar(arrayFiltered);
      setLoading(false);
    },
    [element]
  );

  return (
    <Container>
      <Button
        onClick={() =>
          search("Courses", "category", "array-contains-any", element.category)
        }
      >
        pokaż podobne kierunki
      </Button>
      {isLoading ? (
        <Loading />
      ) : (
        similar.map((e) => {
          return <ListItem item={e} key={e.id} />;
        })
      )}
    </Container>
  );
};
