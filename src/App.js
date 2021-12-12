import { Home } from "./views/Home/Home";
import { GlobalStyle } from "./theme/globalStyles";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Element } from "./views/Element/Element";
import { ThemeProvider } from "@mui/system";
import { defaultTheme } from "./theme/theme";
import { UserContextProvider } from "./context/userContext";
import { TopBar } from "./components/TopBar";
import { Add } from "./views/Add/Add";
import { createContext } from "react";
import { Login } from "./views/Login/Login";
import { Observed } from "./views/Observed/Observed";
import { FieldsOfStudyContextProvider } from "../src/context/fieldsOfStudyContext";
import { LoadingContextProvider } from "../src/context/loadingContext";
import { UserDataContextProvider } from "./context/userDataContext";
import { SearchContextProvider } from "./context/searchContext";
import { ChoosenContextProvider } from "./context/choosenContext";
export const dataContext = createContext();

function App() {
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <LoadingContextProvider>
      <ChoosenContextProvider>
        <SearchContextProvider>
          <UserContextProvider>
            <UserDataContextProvider>
              <FieldsOfStudyContextProvider>
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
              </FieldsOfStudyContextProvider>
            </UserDataContextProvider>
          </UserContextProvider>
        </SearchContextProvider>
      </ChoosenContextProvider>
    </LoadingContextProvider>
  );
}

export default App;
