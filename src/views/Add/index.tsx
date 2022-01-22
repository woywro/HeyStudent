import { useState } from "react";
import { PageTopBar } from "../../components/PageTopBar";
import { CourseView } from "./components/CourseView/index";
import { SentScreen } from "./components/SentScreen";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  width: 70%;
`;

export const Add = () => {
  const [sent, setSent] = useState(false);

  return (
    <Container>
      <PageTopBar title="Dodaj kierunek" />
      {sent ? <SentScreen /> : <CourseView setSent={setSent} />}
    </Container>
  );
};
