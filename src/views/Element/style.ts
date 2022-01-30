import styled from "styled-components";
import breakpoints from "../../theme/breakpoints";
import { Text } from "../../components/Text";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  @media only screen and ${breakpoints.device.xs} {
    width: 100%;
  }
  @media only screen and ${breakpoints.device.sm} {
    width: 70%;
  }
`;
export const CourseText = styled(Text)`
  color: white;
`;
