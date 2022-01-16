export interface IUserState {
  isLogin: boolean;
  user: {
    user_id: number;
    user_name: string;
    createdAt: string;
    updatedAt: string;
  };
}

const initialState: IUserState = {
  isLogin: false,
  user: {
    user_id: 0,
    user_name: "",
    createdAt: "",
    updatedAt: "",
  },
};

export const SET_IS_LOGIN = "@user/SET_LOGIN" as const;
export const SET_USER = "@user/SET_USER" as const;
export const LOGIN_SUCCESS = "@user/LOGIN_SUCCESS" as const;
export const LOGOUT_SUCCESS = "@user/LOGOUT_SUCCESS" as const;

const reducer = (state = initialState as IUserState, action) => {
  switch (action.type) {
    case SET_IS_LOGIN:
      return { ...state, isLogin: action.data };
    case SET_USER:
      return { ...state, user: action.data };
    case LOGIN_SUCCESS:
      return { ...state, isLogin: true, user: action.data };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLogin: false,
        user: {
          user_id: 0,
          user_name: "",
          createdAt: "",
          updatedAt: "",
        },
      };
    default:
      return state;
  }
};

export default reducer;
