import { ActionCreator } from "redux";
import {
  RE_AUTH_USER,
  SET_AUTH_TOKEN,
  SET_CURRENT_USER,
} from "../types/authTypes";

export const setAuthToken: ActionCreator<void> =
  (token: string) => async (dispatch: any) => {
    dispatch({
      type: SET_AUTH_TOKEN,
      payload: token,
    });
  };

export const setUser: ActionCreator<void> =
  (data: any) => async (dispatch: any) => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: data,
    });
  };

export const authenticateUser: ActionCreator<void> =
  (data: any) => async (disptach) => {
    disptach({
      type: RE_AUTH_USER,
      payload: data,
    });
  };
