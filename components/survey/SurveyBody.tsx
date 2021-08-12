import React, { useEffect, useState } from "react";
import { connect, RootStateOrAny } from "react-redux";
import LoadingSpinner from "../reusable/LoadingSpinner";
import styled, { keyframes } from "styled-components";
import { completeStep } from "../../redux/actions/formScheme";
import { useMutation } from "@apollo/client";
import { ADD_QUESTION_DATA } from "../../graphql/mutations/addQuestions";
import SurveyHeader from "./SurveyHeader";
import DropdownSurvey from "./DropdownSurvey";
import SingleQuestionComponent from "./SingleQuestionComponent";

const Survey = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-bottom: 4rem;
  z-index: 2;
  height: 100%;
  margin-top: -1rem;
  min-height: 60vh;
  @media screen and (max-width: 760px) {
    min-height: 30vh;
    padding-bottom: 1.5rem;
  }
`;

const Inner = styled.div`
  width: 80%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 30px #66666622;
  background: #fff;
  padding: 3rem;
  border-radius: 10px;
  min-height: 60vh;
  @media screen and (max-width: 760px) {
    width: 95%;
    padding: 2rem 1rem;
    min-height: 30vh;
  }
`;

const SurveyBody = ({
  formScheme: { loadingForms },
  form,
  handleCurrentForm,
  completeStep,
  totalQuestionAmt,
}) => {
  //Handle the question index
  const [current, setCurrent] = useState<number>(0);
  //for the total of questions of survey
  const [max, setMax] = useState<number>(null);
  //index for single component answer selection
  const [answerSelected, selectAnswer] = useState<any>(null);

  const [questionData, setData] = useState<Array<any>>([]);
  //State of questions within one form
  //Must add all when skipping and all when submitting
  const [currentQuestionIndex, setIndex] = useState<number>(0);

  const [addData, { error, loading, data }] = useMutation(ADD_QUESTION_DATA);

  //props handling of going to next form after questions answered
  const handleFormDiffing = (currentIndex: number, maxIndex: number) => {
    //change the form on parent company
    handleCurrentForm(current, max);

    if (currentIndex > maxIndex) {
      setCurrent(0);
    }
  };

  const handleFormSkip = (answer: string, skipSequencer: boolean = false) => {
    if (answer.toLowerCase() === "no" && skipSequencer) {
      //go to next form
      setCurrent(max + 1);
      //add all the questions within a skip
      setIndex((prevIndex: number) => prevIndex + max);
      return 1;
    }

    return 0;
  };

  const handleAnswerSelection = (
    selected: {
      question: string;
      answer: string;
      questionSchemaRefId: string;
    },
    canSkip: boolean
  ) => {
    if (!selected) return;
    if (current > max) return;
    //pass data to graphql server
    console.log("selected", selected);
    addData({
      variables: {
        question: selected.question,
        answer: selected.answer,
        surveyId: form.id,
        questionSchemaRefId: selected.questionSchemaRefId,
      },
    });
    //if user selects no on skippable questions
    const isSkipped = handleFormSkip(selected.answer, canSkip);
    //set up for new answer to be selected
    selectAnswer(null);

    if (isSkipped) return;
    //handle index change of questions within each form
    setCurrent((prevIndex) => prevIndex + 1);
    //handle index change out of total questions
    setIndex((prevIndex: number) => prevIndex + 1);
  };

  const handleDropdownFormSubmit = (maxQuestions: number) => {
    setCurrent((prevIndex: number) => maxQuestions + 1);
    setIndex((prevIndex: number) => prevIndex + maxQuestions);
  };

  useEffect(() => {
    //complete or skip offer step
    completeStep(2);
  }, []);

  useEffect(() => {
    if (form?.questions) {
      //Need to sort the surveys by order number given in schemas
      const questionScheme = form.questions
        .slice()
        .sort(
          (questionA: { orderNum: number }, questionB: { orderNum: number }) =>
            questionA.orderNum > questionB.orderNum ? 1 : -1
        );
      //The form scheme comes in a reversed order :/
      setData(questionScheme);
      //Needed to end the survey
      setMax(questionScheme.length - 1);
    }
  }, [form]);

  //handle when to transition to next form via parent component
  useEffect(() => {
    //once the current index exceeds the max amount of questions, render the next form
    handleFormDiffing(current, max);
  }, [current, max]);

  if (loadingForms) {
    return <LoadingSpinner color="#666666" text="Loading Survey..." />;
  }

  if (!form) {
    return <LoadingSpinner color="#666666" text="Loading Survey..." />;
  }

  const { questions } = form;

  if (!questions) {
    return <LoadingSpinner color="#666666" text="Loading Survey..." />;
  }

  if (error) {
    console.error("error", error);
    return <p>Hmmm something weird happened</p>;
  }

  return (
    <Survey>
      <Inner>
        <SurveyHeader
          totalQuestionAmt={totalQuestionAmt}
          currentQuestionIndex={currentQuestionIndex}
        />
        {
          {
            "single-component": (
              <DropdownSurvey
                surveyId={form?.id}
                questionData={questionData}
                handleDropdownFormSubmit={handleDropdownFormSubmit}
                formData={form}
              />
            ),
            regular: (
              <SingleQuestionComponent
                handleAnswerSelection={handleAnswerSelection}
                current={current}
                questionData={questionData}
                questions={questions}
                selectAnswer={selectAnswer}
                answerSelected={answerSelected}
                loading={loading}
              />
            ),
            "": (
              <SingleQuestionComponent
                handleAnswerSelection={handleAnswerSelection}
                current={current}
                questionData={questionData}
                questions={questions}
                selectAnswer={selectAnswer}
                answerSelected={answerSelected}
                loading={loading}
              />
            ),
          }[form?.surveyType || ""]
        }
      </Inner>
    </Survey>
  );
};

SurveyBody.propTypes = {};

const mapStateToProps = (state: RootStateOrAny) => ({
  formScheme: state.formScheme,
  auth: state.auth,
});

export default connect(mapStateToProps, { completeStep })(SurveyBody);
