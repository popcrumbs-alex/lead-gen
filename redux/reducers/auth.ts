import { RootStateOrAny } from "react-redux";
import {
  RE_AUTH_USER,
  SET_AUTH_TOKEN,
  SET_CURRENT_USER,
} from "../types/authTypes";

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loadingUser: true,
};

export const auth = (
  state: RootStateOrAny = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;

  switch (type) {
    case SET_AUTH_TOKEN:
      localStorage.setItem("@auth_token", payload);
      return {
        ...state,
      };
    case SET_CURRENT_USER:
      console.log("payload:", payload);
      return {
        ...state,
        currentUser: payload,
        isAuthenticated: true,
        loadingUser: false,
      };
    case RE_AUTH_USER:
      return {
        ...state,
        currentUser: payload,
        isAuthenticated: true,
        loadingUser: false,
      };
    default:
      return state;
  }
};
