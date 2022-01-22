import { CourseElementList } from "./components/CourseElementList";
import { PageTopBar } from "../../components/PageTopBar";
import { ItemType } from "../../types";
import { CourseText, Container } from "./style";

interface Props {
  data: ItemType;
}

export const Element = ({ data }: Props) => {
  return (
    <Container>
      <PageTopBar title={data.name.join(" ")}>
        <CourseText>
          {data.university}, {data.city}
        </CourseText>
        <CourseText>
          {data.type}, {data.degree}
        </CourseText>
      </PageTopBar>
      <CourseElementList element={data} />
    </Container>
  );
};
