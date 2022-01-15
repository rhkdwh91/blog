import { HYDRATE } from "next-redux-wrapper";
import { combineReducers, AnyAction } from "redux";
import user, { IUserState } from "./user";
import board, { IBoardState } from "./board";

export type State = {
  user: IUserState;
  board: IBoardState;
};

const rootReducer = (state: State | undefined, action: AnyAction): State => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        board,
      });
      return combinedReducer(state, action);
    }
  }
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
