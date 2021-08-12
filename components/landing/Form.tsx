import React, { useEffect, useState } from "react";
import { FormParameters } from "../../typeDefinitions/Home";
import FormContainer from "./FormContainer";
import Info from "./Info";
import Address from "./Address";
import LoadingScreen from "../reusable/LoadingScreen";
import { connect, RootStateOrAny } from "react-redux";
import { completeStep, setHeadline } from "../../redux/actions/formScheme";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/mutations/createUser";
import { setAuthToken, setUser } from "../../redux/actions/auth";
import { useRouter } from "next/dist/client/router";

const Form = ({
  formScheme: { headline, steps },
  setHeadline,
  completeStep,
  setAuthToken,
  setUser,
  auth: { currentUser, isAuthenticated },
}: FormParameters) => {
  const [dataAggregate, collectData] = useState<any>({
    questions: null,
    customerInfo: null,
  });

  const { push } = useRouter();

  const [infoAdded, addInfo] = useState<boolean>(false);

  const [readyForSubmit, setReadyState] = useState<boolean>(false);

  const [showLoadingScreen, updateLoadingState] = useState<boolean>(false);

  const [finishedLoadingAnimations, handleLoadingAnims] = useState(false);

  const [allStepsCompleted, checkSteps] = useState<boolean>(false);

  const loadingTime = 14000;

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const handleLoadingScreenState = (value: boolean) => {
    if (value) {
      updateLoadingState(true);

      setTimeout(() => {
        updateLoadingState(false);
        //set the sequence to be finished in order to send user to survey
        handleLoadingAnims(true);
      }, loadingTime - 2000);
    }

    return () => clearTimeout();
  };

  const checkStepCompletionOnLoad = () =>
    checkSteps(steps.every((step: { completed: boolean }) => step.completed));

  useEffect(() => {
    //load the step check on load
    checkStepCompletionOnLoad();
  }, []);

  //determine when to show users the loading screen;
  useEffect(() => {
    handleLoadingScreenState(loading);
  }, [loading]);

  useEffect(() => {
    if (readyForSubmit) {
      completeStep(1);
      createUser({ variables: dataAggregate.customerInfo });
    }
  }, [readyForSubmit]);

  useEffect(() => {
    if (infoAdded) {
      //complete the first step by sending the index
      completeStep(0);
    }
  }, [infoAdded]);

  //once user is created authenticate utilizing redux store
  useEffect(() => {
    if (data) {
      const {
        createUser: { token, user },
      } = data;
      setAuthToken(token);
      setUser(user);
    }
  }, [data]);

  useEffect(() => {
    if (isAuthenticated && currentUser && finishedLoadingAnimations) {
      push("/surveys/Surveys");
    }
  }, [isAuthenticated, currentUser, finishedLoadingAnimations]);

  if (showLoadingScreen) {
    return (
      <LoadingScreen
        color="#fff"
        text="Validating Information"
        subColor="#5EEB5B"
        loadingTime={loadingTime}
      />
    );
  }

  if (infoAdded) {
    return (
      <FormContainer headline={headline}>
        <Address
          collectData={collectData}
          setHeadline={setHeadline}
          setReadyState={setReadyState}
        />
      </FormContainer>
    );
  }

  if (allStepsCompleted) {
    return (
      <FormContainer headline="Looks like you already completed the form">
        <div></div>
      </FormContainer>
    );
  }

  return (
    <FormContainer headline={headline}>
      <Info
        collectData={collectData}
        addInfo={addInfo}
        setHeadline={setHeadline}
      />
    </FormContainer>
  );
};

const mapStateToProps = (state: RootStateOrAny) => ({
  formScheme: state.formScheme,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  setHeadline,
  completeStep,
  setAuthToken,
  setUser,
})(Form);
