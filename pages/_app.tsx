// import App from "next/app";
import Head from "next/head";
import type { AppProps } from "next/app";
//import wrapper from "../store";
import { ApolloProvider, gql } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import theme from "../components/style/theme";
import GlobalStyle from "../components/style/global";
import { createApolloClient } from "../lib/apolloClient";
import MainLayout from "../components/organisms/MainLayout";
import wrapper from "store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "store/reducer/user";

const VARIFIED_STATUS = gql`
  mutation VarifiedStatus {
    varifiedStatus {
      data {
        uid
        user_id
        user_name
        createdAt
        updatedAt
      }
      result
      code
    }
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = createApolloClient();
  const dispatch = useDispatch();

  const varifiedStatus = async () => {
    try {
      const result = await apolloClient.mutate({
        mutation: VARIFIED_STATUS,
      });
      if (result.data.varifiedStatus.code === 200) {
        dispatch({
          type: LOGIN_SUCCESS,
          data: result.data.varifiedStatus.data,
        });
      } else {
        dispatch({ type: LOGOUT_SUCCESS });
        if (result.data.varifiedStatus.code === 401)
          throw result.data.varifiedStatus.result;
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    varifiedStatus();
  }, []);

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
