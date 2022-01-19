import breakpoints from "../../../../theme/breakpoints";
import styled from "styled-components";
export const Container = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

export const TextInput = styled(Input)`
  margin: 10px;
  @media only screen and ${breakpoints.device.xs} {
    width: 100%;
  }
  @media only screen and ${breakpoints.device.lg} {
    width: 70%;
  }
`;
