import { GlobalStyle } from "../theme/globalStyles";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { UserContextProvider } from "../context/userContext";
import { TopBar } from "../components/TopBar";
import { createContext } from "react";
import { FieldsOfStudyContextProvider } from "../context/fieldsOfStudyContext";
import { LoadingContextProvider } from "../context/loadingContext";
import { UserDataContextProvider } from "../context/userDataContext";
import { SearchContextProvider } from "../context/searchContext";
import NextNProgress from "nextjs-progressbar";
import styled from "styled-components";
import { theme } from "../theme/theme";
export const dataContext = createContext();

const StyledApp = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 0;
  border: 0;
  padding: 0;
`;

function Application({ Component, pageProps }) {
  return (
    <LoadingContextProvider>
      <SearchContextProvider>
        <UserContextProvider>
          <UserDataContextProvider>
            <FieldsOfStudyContextProvider>
              <div className="App">
                <StyledApp>
                  <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <NextNProgress
                      height={2}
                      color="#ffc400"
                      options={{ showSpinner: false }}
                    />
                    <TopBar>{/* <Burger /> */}</TopBar>
                    <Component {...pageProps} />
                  </ThemeProvider>
                </StyledApp>
              </div>
            </FieldsOfStudyContextProvider>
          </UserDataContextProvider>
        </UserContextProvider>
      </SearchContextProvider>
    </LoadingContextProvider>
  );
}

export default Application;
