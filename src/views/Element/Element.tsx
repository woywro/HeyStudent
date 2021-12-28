import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { CourseElementList } from "./components/CourseElementList";
import { IsInterested } from "./components/IsInterested";
import { Container } from "@mui/material";
import { PageTopBar } from "../../components/PageTopBar";
import { ItemType } from "../../types";

interface Props {
  data: ItemType;
}

export const Element = ({ data }: Props) => {
  return (
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
  );
};
