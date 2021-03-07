import { GetServerSideProps } from "next";
import { END } from "redux-saga";
import wrapper, { SagaStore } from "../../store";

export default function Admin() {
  return (
    <div>
      로그인페이지
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (context: any) => {
    context.store.dispatch(END);
    await (context.store as SagaStore).sagaTask.toPromise();
  }
);
