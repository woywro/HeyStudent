import { GlobalStyle } from "../theme/globalStyles";
import { ThemeProvider } from "styled-components";
import { Nav } from "../components/Nav";
import { FieldsOfStudyContextProvider } from "../context/fieldsOfStudyContext";
import { LoadingContextProvider } from "../context/loadingContext";
import { UserContextProvider } from "../context/userContext";
import { SearchContextProvider } from "../context/searchContext";
import NextNProgress from "nextjs-progressbar";
import styled from "styled-components";
import { theme } from "../theme/theme";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { AppProps } from "next/app";

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

function Application({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <LoadingContextProvider>
      <SearchContextProvider>
        <UserContextProvider>
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
                <motion.div
                  key={router.route}
                  initial="pageInitial"
                  animate="pageAnimate"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  variants={{
                    pageInitial: {
                      opacity: 0,
                    },
                    pageAnimate: {
                      opacity: 1,
                    },
                  }}
                >
                  <Component {...pageProps} />
                </motion.div>
              </ThemeProvider>
            </StyledApp>
          </FieldsOfStudyContextProvider>
        </UserContextProvider>
      </SearchContextProvider>
    </LoadingContextProvider>
  );
}

export default Application;
