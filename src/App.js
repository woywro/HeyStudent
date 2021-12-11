import "./App.css";
import { Home } from "./views/Home";
import { GlobalStyle } from "./theme/globalStyles";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Element } from "./views/Element";
import { ThemeProvider } from "@mui/system";
import { defaultTheme } from "./theme/theme";
import { TopBar } from "./components/organisms/TopBar";
import { Add } from "./views/Add";
import { createContext } from "react";
import { Login } from "./views/Login";
import { auth, db } from "./firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDocs, getDoc, setDoc, collection } from "firebase/firestore";
import { Observed } from "./views/Observed";
import { handleAdd } from "./utils/handleAdd";
export const dataContext = createContext();

function App() {
  const [isLoading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const [fieldsOfStudy, setFieldsOfStudy] = useState([]);
  const [advanced, setAdvanced] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [choosen, setChoosen] = useState();
  const [searched, setSearched] = useState([]);
  const [theme, setTheme] = useState(defaultTheme);
  const value = {
    fieldsOfStudy,
    setFieldsOfStudy,
    searched,
    setSearched,
    advanced,
    setAdvanced,
    user,
    isLoading,
    setLoading,
    userData,
    setUserData,
    isSearching,
    setIsSearching,
    choosen,
    setChoosen,
    theme,
    setTheme,
  };

  useEffect(() => {
    if (user) {
      async function getData() {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        const dat = docSnap.data();
        setUserData(dat);
      }
      getData().then(() => setLoading(false));
    }
  }, [user]);

  return (
    <dataContext.Provider value={value}>
      <BrowserRouter>
        <div className="App">
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <TopBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/element" element={<Element />} />
              <Route path="/add" element={<Add />} />
              <Route path="/observed" element={<Observed />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </ThemeProvider>
        </div>
      </BrowserRouter>
    </dataContext.Provider>
  );
}

export default App;
