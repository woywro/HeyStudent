import { StyledPageTopBar, PageTopBarTitle } from "./style";

interface Props {
  children: JSX.Element;
  title: string;
}

export const PageTopBar = ({ children, title }: Props) => {
  return (
    <StyledPageTopBar>
      <PageTopBarTitle>{title}</PageTopBarTitle>
      {children}
    </StyledPageTopBar>
  );
};
