import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, createStore, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

/*
export interface SagaStore extends Store<State, AnyAction> {
  sagaTask: Task;
}
*/

const loggerMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    return next(action);
  };

const configureStore = () => {
  //const sagaMiddleware = createSagaMiddleware();
  //const middlewares = [sagaMiddleware, loggerMiddleware];
  const middlewares = [loggerMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  //(store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
