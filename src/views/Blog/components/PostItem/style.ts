import styled from "styled-components";
import breakpoints from "../../../../theme/breakpoints";
import { shadow } from "../../../../mixnins/shadow";
import { Text } from "../../../../components/Text";

export const StyledPostItem = styled.li`
  border-radius: 10px;
  width: 100%;
  ${shadow}
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin: 10px;
  cursor: pointer;
  padding: 15px;
`;

export const Title = styled(Text)`
  margin: 5px;
  @media only screen and ${breakpoints.device.xs} {
    font-size: 22px;
  }
  @media only screen and ${breakpoints.device.lg} {
    font-size: 28px;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 120px;
`;
