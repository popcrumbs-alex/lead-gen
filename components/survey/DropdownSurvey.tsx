import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { useMutation } from "@apollo/client";
import { BATCH_ADD_QUESTIONS } from "../../graphql/mutations/addQuestions";

const fadeIn = keyframes`
  0%{
    opacity:0;
    transform:translatex(10vh);
  }
  100%{
    opacity:1;
    transform:translatex(0);
  }
`;
const Box = styled.form`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 40vh;
  @media screen and (max-width: 760px) {
    min-height: 30vh;
    width: 100%;
  }
`;

const QuestionRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #66666627;
  margin: 0.5rem 0;
  padding: 0.5rem 0;
  animation: ${fadeIn} 0.3s linear forwards;
  @media screen and (max-width: 760px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 0;
    margin: 0;
  }
`;

const Question = styled.p`
  color: #003d5b;
  animation: ${fadeIn} 0.5s linear forwards;
  max-width: 80%;
  font-size: 1.2rem;
  font-weight: 500;
  animation: ${fadeIn} 0.3s linear forwards;
  @media screen and (max-width: 760px) {
    font-size: 1rem;
    margin: 0.5rem 0;
  }
`;

const SelectInput = styled.select`
  padding: 1rem;
  border-radius: 5px;
  background: #003d5b20;
  border: 1px solid transparent;
  color: #003d5b;
  min-width: 20rem;
  animation: ${fadeIn} 0.3s linear forwards;
  transition: all 0.3s ease-in-out;
  &:focus {
    outline: 1px solid transparent;
    box-shadow: 0 0 0 2px #003d5b77;
  }
  &:hover {
    box-shadow: 0 0 0 2px #003d5b77;
  }
`;
const TextInput = styled.input`
  padding: 1rem;
  border-radius: 5px;
  background: #003d5b20;
  border: 1px solid transparent;
  color: #003d5b;
  min-width: 20rem;
  animation: ${fadeIn} 0.3s linear forwards;
  transition: all 0.3s ease-in-out;
  &:focus {
    outline: 1px solid transparent;
    box-shadow: 0 0 0 2px #003d5b77;
  }
  &:hover {
    box-shadow: 0 0 0 2px #003d5b77;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  width: 75%;
  align-items: center;
  @media screen and (max-width: 760px) {
    flex-direction: column-reverse;
    width: 95%;
  }
`;

const SkipButton = styled.button`
  padding: 1rem 2rem;
  border-radius: 5px;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  background: #ff101f;
  border: 0px solid transparent;
  box-shadow: 0 0 0 4px #ff101f01;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0 4px #ff101f33;
  }
  @media screen and (max-width: 760px) {
    width: 100%;
    margin: 2rem 0;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  border-radius: 5px;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  background: #119da4;
  border: 0px solid transparent;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 0px 4px #119da401;
  position: relative;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0px 4px #119da422;
  }
  @media screen and (max-width: 760px) {
    margin-top: 1rem;
    width: 100%;
  }
`;

const SurveyHeading = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s linear forwards;
`;
const HeadingText = styled.h1`
  color: #003d5b;
  margin: 2rem 0;
  @media screen and (max-width: 760px) {
    font-size: 1.2rem;
    margin: 2rem 0 1rem 0;
  }
`;

const DropdownSurvey = ({
  questionData,
  surveyId,
  handleDropdownFormSubmit,
  formData,
}) => {
  const [postData, collectData] = useState<Array<any>>([]);

  const [dataToBeSent, getData] = useState<any>([]);

  const [addBatchData, { error, data, loading }] =
    useMutation(BATCH_ADD_QUESTIONS);

  const onChange = (
    e: React.FormEvent<HTMLSelectElement> | React.FormEvent<HTMLInputElement>
  ) => {
    getData([
      ...dataToBeSent.map((item: { question: string; answer: string }) => {
        //need to find question by key
        if (item.question === e.currentTarget.name) {
          item.answer = e.currentTarget.value;
        }
        return item;
      }),
    ]);
  };

  const submitData = (e: React.FormEvent, skipped: boolean) => {
    e.preventDefault();

    console.log("e", e);
    if (dataToBeSent.length > 0 && !skipped) {
      const blankInputs =
        dataToBeSent.filter((obj: { answer: string }) => obj.answer === "")
          .length > 0;
      if (blankInputs) {
        window.alert("Please fill out required fields");
        return false;
      }

      addBatchData({
        variables: {
          questions: dataToBeSent,
          surveyId,
        },
      });
      //move onto next survey
      handleDropdownFormSubmit(postData.length);
    }
  };

  useEffect(() => {
    if (questionData) {
      //set initial posting data
      collectData([...questionData]);
      getData([
        ...questionData.map(
          (obj: { question: string; answers: Array<any> }) => ({
            question: obj.question,
            answer: obj.answers[0]?.answer || "",
          })
        ),
      ]);
    }
  }, [questionData]);

  console.log("rel ", formData);
  if (postData.length === 0) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong :(</p>;
  }

  return (
    <>
      <SurveyHeading>
        <HeadingText>{formData?.surveyName.toUpperCase()}</HeadingText>
      </SurveyHeading>
      <Box onSubmit={(e) => submitData(e, false)}>
        {postData?.map(
          (
            data: {
              question: string;
              answers: Array<any>;
              typeOfInput: string;
            },
            i: number
          ) => {
            return (
              <QuestionRow key={i}>
                <Question>{data.question}</Question>
                {data?.answers.length > 0 && data.typeOfInput === "dropdown" && (
                  <SelectInput name={data.question} onChange={onChange}>
                    {data.answers.map((answerObj: { answer: string }, key) => {
                      return (
                        <option key={key} value={answerObj.answer}>
                          {answerObj.answer}
                        </option>
                      );
                    })}
                  </SelectInput>
                )}
                {data.typeOfInput !== "dropdown" && postData.length > 0 && (
                  <TextInput
                    type={data.typeOfInput}
                    placeholder={data.question}
                    required={true}
                    name={data.question}
                    onChange={onChange}
                  />
                )}
              </QuestionRow>
            );
          }
        )}
      </Box>
      <ButtonRow>
        <SkipButton onClick={(e) => handleDropdownFormSubmit(postData.length)}>
          No Thanks
        </SkipButton>
        {!loading ? (
          <SubmitButton onClick={(e) => submitData(e, false)}>
            Yes, Get Free Quotes
          </SubmitButton>
        ) : (
          <p>Loading...</p>
        )}
      </ButtonRow>
    </>
  );
};

DropdownSurvey.propTypes = {};

export default DropdownSurvey;
