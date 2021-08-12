import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { Check } from "react-feather";
import { v4 as uuidv4 } from "uuid";
import AnswerButton from "../answers/AnswerButton";

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
const Select = styled.div`
  height: 1.7rem;
  width: 1.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.color ? props.color : "#eee")};
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
`;

const Answers = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.7s linear forwards;
`;
const Answer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  box-shadow: 0 0 0 1px #66666627;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    box-shadow: 0 01px 15px #66666627;
  }
`;
const AnswerText = styled.p`
  margin: 0;
  margin-left: 2rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #666;
`;

const SelectType = ({
  item,
  selectAnswer,
  answerSelected,
  handleAnswerSelection,
  loading,
}) => {
  return (
    <>
      <Answers>
        {item?.answers.map((obj: any, index: number) => {
          return (
            <Answer key={uuidv4()} onClick={() => selectAnswer(index)}>
              {index === answerSelected ? (
                <Select color="#119da4">
                  <Check color="#fff" />
                </Select>
              ) : (
                <Select />
              )}
              <AnswerText>{obj.answer}</AnswerText>
            </Answer>
          );
        })}
      </Answers>
      <AnswerButton
        handleAnswerSelection={handleAnswerSelection}
        item={item}
        loading={loading}
        answerSelected={answerSelected}
        question={item.question}
        answer={item.answers[answerSelected]?.answer}
      />
    </>
  );
};

SelectType.propTypes = {};

export default SelectType;
