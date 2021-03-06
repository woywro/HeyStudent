import styled from "styled-components";
import breakpoints from "../../../../theme/breakpoints";
export const Card = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-flow: column;
  cursor: pointer;
  color: ${(props) => (props.bg == "white" ? "#696969" : "white")};
  background: ${(props) => props.bg};
  border-radius: 10px;
  box-shadow: ${(props) =>
    props.bg == "white" ? "none" : "0px 6px 10px rgba(0, 0, 0, 0.25)"};
  transition: all 0.2s;
  @media only screen and ${breakpoints.device.xs} {
    flex-flow: column;
  }
  @media only screen and ${breakpoints.device.sm} {
  }
  &:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
    transform: scale(1.01);
  }
`;

export const CardTitle = styled.h1`
  padding: 10px;
  font-size: 28px;
`;
export const CardText = styled.h1`
  padding: 10px;
  font-size: 18px;
`;
