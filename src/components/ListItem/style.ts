import styled from "styled-components";
import breakpoints from "../../theme/breakpoints";
import { shadow } from "../../mixnins/shadow";

export const StyledListItem = styled.li`
  border-radius: 10px;
  ${shadow}
  display: inline-grid;
  justify-items: center;
  align-items: center;
  position: relative;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
  @media only screen and ${breakpoints.device.xs} {
    grid-template-columns: 3fr 2fr 1fr;
    width: 100%;
  }
  @media only screen and ${breakpoints.device.sm} {
    grid-template-columns: 3fr 3fr 3fr 1fr;
    grid-template-rows: 1fr;
    width: 80%;
  }
`;
export const CourseTitle = styled.h1`
  font-size: 18px;
  font-weight: normal;
`;
export const CourseUniversity = styled.p`
  font-size: 15px;
  @media only screen and ${breakpoints.device.xs} {
    display: none;
  }
  @media only screen and ${breakpoints.device.lg} {
    display: flex;
  }
`;
export const CourseCity = styled.p`
  font-size: 15px;
`;
export const CourseMatch = styled.p`
  font-size: 18px;
`;
