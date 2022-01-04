import { Typography } from "@mui/material";
import { ObservedList } from "./components/ObservedList";
import { Container } from "@mui/material";
import { PageTopBar } from "../../components/PageTopBar";
import styled from "styled-components";
import breakpoint from "../../theme/breakpoints";

const StyledObserved = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  @media only screen and ${breakpoint.device.xs} {
    width: 100%;
  }
  @media only screen and ${breakpoint.device.lg} {
    width: 70%;
  }
`;

export const Observed = () => {
  return (
    <StyledObserved>
      <PageTopBar title="Obserwowane kierunki"></PageTopBar>
      <ObservedList />
    </StyledObserved>
  );
};
