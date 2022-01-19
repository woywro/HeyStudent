import styled from "styled-components";

export const StyledCourseElementList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  width: 90%;
`;

export const StyledCourseElement = styled.li`
  border-radius: 10px;
  width: 100%;
  padding: 20px;
  margin: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export const StyledCourseElementTitle = styled.h1`
  padding: 10px;
  font-weight: normal;
  margin-bottom: 5px;
`;

export const SubjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px;
  justify-items: center;
  align-items: center;
`;
