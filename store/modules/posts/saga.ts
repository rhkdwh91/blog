import { put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { actionTypes } from "../actionTypes";

export default function* postsSaga() {
  yield takeLatest(actionTypes.FETCH_POSTS_REQUEST, fetchPostsRequest$);
}

const axiosUrl = process.env.NEXT_PUBLIC_SELF_CLIENT_URL;

function* fetchPostsRequest$(action) {
  try {
    yield put({ type: actionTypes.FETCH_POSTS_REQUEST });
    const res = yield call([axios, "post"], `${axiosUrl}/api/posts/get_post_list`);
    if (res.data.status !== 200) {
      const text = "error!"
      throw text;
    }
    yield put({ type: actionTypes.FETCH_POSTS_SUCCESS, payload: res.data.detail });
  } catch (err) {
    // 실패 로직: 나중에 작성할 것임
    console.log(err);
  } finally {
    // API 호출 종료를 설정한다
  }
}