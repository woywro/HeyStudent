import { StyledPageTopBar, PageTopBarTitle } from "./style";

export const PageTopBar = ({ children, title }) => {
  return (
    <StyledPageTopBar>
      <PageTopBarTitle>{title}</PageTopBarTitle>
      {children}
    </StyledPageTopBar>
  );
};
