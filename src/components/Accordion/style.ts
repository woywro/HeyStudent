import styled from "styled-components";

export const AccordionItem = styled.li`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  cursor: pointer;
`;

export const AccordionContent = styled.div`
  width: 100%;
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: black;
  opacity: 0.5;
`;

export const AccordionTitle = styled.h1`
  font-size: 18px;
  font-weight: normal;
`;

export const AccordionSwitch = styled.button`
  font-size: 15px;
  font-weight: bold;
  background: white;
  border: none;
  cursor: pointer;
`;

export const AccordionInside = styled.div`
  width: 100%;
  padding: 10px;
`;
