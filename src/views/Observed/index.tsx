import { ObservedList } from "./components/ObservedList";
import { PageTopBar } from "../../components/PageTopBar";
import { StyledObserved } from "./style";

export const Observed = () => {
  return (
    <StyledObserved>
      <PageTopBar title="Obserwowane kierunki"></PageTopBar>
      <ObservedList />
    </StyledObserved>
  );
};
