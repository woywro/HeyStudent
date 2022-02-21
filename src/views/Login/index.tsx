import { signInWithGoogle } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { Button } from "../../components/Button";
import { Text } from "../../components/Text";
import {
  LoginForm,
  Container,
  Image,
  LoginContainer,
  ImageText,
  Title,
} from "./style";
import { auth } from "../../firebase/firebase";
import { StyledInput } from "./style";

export const Login = () => {
  const router = useRouter();
  const [error, setError] = useState();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signIn = (email: string, password: string) => {
    console.log(email);
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      const errorMessage = error.message;
      setError(errorMessage);
    });
  };

  auth.onAuthStateChanged(() => {
    if (auth.currentUser !== null) {
      router.push("/");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <Container>
      <LoginContainer>
        <Image>
          <ImageText>Zaloguj się do portalu HeyStudent</ImageText>
        </Image>
        <LoginForm>
          <Title>Zaloguj</Title>
          <StyledInput
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledInput
            placeholder="hasło"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Text>{error}</Text>
          <Button onClick={handleSubmit}>Zaloguj</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              signInWithGoogle();
            }}
          >
            Zaloguj z Google
          </Button>
        </LoginForm>
      </LoginContainer>
    </Container>
  );
};
