import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import TextInputType from "./questionTypes/TextInputType";
import SelectType from "./questionTypes/SelectType";

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
const Box = styled.div`
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

const ItemDescription = styled.p`
  margin: 0.5rem 0;
  font-style: italic;
  color: #999;
`;

const QuestionHeading = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #66666627;
  margin-bottom: 1rem;
  animation: ${fadeIn} 0.3s linear forwards;
  @media screen and (max-width: 760px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Question = styled.h2`
  color: #003d5b;
  animation: ${fadeIn} 0.5s linear forwards;
  max-width: 80%;
  @media screen and (max-width: 760px) {
    font-size: 1.2rem;
    margin: 1.5rem 0 0.5rem 0;
    max-width: 100%;
  }
`;

const QuestionNumber = styled.h4`
  font-weight: 100;
  color: #666666;
  animation: ${fadeIn} 0.5s linear forwards;
`;

const SingleQuestionComponent = ({
  questionData,
  current,
  questions,
  selectAnswer,
  answerSelected,
  loading,
  handleAnswerSelection,
}) => {
  //survey questions
  const [receivedData, receiveData] = useState<Array<any>>([]);

  useEffect(() => {
    if (questionData.length > 0) {
      receiveData(questionData);
    }
  }, [questionData]);

  if (questionData.length === 0) {
    return <p>Loading questions...</p>;
  }

  if (receivedData.length === 0) {
    return <p>Hmmmm something went wrong</p>;
  }

  return (
    <>
      {
        receivedData.map(
          (
            item: {
              skipRestOfSurvey: boolean;
              question: string;
              answers: Array<any>;
              typeOfInput: string;
              description: string;
              orderNum: number;
            },
            i: number
          ) => {
            return (
              <Box key={i}>
                <QuestionHeading>
                  <Question>{item.question}</Question>
                  <QuestionNumber>
                    {current + 1} of {questions.length}
                  </QuestionNumber>
                </QuestionHeading>
                {item.description && (
                  <ItemDescription>{item.description}</ItemDescription>
                )}
                {
                  {
                    select: (
                      // Select Types have preset answers to choose from
                      // Answer choosing is index based
                      <SelectType
                        item={item}
                        answerSelected={answerSelected}
                        selectAnswer={selectAnswer}
                        handleAnswerSelection={handleAnswerSelection}
                        loading={loading}
                      />
                    ),
                    text: (
                      // Text Box Types do not use pre set answers
                      // answer selection is then different and can be any
                      <TextInputType
                        item={item}
                        handleAnswerSelection={handleAnswerSelection}
                        loading={loading}
                        selectAnswer={selectAnswer}
                        answerSelected={answerSelected}
                      />
                    ),
                  }[item?.typeOfInput]
                }
              </Box>
            );
          }
        )[current]
      }
    </>
  );
};

SingleQuestionComponent.propTypes = {};

export default SingleQuestionComponent;
