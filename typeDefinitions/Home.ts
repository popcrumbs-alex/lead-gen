import { ActionCreator } from "redux";

export type HomeParameters = {
  formScheme: any;
  addFormSchemeToState: any;
  addStepsToScheme: Function;
};

export type HeaderParameters = {
  reward: string;
};

export type FormParameters = {
  data: Array<any>;
  formScheme: any;
  setHeadline: ActionCreator<string>;
  completeStep: ActionCreator<number>;
  setAuthToken: ActionCreator<string>;
  setUser: any;
  auth: any;
};

export type EmailParameters = {
  collectData: any;
  addEmail: any;
};
