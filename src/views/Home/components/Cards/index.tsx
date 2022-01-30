import { Title, StyledCards, Grid } from "./style";
export const Cards = ({ title, children }) => {
  return (
    <StyledCards>
      <Title>{title}</Title>
      <Grid>{children}</Grid>
    </StyledCards>
  );
};
