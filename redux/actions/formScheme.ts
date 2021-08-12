import { Action, ActionCreator, ActionFromReducer } from "redux";
import {
  ADD_FORM_SCHEME,
  ADD_INITIAL_STEPS,
  COMPLETE_STEP,
  FORM_SCHEME_ERROR,
  LOAD_FORM_SCHEME,
  SET_HEADLINE,
} from "../types/formSchemeTypes";

export const addFormSchemeToState = (formData: any) => async (dispatch) => {
  try {
    const payload = formData;

    dispatch({
      type: LOAD_FORM_SCHEME,
      payload,
    });
  } catch (error) {
    console.error("ADD_FORM_TO_SCHEME_ERROR:", error);
    dispatch({
      type: FORM_SCHEME_ERROR,
      payload: error,
    });
  }
};

export const addStepsToScheme = (steps: Array<any>) => async (dispatch) => {
  dispatch({
    type: ADD_INITIAL_STEPS,
    payload: steps,
  });
};

export const setHeadline: ActionCreator<void> =
  (data: string) => async (dispatch: any) => {
    dispatch({
      type: SET_HEADLINE,
      payload: data,
    });
  };

export const completeStep: ActionCreator<void> =
  (step: number) => async (dispatch: any) => {
    dispatch({
      type: COMPLETE_STEP,
      payload: step,
    });
  };
