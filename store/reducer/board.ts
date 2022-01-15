export interface IBoardState {
  title: string;
  content: string;
}

const initialState: IBoardState = {
  title: "",
  content: "",
};

export const CHANGE_TITLE = "@board/CHANGE_TITLE" as const;
export const CHANGE_CONTENT = "@board/CHANGE_CONTENT" as const;

const reducer = (state = initialState as IBoardState, action) => {
  switch (action.type) {
    case CHANGE_TITLE:
      return { ...state, title: action.data };
    case CHANGE_CONTENT:
      return { ...state, content: action.data };
    default:
      return state;
  }
};

export default reducer;
