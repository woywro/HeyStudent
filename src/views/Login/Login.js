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
import { useUserDataContext } from "../../context/userDataContext";
import { doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { getDoc } from "firebase/firestore";
import { useLoadingContext } from "../../context/loadingContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUserContext } from "../../context/userContext";

export const Login = () => {
  let navigate = useNavigate();
  let context = useContext(dataContext);
  const auth = getAuth();
  const [error, setError] = useState();
  const { userData, setUserData } = useUserDataContext();
  const { setLoading } = useLoadingContext();
  const [user] = useAuthState(auth);
  const { setUser } = useUserContext();

  const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // setUser(userCredential.user);
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
    if (user) {
      // setUser(user);
      navigate("/", { replace: false });
      // async function getData() {
      //   const docRef = doc(db, "Users", user.uid);
      //   const docSnap = await getDoc(docRef);
      //   const dat = docSnap.data();
      //   setUserData(dat);
      // }
      // getData().then(() => setLoading(false));
      setLoading(false);
    }
  }, [user]);

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
