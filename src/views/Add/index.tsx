import { useState } from "react";
import { PageTopBar } from "../../components/PageTopBar";
import { CourseView } from "./components/CourseView/index";
import { SentScreen } from "./components/SentScreen";
import { Container } from "./style";

export const Add = () => {
  const [sent, setSent] = useState(false);

  return (
    <Container>
      <PageTopBar title="Dodaj kierunek" />
      {sent ? <SentScreen /> : <CourseView setSent={setSent} />}
    </Container>
  );
};
