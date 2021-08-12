import {
  ADD_INITIAL_STEPS,
  COMPLETE_STEP,
  FORM_SCHEME_ERROR,
  LOAD_FORM_SCHEME,
  SET_HEADLINE,
} from "../types/formSchemeTypes";

const initialState = {
  loading: true,
  formScheme: null,
  formErrors: null,
  headline: "Enter To Win",
  loadingForms: true,
  steps: [
    {
      title: "Business",
      completed: false,
      current: false,
    },
    {
      title: "Address",
      completed: false,
      current: false,
    },
    {
      title: "Offers",
      completed: false,
      current: false,
    },
    {
      title: "Survey",
      completed: false,
      current: false,
    },
    {
      title: "Reward!",
      completed: false,
      current: false,
    },
  ],
};

export const formScheme = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_INITIAL_STEPS:
      return {
        ...state,
        steps: payload,
      };
    case LOAD_FORM_SCHEME:
      return {
        ...state,
        loading: false,
        formScheme: payload,
        loadingForms: false,
      };
    case FORM_SCHEME_ERROR:
      return {
        ...state,
        loading: false,
        formErrors: payload,
      };
    case SET_HEADLINE:
      return {
        ...state,
        headline: payload,
      };

    case COMPLETE_STEP:
      //payload should return a number index
      state.steps[payload].completed = true;
      localStorage.setItem("@currentStep", payload);
      return {
        ...state,
        steps: state.steps.map((step, i) => {
          if (i === payload) step.current = true;
          else step.current = false;
          return step;
        }),
      };
    default:
      return state;
  }
};
