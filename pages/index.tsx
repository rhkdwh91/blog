import { gql, useQuery } from '@apollo/client';
import { GetServerSideProps } from "next";
import { initializeApollo } from '../lib/apolloClient';
//import { END } from "redux-saga";
//import wrapper, { SagaStore } from "../store";
import * as commonStyle from "../components/common/commonStyle";
import MainProfile from "../components/profile/MainProfile";

const GET_USERS = gql`
  {
    users {
      name
    }
  }
`;

export default function Main(props) {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <commonStyle.ContentWrap>
      {data.users[0].name}
      {props.initialApolloState.users[0].name}
      <MainProfile></MainProfile>
    </commonStyle.ContentWrap>
  );
}

export const getServerSideProps: GetServerSideProps<{}, {}> = async (ctx) => {
  /*
  1. 투표 등 실시간성 데이터가 계속 업데이트 되어야하는 경우 getStaticProps와 revalidate를 이용
  2. 일반적인 경우 getServerSideProps를 이용
  */
  // browser단의 context(headers)를 SSR에 넘기는 과정
  const apolloClient = initializeApollo(null);
  await apolloClient.query({
    query: GET_USERS
  });
  console.log('SSR---------------', ctx, apolloClient.cache.extract().ROOT_QUERY);
  return {
  props: {
    initialApolloState: apolloClient.cache.extract().ROOT_QUERY,
  },
  }
}

/*
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (context: any) => {
    context.store.dispatch(END);
    await (context.store as SagaStore).sagaTask.toPromise();
  }
);
*/
