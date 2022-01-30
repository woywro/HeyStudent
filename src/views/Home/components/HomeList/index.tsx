import { useEffect } from "react";
import { db } from "../../../../firebase/firebase";
import {
  collection,
  query,
  getDocs,
  limit,
  orderBy,
  where,
} from "firebase/firestore";
import { useFieldsOfStudyContext } from "../../../../context/fieldsOfStudyContext";
import { useLoadingContext } from "../../../../context/loadingContext";
import { ItemType } from "../../../../types";
import { Text } from "../../../../components/Text";
import breakpoint from "../../../../theme/breakpoints";
import styled from "styled-components";
import computer from "../../../../../public/images/1.png";
import tech from "../../../../../public/images/2.png";
import medical from "../../../../../public/images/3.png";
import gdansk from "../../../../../public/images/4.png";
import poznan from "../../../../../public/images/5.png";
import krakow from "../../../../../public/images/6.png";
import { CardLink } from "../CardLink";
import { StyledHomeList } from "./style";
import { shadow } from "../../../../mixnins/shadow";
import { Button } from "../../../../components/Button";
import { Cards } from "../Cards";

const Title = styled.h1`
  font-size: 50px;
  color: #696969;
  padding: 10px;
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
      <Cards title="#Najciekawsze Wyszukiwania">
        <CardLink
          title="Gdańsk"
          toSearch={"Gdańsk"}
          text={"Najciekawsze kierunki z miasta Gdańsk"}
          bg={4}
          grStart={1}
          grEnd={3}
        />
        <CardLink
          title="Poznań"
          toSearch={"Poznań"}
          text={"Najciekawsze kierunki z miasta Poznań"}
          bg={3}
          grStart={3}
          grEnd={4}
        />
        <CardLink
          title="Informatyka Gdańsk"
          toSearch={"informatyka gdańsk"}
          text={"Najciekawsze kierunki informatyczne w Gdańsku"}
          bg={0}
          grStart={4}
          grEnd={5}
        />
        <CardLink
          title="Kraków"
          toSearch={"Kraków"}
          text={"Najciekawsze kierunki z miasta Kraków"}
          bg={0}
          grStart={1}
          grEnd={4}
        />
        <CardLink
          title="Techniczne"
          toSearch={"techniczne"}
          text={"Wybrane techniczne kierunki"}
          bg={5}
          grStart={4}
          grEnd={5}
        />
        <CardLink
          title="Informatyczne"
          toSearch={"informatyczne"}
          text={"Najciekawsze kierunki informatyczne"}
          bg={0}
          grStart={1}
          grEnd={2}
        />
        <CardLink
          title="Medyczne"
          toSearch={"medyczne"}
          text={"Zbiór kierunków medycznych"}
          bg={1}
          grStart={2}
          grEnd={5}
        />
        <CardLink
          title="Programowanie"
          toSearch={"programowanie"}
          text={"Lubisz programowanie?"}
          bg={5}
          grStart={1}
          grEnd={3}
        />
        <CardLink
          title="Medyczne Poznań"
          toSearch={"medyczne poznań"}
          text={"Kierunki medyczne w Poznaniu"}
          bg={2}
          grStart={3}
          grEnd={4}
        />
        <CardLink
          title="Biologia"
          toSearch={"biologia"}
          text={"Wszystko co związane z biologią"}
          bg={0}
          grStart={4}
          grEnd={5}
        />
        <CardLink
          title="Budownictwo"
          toSearch={"budownictwo"}
          text={"Zbiór kierunków związanych z budownictwem"}
          bg={4}
          grStart={2}
          grEnd={5}
        />
      </Cards>
    </StyledHomeList>
  );
};
