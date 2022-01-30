import styled from "styled-components";
import { shadow } from "../../../../mixnins/shadow";
import breakpoints from "../../../../theme/breakpoints";

export const Title = styled.h1`
  font-size: 45px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #696969;
`;

export const Grid = styled.div`
  justify-items: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  @media only screen and ${breakpoints.device.xs} {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
  @media only screen and ${breakpoints.device.sm} {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and ${breakpoints.device.lg} {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const StyledCards = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
`;
