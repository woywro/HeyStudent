import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signInWithGoogle } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { dataContext } from "../../App";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
  let navigate = useNavigate();
  let context = useContext(dataContext);
  const auth = getAuth();
  const [error, setError] = useState();

  const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signIn(data.get("email"), data.get("password"));
  };

  useEffect(() => {
    if (context.user) {
      navigate("/", { replace: false });
    }
  }, [context.user]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Zaloguj</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adres Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Hasło"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Typography variant="subtitle2">{error}</Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Zaloguj
          </Button>
        </Box>
        <Button onClick={signInWithGoogle}>Zaloguj z Google</Button>
      </Box>
    </Container>
  );
};
