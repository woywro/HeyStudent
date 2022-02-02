import { useEffect, useState } from "react";
import { db } from "../../../../firebase/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { useLoadingContext } from "../../../../context/loadingContext";
import { ItemType } from "../../../../types";
import styled from "styled-components";
import { CardLink } from "../CardLink";
import { StyledHomeList } from "./style";
import { Cards } from "../Cards";
import { CardLinkInterface } from "../../../../types";

export const HomeList = () => {
  const [CardLinks, setCardLinks] = useState<CardLinkInterface[]>([]);
  const { isLoading, setLoading } = useLoadingContext();

  useEffect(() => {
    async function getData() {
      const array: ItemType[] = [];
      const colRef = collection(db, "Cards");
      const q = query(colRef);
      const docSnap = await getDocs(q);
      docSnap.forEach((doc) => {
        array.push(doc.data());
      });
      setCardLinks(array);
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <StyledHomeList>
      <Cards title="Odkrywaj kierunki">
        {CardLinks.map((e) => {
          return (
            <CardLink
              title={e.title}
              toSearch={e.toSearch}
              text={e.text}
              bg={e.bg}
            />
          );
        })}
      </Cards>
    </StyledHomeList>
  );
};
