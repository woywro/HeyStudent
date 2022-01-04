import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { CourseElementList } from "./components/CourseElementList";
import { IsInterested } from "./components/IsInterested";
import { Container } from "@mui/material";
import { PageTopBar } from "../../components/PageTopBar";
import { ItemType } from "../../types";
import styled from "styled-components";

interface Props {
  data: ItemType;
}

const StyledCourseTitle = styled.h1`
  color: white;
  font-size: 40px;
`;

const StyledCourseText = styled.p`
  color: white;
  font-size: 20px;
  margin: 5px;
`;

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
      <PageTopBar>
        <StyledCourseTitle>{data.name.join(" ")}</StyledCourseTitle>
        <StyledCourseText>
          {data.university}, {data.city}
        </StyledCourseText>
        {/* <StyledCourseText>
          {data.type}, {data.degree}
        </StyledCourseText> */}
        <Divider
          orientation="horizontal"
          variant="middle"
          sx={{ marginTop: 1 }}
        />
        {/* <IsInterested data={data} /> */}
      </PageTopBar>
      <CourseElementList element={data} />
    </Container>
  );
};
