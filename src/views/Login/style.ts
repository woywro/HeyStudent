import breakpoints from "../../theme/breakpoints";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  @media only screen and ${breakpoints.device.xs} {
    width: 100%;
  }
  @media only screen and ${breakpoints.device.lg} {
    width: 70%;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: #039be5 0 10px 20px -10px;
`;
