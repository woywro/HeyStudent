import { Typography } from "@mui/material";
import { ObservedList } from "./components/ObservedList";
import { Container } from "@mui/material";
import { PageTopBar } from "../../components/PageTopBar";

export const Observed = () => {
  return (
    <Container
      sx={{
        width: 1,
        position: "relative",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexFlow: "column",
        padding: 0,
      }}
    >
      <PageTopBar content={<Typography variant="h4">Obserwowane</Typography>} />
      <ObservedList />
    </Container>
  );
};
