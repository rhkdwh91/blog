import { actionTypes } from "../actionTypes";

export interface IPostsState {
    list: []
}
  
const initialState:IPostsState = {} as IPostsState;

const reducer = (state = initialState, action) => {
switch (action.type) {
    case actionTypes.FETCH_POSTS_SUCCESS:
        return action.payload;
    default:
        return state;
}
}

export default reducer