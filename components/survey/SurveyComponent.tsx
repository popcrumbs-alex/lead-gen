import { useQuery } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { AUTHENTICATE_USER } from "../../graphql/queries/auth";
import ErrorPage from "../../pages/errors/ErrorPage";
import { authenticateUser } from "../../redux/actions/auth";
import Container from "../../UI/layout/surveyLayout/Container";
import RedirectScreen from "../reusable/RedirectScreen";
import SurveyBody from "./SurveyBody";
import ThankYou from "./ThankYou";

const SurveyComponent = ({
  auth: { isAuthenticated, loadingUser },
  formData,
  authenticateUser,
  formScheme,
}: any) => {
  const { data, loading, error } = useQuery(AUTHENTICATE_USER);

  const [sortedForms, sortThemForms] = useState<Array<any>>([]);

  const [currentForm, setCurrent] = useState<number>(0);

  const [endOfSurveys, setEnd] = useState<number>(10);

  //go to next form once survey is complete
  const handleCurrentForm = (currentIndex: number, maxIndex: number) =>
    currentIndex > maxIndex && setCurrent((prevIndex: number) => prevIndex + 1);

  //each form is passed a number as it's order in the flow
  //Sort by order number
  const sortForms = (forms: any) =>
    sortThemForms(
      forms
        .slice()
        .sort(
          (
            formA: { surveyOrderNum: number },
            formB: { surveyOrderNum: number }
          ) => (formA.surveyOrderNum > formB.surveyOrderNum ? 1 : -1)
        )
    );

  //Need to grab amount of questions per form in order to properly show progress
  const getTotalQuestionAmount = (data: Array<any>) =>
    data.slice().reduce((acc, formObj: any) => {
      return (acc += formObj.questions.length);
    }, 0);

  const totalQuestionAmt = useMemo(() => {
    return getTotalQuestionAmount(formData);
  }, [formData]);

  //handle re authenticating on page refresh if token is available
  useEffect(() => {
    if (data) {
      authenticateUser(data?.authUser?.user);
    }
  }, [data]);

  //set the max amount of forms to go through
  useEffect(() => {
    if (formData) {
      setEnd(formData.length - 1);
      //pass the form array to get sorted
      sortForms(formData);
    }
  }, [formData]);

  if (error) {
    return <ErrorPage error={error.message} />;
  }

  if (loadingUser) {
    return (
      <RedirectScreen
        color="#003D5B"
        textColor="#fff"
        message="Please wait while we redirect to next step"
        spinnerColor="#119da4"
      />
    );
  }

  if (!isAuthenticated && !loadingUser) {
    return <ErrorPage error="Error Status 403: Forbidden 'No Authorization'" />;
  }

  //Show a thank you page once user has gone thru surveys FOR NOWWWWWW
  if (currentForm > endOfSurveys) {
    return (
      <Container>
        <ThankYou />
      </Container>
    );
  }

  return (
    <Container>
      <SurveyBody
        form={sortedForms[currentForm]}
        handleCurrentForm={handleCurrentForm}
        totalQuestionAmt={totalQuestionAmt}
      />
    </Container>
  );
};

const mapStateToProps = (state: RootStateOrAny) => ({
  auth: state.auth,
  formScheme: state.formScheme,
});

export default connect(mapStateToProps, { authenticateUser })(SurveyComponent);
