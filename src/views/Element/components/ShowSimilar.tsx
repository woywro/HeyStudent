import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";

import { Button } from "../../../components/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { query, where, limit, updateDoc } from "firebase/firestore";
import { CircularProgress } from "@mui/material";
import { useUserContext } from "../../../context/userContext";
import { useLoadingContext } from "../../../context/loadingContext";
import { useRouter } from "next/router";
import { ItemType } from "../../../types";
import styled from "styled-components";
import { ListItem } from "../../../components/ListItem";
import { Text } from "../../../components/Text";

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
  const router = useRouter();
  const { user } = useUserContext();
  const { isLoading, setLoading } = useLoadingContext();
  const [similar, setSimilar] = useState<ItemType[]>([]);
  const [year, setYear] = useState(1);
  const handleChange = (event) => {
    setYear(event.target.value);
  };

  function similarLimit() {
    if (user) {
      return limit(4);
    } else {
      return limit(2);
    }
  }

  async function search(
    colToSearch: string,
    field: string,
    operator: string,
    value: string
  ) {
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
  }

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
        <Box sx={{ width: "100%", height: "100%" }}>
          <CircularProgress sx={{ color: "secondary.main" }} />
        </Box>
      ) : (
        similar.map((e) => {
          return <ListItem item={e} key={e.id} />;
        })
      )}
    </Container>
  );
};
