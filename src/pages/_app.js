import { GlobalStyle } from "../theme/globalStyles";
import { useState } from "react";
import { ThemeProvider } from "@mui/system";
import { defaultTheme } from "../theme/theme";
import { UserContextProvider } from "../context/userContext";
import { TopBar } from "../components/TopBar";
import { createContext } from "react";
import { FieldsOfStudyContextProvider } from "../context/fieldsOfStudyContext";
import { LoadingContextProvider } from "../context/loadingContext";
import { UserDataContextProvider } from "../context/userDataContext";
import { SearchContextProvider } from "../context/searchContext";
export const dataContext = createContext();

function Application({ Component, pageProps }) {
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <LoadingContextProvider>
      <SearchContextProvider>
        <UserContextProvider>
          <UserDataContextProvider>
            <FieldsOfStudyContextProvider>
              <div className="App">
                <ThemeProvider theme={theme}>
                  <GlobalStyle />
                  <TopBar />
                  <Component {...pageProps} />
                </ThemeProvider>
              </div>
            </FieldsOfStudyContextProvider>
          </UserDataContextProvider>
        </UserContextProvider>
      </SearchContextProvider>
    </LoadingContextProvider>
  );
}

export default Application;
