import breakpoints from "../../theme/breakpoints";
import styled from "styled-components";
import { Input } from "../../components/Input";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 80px;
  @media only screen and ${breakpoints.device.xs} {
    width: 100%;
  }
  @media only screen and ${breakpoints.device.lg} {
    width: 80%;
  }
`;

export const StyledInput = styled(Input)`
  margin: 10px;
`;

export const LoginContainer = styled.div`
  height: 400px;
  border-radius: 10px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row;
  @media only screen and ${breakpoints.device.xs} {
    width: 90%;
  }
  @media only screen and ${breakpoints.device.lg} {
    width: 60%;
    box-shadow: #039be5 0 10px 20px -10px;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  height: 100%;
  @media only screen and ${breakpoints.device.xs} {
    width: 100%;
    padding: 10px;
  }
  @media only screen and ${breakpoints.device.lg} {
    width: 50%;
    padding: 40px;
  }
`;

export const Image = styled.div`
  width: 50%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  height: 100%;
  padding: 40px;
  background: ${({ theme }) => theme.colors.primary};
  justify-content: flex-start;
  align-items: center;
  flex-flow: column;
  @media only screen and ${breakpoints.device.xs} {
    display: none;
  }
  @media only screen and ${breakpoints.device.lg} {
    display: flex;
  }
`;
export const ImageText = styled.h1`
  color: white;
  font-weight: normal;
  @media only screen and ${breakpoints.device.xs} {
    display: none;
  }
  @media only screen and ${breakpoints.device.lg} {
    display: flex;
  }
`;

export const Title = styled.p`
  font-size: 30px;
  margin-bottom: 10px;
`;
