import { all } from "redux-saga/effects";
import postsSaga from "./posts/saga";

export default function* rootSaga() {
  // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
  yield all([postsSaga()]);
}
