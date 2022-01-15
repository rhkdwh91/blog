export interface IUserState {
  isLogin: boolean;
}

const initialState: IUserState = {
  isLogin: false,
};

export const SET_LOGIN = "@board/SET_LOGIN" as const;

const reducer = (state = initialState as IUserState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return { ...state, isLogin: action.data.payload };
    default:
      return state;
  }
};

export default reducer;
