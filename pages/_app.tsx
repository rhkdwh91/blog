// import App from "next/app";
import Head from "next/head";
import type { AppProps } from "next/app";
import wrapper from "../store";
import { ThemeProvider } from 'styled-components'
import theme from '../components/style/theme'
import GlobalStyle from '../components/style/global'
import HeaderCommon from "../components/common/HeaderCommon";
import FooterCommon from "../components/common/FooterCommon";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
        <Head>
          <title>JOSNS BLOG</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="shortcut icon" href="favicon.ico" />
        </Head>
        <ThemeProvider theme={theme}>
          <HeaderCommon />
          <Component {...pageProps} />
          <FooterCommon />
          <GlobalStyle />
        </ThemeProvider>
      </>
  );
}

export default wrapper.withRedux(MyApp);
