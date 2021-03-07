import { GetServerSideProps } from "next";
import { END } from "redux-saga";
import wrapper, { SagaStore } from "../store";
import * as commonStyle from "../components/common/commonStyle";
import MainProfile from "../components/profile/MainProfile";

export default function Main() {
  return (
    <commonStyle.ContentWrap>
        <MainProfile></MainProfile>
    </commonStyle.ContentWrap>
  );
}
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (context: any) => {
    context.store.dispatch(END);
    await (context.store as SagaStore).sagaTask.toPromise();
  }
);
