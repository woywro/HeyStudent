import styled from "styled-components";
import breakpoints from "../../../../theme/breakpoints";

export const StyledObservedItem = styled.div`
  border-radius: 10px;
  width: 100%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: inline-grid;
  justify-items: start;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  border: ${(props) => props.hasBorder};
  @media only screen and ${breakpoints.device.xs} {
    grid-template-columns: 3fr 3fr 1fr;
  }
  @media only screen and ${breakpoints.device.lg} {
    grid-template-columns: 3fr 3fr 3fr 1fr;
  }
`;

export const StyledCourseTitle = styled.h1`
  font-size: 18px;
  font-weight: normal;
`;
export const StyledCourseUniversity = styled.p`
  font-size: 15px;
`;
export const StyledCourseCity = styled.p`
  font-size: 15px;
  @media only screen and ${breakpoints.device.xs} {
    display: none;
  }
  @media only screen and ${breakpoints.device.lg} {
    display: flex;
  }
`;
