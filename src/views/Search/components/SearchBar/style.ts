import styled from "styled-components";
import breakpoints from "../../../../theme/breakpoints";

export const StyledSearchBar = styled.div`
  padding: 10px;
  border-radius: 10px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  @media only screen and ${breakpoints.device.xs} {
    width: 100%;
  }
  @media only screen and ${breakpoints.device.lg} {
    width: 60%;
  }
`;

export const StyledNameSearch = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  @media only screen and ${breakpoints.device.xs} {
    flex-flow: column;
  }
  @media only screen and ${breakpoints.device.lg} {
    flex-flow: row;
  }
`;

export const ClearButton = styled.button`
  font-size: 15px;
  background: none;
  border: none;
  margin: 10px;
  cursor: pointer;
  font-weight: bold;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #e2e7f3;
  border-radius: 10px;
`;
