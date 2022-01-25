import { GlobalStyle } from "../theme/globalStyles";
import { ThemeProvider } from "styled-components";
import { UserContextProvider } from "../context/userContext";
import { Nav } from "../components/Nav";
import { FieldsOfStudyContextProvider } from "../context/fieldsOfStudyContext";
import { LoadingContextProvider } from "../context/loadingContext";
import { UserDataContextProvider } from "../context/userDataContext";
import { SearchContextProvider } from "../context/searchContext";
import NextNProgress from "nextjs-progressbar";
import styled from "styled-components";
import { theme } from "../theme/theme";

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
              <StyledApp>
                <ThemeProvider theme={theme}>
                  <GlobalStyle />
                  <NextNProgress
                    height={2}
                    color="#ffc400"
                    options={{ showSpinner: false }}
                  />
                  <Nav />
                  <Component {...pageProps} />
                </ThemeProvider>
              </StyledApp>
            </FieldsOfStudyContextProvider>
          </UserDataContextProvider>
        </UserContextProvider>
      </SearchContextProvider>
    </LoadingContextProvider>
  );
}

export default Application;
