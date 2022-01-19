import { useState } from "react";
import styled from "styled-components";
import { Text } from "../components/Text";

const StyledAccordionItem = styled.li`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  cursor: pointer;
`;

const StyledAccordionContent = styled.div`
  width: 100%;
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
`;

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  background: black;
  opacity: 0.5;
`;

const StyledAccordionTitle = styled.h1`
  font-size: 18px;
  font-weight: normal;
`;

const StyledAccordionSwitch = styled.button`
  font-size: 15px;
  font-weight: bold;
  background: white;
  border: none;
  cursor: pointer;
`;

const StyledAccordionInside = styled.div`
  padding: 10px;
`;

const StyledTag = styled.p`
  font-size: 12px;
  font-weight: bold;
  margin: 5px;
`;

const StyledTags = styled.div`
  flex-flow: row;
  display: flex;
`;

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <StyledAccordionItem>
      <StyledAccordionContent onClick={() => setIsActive(!isActive)}>
        <StyledAccordionTitle>{title}</StyledAccordionTitle>
        <StyledAccordionSwitch>
          {isActive ? "pokaż mniej" : "pokaż więcej"}
        </StyledAccordionSwitch>
      </StyledAccordionContent>
      <StyledDivider />
      {isActive && (
        <StyledAccordionInside>
          <Text>{content.description}</Text>
        </StyledAccordionInside>
      )}
    </StyledAccordionItem>
  );
};

export default Accordion;
