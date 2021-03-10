// import App from "next/app";
import Head from "next/head";
import type { AppProps } from "next/app";
//import wrapper from "../store";
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient'
import { ThemeProvider } from 'styled-components'
import theme from '../components/style/theme'
import GlobalStyle from '../components/style/global'
import HeaderCommon from "../components/common/HeaderCommon";
import FooterCommon from "../components/common/FooterCommon";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
      <ApolloProvider client={apolloClient}>
        <Head>
          <title>JOSNS BLOG</title>
        </Head>
        <ThemeProvider theme={theme}>
          <HeaderCommon />
          <Component {...pageProps} />
          <FooterCommon />
          <GlobalStyle />
        </ThemeProvider>
      </ApolloProvider>
  );
}

export default MyApp;
//export default wrapper.withRedux(MyApp);
