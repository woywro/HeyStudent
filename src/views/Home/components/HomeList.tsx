import { ListItem } from "../../../components/ListItem";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import { db } from "../../../firebase/firebase";
import Image from "next/image";
import {
  collection,
  query,
  getDocs,
  limit,
  orderBy,
  where,
} from "firebase/firestore";
import { Typography } from "@mui/material";
import { useFieldsOfStudyContext } from "../../../context/fieldsOfStudyContext";
import { useLoadingContext } from "../../../context/loadingContext";
import { ItemType } from "../../../types";
import breakpoint from "../../../theme/breakpoints";
import styled from "styled-components";
import fp from "../../../../public/static/a.png";
import sp from "../../../../public/static/b.png";
import tp from "../../../../public/static/c.png";

const StyledHomeList = styled.ul`
  list-style: none;
  justify-content: center;
  align-items: center;
  padding: 20px;
  @media only screen and ${breakpoint.device.xs} {
    display: flex;
    flex-flow: column;
  }
  @media only screen and ${breakpoint.device.lg} {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;
    width: 80%;
  }
`;

const StyledContentCard = styled.li`
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 20px;
  width: 100%;
  position: relative;
`;

const StyledContentCardTitle = styled.h1`
  padding: 15px;
  font-size: 20px;
`;

const StyledContentCardImage = styled.div`
  width: 100%;
`;

export const HomeList = () => {
  const { fieldsOfStudy, setFieldsOfStudy } = useFieldsOfStudyContext();
  const { isLoading, setLoading } = useLoadingContext();

  useEffect(() => {
    async function getData() {
      const array: ItemType[] = [];
      const colRef = collection(db, "Courses");
      const q = query(colRef, orderBy("willStudyCount"), limit(3));
      const docSnap = await getDocs(q);
      docSnap.forEach((doc) => {
        array.push(doc.data());
      });
      setFieldsOfStudy(array);
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <StyledHomeList>
      <StyledContentCard>
        <StyledContentCardImage>
          <Image src={sp} alt="img" objectFit="cover" />
        </StyledContentCardImage>
        <StyledContentCardTitle>Najpopularniejsze</StyledContentCardTitle>
      </StyledContentCard>
      <StyledContentCard>
        <StyledContentCardImage>
          <Image src={fp} alt="img" objectFit="cover" />
        </StyledContentCardImage>
        <StyledContentCardTitle>Zyskujące popularność</StyledContentCardTitle>
      </StyledContentCard>
      <StyledContentCard>
        <StyledContentCardImage>
          <Image src={tp} alt="img" objectFit="cover" />
        </StyledContentCardImage>
        <StyledContentCardTitle>Dzisiaj na topie</StyledContentCardTitle>
      </StyledContentCard>
    </StyledHomeList>
  );
};
