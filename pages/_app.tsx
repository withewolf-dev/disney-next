import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { store } from "../store/store";
import GlobalStyle from "../styles/globalstyles";
import theme from "../theme";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <SessionProvider session={session}>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </SessionProvider>
      </Provider>
    </>
  );
}
export default MyApp;
