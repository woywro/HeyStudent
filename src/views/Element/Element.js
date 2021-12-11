import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { dataContext } from "../../App";
import { useContext } from "react";
import { CourseElementList } from "./components/CourseElementList";
import { IsInterested } from "./components/IsInterested";
import { useLocation } from "react-router";
import { Fade } from "@mui/material";
import { Container } from "@mui/material";
import { PageTopBar } from "../../components/PageTopBar";

export const Element = () => {
  const context = useContext(dataContext);
  let location = useLocation();

  return (
    <Fade in={location.pathname} mountOnEnter unmountOnExit>
      <Container
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexFlow: "column",
          padding: 0,
          // margin: 0,
          width: "100vw",
        }}
      >
        <PageTopBar
          content={
            <Box sx={{ width: 1 }}>
              <Typography variant="h3">
                {context.choosen.name.join(" ")}
              </Typography>
              <Typography variant="subtitle2">
                {context.choosen.type}, {context.choosen.degree}
              </Typography>
              <Divider
                orientation="horizontal"
                variant="middle"
                sx={{ marginTop: 1 }}
              />
              <IsInterested />
            </Box>
          }
        />
        <CourseElementList element={context.choosen} />
      </Container>
    </Fade>
  );
};
