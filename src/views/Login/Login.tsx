import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { signInWithGoogle } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useLoadingContext } from "../../context/loadingContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import styled from "styled-components";
import breakpoint from "../../theme/breakpoints";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  @media only screen and ${breakpoint.device.xs} {
    width: 100%;
  }
  @media only screen and ${breakpoint.device.lg} {
    width: 70%;
  }
`;

const LoginForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: #039be5 0 10px 20px -10px;
`;

export const Login = () => {
  const auth = getAuth();
  const router = useRouter();
  const [error, setError] = useState();
  const { setLoading } = useLoadingContext();
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (email, password) => {
    console.log(email);
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      const errorMessage = error.message;
      setError(errorMessage);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  useEffect(() => {
    if (user) {
      router.push("/");
      setLoading(false);
    }
  }, [user]);

  return (
    <Container>
      <Typography variant="h4">Zaloguj</Typography>
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
        <Typography variant="subtitle2">{error}</Typography>
        <Button onClick={handleSubmit}>Zaloguj</Button>
        <Button onClick={signInWithGoogle}>Zaloguj z Google</Button>
      </LoginForm>
    </Container>
  );
};
