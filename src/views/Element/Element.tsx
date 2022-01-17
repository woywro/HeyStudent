import { CourseElementList } from "./components/CourseElementList";
import { PageTopBar } from "../../components/PageTopBar";
import { ItemType } from "../../types";
import styled from "styled-components";
import breakpoint from "../../theme/breakpoints";

interface Props {
  data: ItemType;
}

const CourseText = styled.p`
  color: white;
  font-size: 20px;
  margin: 5px;
`;

const Container = styled.div`
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

export const Element = ({ data }: Props) => {
  return (
    <Container>
      <PageTopBar title={data.name.join(" ")}>
        <CourseText>
          {data.university}, {data.city}
        </CourseText>
      </PageTopBar>
      <CourseElementList element={data} />
    </Container>
  );
};
