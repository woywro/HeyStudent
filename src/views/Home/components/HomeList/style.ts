import styled from "styled-components";
import breakpoints from "../../../../theme/breakpoints";

export const StyledHomeList = styled.ul`
  list-style: none;
  justify-content: center;
  align-items: center;
  padding: 20px;
  display: flex;
  flex-flow: column;
`;

export const Category = styled.li`
  padding: 10px;
  @media only screen and ${breakpoints.device.xs} {
    display: flex;
    flex-flow: column;
  }
  @media only screen and ${breakpoints.device.lg} {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;
    width: 80%;
  }
`;

export const Title = styled.h1`
  font-size: 26px;
  margin-top: 10px;
`;
