import { useState } from "react";
import styled from "styled-components";
import { Text } from "../Text";
import {
  AccordionItem,
  AccordionContent,
  AccordionTitle,
  AccordionSwitch,
  Divider,
  AccordionInside,
} from "./style";

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <AccordionItem>
      <AccordionContent onClick={() => setIsActive(!isActive)}>
        <AccordionTitle>{title}</AccordionTitle>
        <AccordionSwitch>
          {isActive ? "pokaż mniej" : "pokaż więcej"}
        </AccordionSwitch>
      </AccordionContent>
      <Divider />
      {isActive && (
        <AccordionInside>
          <Text>{content.description}</Text>
        </AccordionInside>
      )}
    </AccordionItem>
  );
};

export default Accordion;
