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
import breakpoint from "../../../../theme/breakpoints";
import styled from "styled-components";
import computer from "../../../../../public/images/1.png";
import tech from "../../../../../public/images/2.png";
import medical from "../../../../../public/images/3.png";
import gdansk from "../../../../../public/images/4.png";
import poznan from "../../../../../public/images/5.png";
import krakow from "../../../../../public/images/6.png";
import { CardLink } from "../CardLink";
import { StyledHomeList, Category, Title } from "./style";

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
      <Title>Kategorie</Title>
      <Category>
        <CardLink title="techniczne" toSearch={"techniczne"} img={tech} />
        <CardLink
          title="informatyczne"
          toSearch={"informatyczne"}
          img={computer}
        />
        <CardLink title="medyczne" toSearch={"medyczne"} img={medical} />
      </Category>
      <Title>Miasta</Title>
      <Category>
        <CardLink title="gdańsk" toSearch={"gdańsk"} img={gdansk} />
        <CardLink title="poznań" toSearch={"poznań"} img={poznan} />
        <CardLink title="kraków" toSearch={"kraków"} img={krakow} />
      </Category>
    </StyledHomeList>
  );
};
