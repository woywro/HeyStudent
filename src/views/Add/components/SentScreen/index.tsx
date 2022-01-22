import { Text } from "../../../../components/Text";
import styled from "styled-components";
import { Button } from "../../../../components/Button";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  width: 100%;
  text-align: center;
  padding: 20px;
`;

export const SentScreen = () => {
  const router = useRouter();

  return (
    <Container>
      <Text size="big">
        Gratulacje! Twój kierunek zostanie dodany po zweryfikowaniu
      </Text>
      <Button onClick={() => router.push("/")}>Wróć do strony głównej</Button>
    </Container>
  );
};
