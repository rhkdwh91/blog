import { HYDRATE } from "next-redux-wrapper";
import { combineReducers, AnyAction } from "redux";
import posts from "./posts/reducer";
import { IPostsState } from "./posts/reducer";

export type State = {
  posts: IPostsState;
};

const rootReducer = (state: State | undefined, action: AnyAction): State => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        posts,
      });
      return combinedReducer(state, action);
    }
  }
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
