import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ArrowRight } from "react-feather";
import LoadingSpinner from "../../reusable/LoadingSpinner";

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 760px) {
    justify-content: stretch;
  }
`;

const NextButton = styled.button`
  padding: 1rem;
  border: 0;
  border-radius: 3px;
  width: 13rem;
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  margin-top: 1rem;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 0px 3px #119da422;
  position: relative;
  &:hover {
    cursor: pointer;
    box-shadow: 0 1px 20px #119da422;
  }
  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;

const ArrowContainer = styled.div`
  position: absolute;
  color: #fff;
  font-weight: 700;
  right: 10%;
  bottom: 20%;
  display: block;
  opacity: 1;
  z-index: 2;
  transform: translateY(0);
  transition: all 0.3s ease-in-out;
`;

const AnswerButton = ({
  loading,
  answerSelected,
  handleAnswerSelection,
  item,
  question,
  answer,
}) => {
  console.log("item", item);
  //UI control for certain buttons to show arrows
  const [showNextArrow, toggleArrow] = useState<boolean>(false);
  //   console.log("answer!", answer);
  return (
    <ButtonContainer>
      {!loading ? (
        <NextButton
          onMouseEnter={() => toggleArrow(true)}
          onMouseLeave={() => toggleArrow(false)}
          disabled={answerSelected === null}
          onClick={() =>
            handleAnswerSelection(
              {
                question,
                answer,
                questionSchemaRefId: item._id,
              },
              item.skipRestOfSurvey
            )
          }
          style={{
            background: answerSelected === null ? "#119da422" : "#119da4",
          }}
        >
          Next
          {showNextArrow ? (
            <ArrowContainer>
              <ArrowRight />
            </ArrowContainer>
          ) : (
            <ArrowContainer
              style={{
                opacity: 0,
                transform: "translateY(10vh)",
              }}
            >
              <ArrowRight />
            </ArrowContainer>
          )}
        </NextButton>
      ) : (
        <LoadingSpinner color="#119da4" text="Sending..." />
      )}
    </ButtonContainer>
  );
};

AnswerButton.propTypes = {};

export default AnswerButton;
