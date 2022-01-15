// import App from "next/app";
import Head from "next/head";
import type { AppProps } from "next/app";
//import wrapper from "../store";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import theme from "../components/style/theme";
import GlobalStyle from "../components/style/global";
import { createApolloClient } from "../lib/apolloClient";
import MainLayout from "../components/organisms/MainLayout";
import wrapper from "store";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = createApolloClient();
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>JOSNS BLOG</title>
      </Head>
      <ThemeProvider theme={theme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
        <GlobalStyle />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default wrapper.withRedux(MyApp);
//export default wrapper.withRedux(MyApp);
