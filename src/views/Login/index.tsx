import { signInWithGoogle } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useLoadingContext } from "../../context/loadingContext";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Text } from "../../components/Text";
import { LoginForm, Container } from "./style";
import { auth } from "../../firebase/firebase";

export const Login = () => {
  const router = useRouter();
  const [error, setError] = useState();
  const { setLoading } = useLoadingContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (email, password) => {
    console.log(email);
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      const errorMessage = error.message;
      setError(errorMessage);
    });
    if (auth.currentUser !== null) {
      router.push("/");
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <Container>
      <Text size="big">Zaloguj</Text>
      <LoginForm>
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="hasło"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Text>{error}</Text>
        <Button onClick={handleSubmit}>Zaloguj</Button>
        <Button onClick={signInWithGoogle}>Zaloguj z Google</Button>
      </LoginForm>
    </Container>
  );
};
