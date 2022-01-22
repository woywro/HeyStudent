import { useEffect, useState } from "react";
import { ShowSimilar } from "../ShowSimilar";
import { Chat } from "../Chat";
import { ReportError } from "../ReportError";
import { ItemType } from "../../../../types";
import styled from "styled-components";
import { IsInterested } from "../IsInterested";
import Accordion from "../../../../components/Accordion";
import { Text } from "../../../../components/Text";
import {
  StyledCourseElementList,
  StyledCourseElement,
  StyledCourseElementTitle,
  SubjectsGrid,
} from "./style";

interface Props {
  element: ItemType;
}
export const CourseElementList = ({ element }: Props) => {
  const [semester, setYear] = useState(1);
  const handleChange = (event) => {
    setYear(event.target.value);
  };
  function openWebsite(url) {
    window.open(url, "_blank");
  }

  const courseSubjectsFiltered = element.subjects
    // .filter((e) => e.semester == semester)
    .sort((a, b) => b.hours - a.hours);
  return (
    <StyledCourseElementList>
      <StyledCourseElement>
        <StyledCourseElementTitle>Zainteresowanie</StyledCourseElementTitle>
        <IsInterested data={element} />
      </StyledCourseElement>
      <StyledCourseElement>
        <StyledCourseElementTitle>
          Informacje o uczelni
        </StyledCourseElementTitle>
        <Text>{element.university}</Text>
        <Text>{element.departament}</Text>
        <Text>{element.contact}</Text>
        <Text onClick={() => openWebsite(element.website)}>
          strona internetowa
        </Text>
      </StyledCourseElement>
      <StyledCourseElement>
        <StyledCourseElementTitle>opis kierunku</StyledCourseElementTitle>
        <Text>{element.description}</Text>
      </StyledCourseElement>
      <StyledCourseElement>
        <StyledCourseElementTitle>
          przedmioty rekrutacji
        </StyledCourseElementTitle>
        <SubjectsGrid>
          {element.requiredSubjects.map((e) => {
            return <Text>{e}</Text>;
          })}
        </SubjectsGrid>
      </StyledCourseElement>
      <StyledCourseElement>
        <StyledCourseElementTitle>
          próg punktowy {element.minPoints.year}
        </StyledCourseElementTitle>
        <Text>{element.minPoints.value}</Text>
      </StyledCourseElement>
      <StyledCourseElement>
        <StyledCourseElementTitle>przedmioty</StyledCourseElementTitle>
        <>
          {courseSubjectsFiltered.map((e) => {
            return <Accordion title={`${e.name} ${e.hours}h`} content={e} />;
          })}
        </>
      </StyledCourseElement>
      <StyledCourseElement>
        <StyledCourseElementTitle>podobne kierunki</StyledCourseElementTitle>
        <ShowSimilar element={element} />
      </StyledCourseElement>
      <StyledCourseElement>
        <StyledCourseElementTitle>zgłoś błąd</StyledCourseElementTitle>
        <ReportError choosen={element} />
      </StyledCourseElement>
      <StyledCourseElement>
        <StyledCourseElementTitle>czat</StyledCourseElementTitle>
        <Chat element={element} />
      </StyledCourseElement>
    </StyledCourseElementList>
  );
};
