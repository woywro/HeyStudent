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
import { useChoosenContext } from "../../context/choosenContext";

export const Element = ({ data }) => {
  const { choosen, setChoosen } = useChoosenContext();

  return (
    // <Fade in={location.pathname} mountOnEnter unmountOnExit>
    <Container
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column",
        padding: 0,
        width: "100vw",
      }}
    >
      <PageTopBar
        content={
          <Box sx={{ width: 1 }}>
            <Typography variant="h3">{data.name.join(" ")}</Typography>
            <Typography variant="subtitle2">
              {data.type}, {data.degree}
            </Typography>
            <Divider
              orientation="horizontal"
              variant="middle"
              sx={{ marginTop: 1 }}
            />
            <IsInterested data={data} />
          </Box>
        }
      />
      <CourseElementList element={data} />
    </Container>
    // </Fade>
  );
};