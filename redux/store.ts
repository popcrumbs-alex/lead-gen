import { useMemo } from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import { RootStateOrAny } from "react-redux";
import { formScheme } from "./reducers/formScheme";
import { auth } from "./reducers/auth";

let store;

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({ formScheme, auth });

const reducer = (
  state: RootStateOrAny,
  action: { type: string; payload: any }
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const initStore = (val: any) => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

export const initializeStore = (preloadedState: RootStateOrAny) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
