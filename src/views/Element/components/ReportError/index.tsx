import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { useCallback } from "react";
import { useUserContext } from "../../../../context/userContext";
import { ItemType } from "../../../../types";
import { Text } from "../../../../components/Text";
import { Input } from "../../../../components/Input";
import { Button } from "../../../../components/Button";
import { LockedFunction } from "../../../../components/LockedFunction";
import { Container, TextInput } from "./style";

interface Props {
  choosen: ItemType;
}

export const ReportError = ({ choosen }: Props) => {
  const { user } = useUserContext();
  const [inputValue, setInputValue] = useState("");

  const sendError = useCallback(
    async (e) => {
      e.preventDefault();
      const errorsRef = collection(db, "Errors");
      await addDoc(errorsRef, {
        text: inputValue,
        uid: user.uid,
        course: choosen.id,
      });
      setInputValue("");
    },
    [inputValue]
  );

  return (
    <Container onSubmit={sendError}>
      {user ? (
        <>
          <Text size="small">
            Jeżeli masz jakieś sugestie lub widzisz błąd, daj nam znać!
          </Text>
          <TextInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="np. zła liczba ects z matematyki"
          />
          <Button disabled={!inputValue}>wyślij</Button>
        </>
      ) : (
        <LockedFunction />
      )}
    </Container>
  );
};
