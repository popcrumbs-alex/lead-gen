import React from "react";
import styled from "styled-components";

const CountDownContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 0rem 0;
  gap: 1rem;
  @media screen and (max-width: 760px) {
    margin: 0.5rem 0;
  }
`;

const CountColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 8rem;
`;
const CountDown = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 900;
  font-size: 80px;
  line-height: 98px;
  /* identical to box height */

  text-align: center;
  letter-spacing: 0.01em;
  text-transform: lowercase;
  color: #3476ef;
  margin: 0rem;
  @media screen and (max-width: 760px) {
    font-size: 66px;
    line-height: 80px;
    text-align: center;
    letter-spacing: 0.01em;
    text-transform: lowercase;
  }
`;
const Time = styled.h4`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 30px;
  text-align: center;
  letter-spacing: 0.01em;
  margin: 0.2rem 0;
  color: #373f51;
`;

// Random component
const Completionist = () => <span>Time's up!</span>;

// Renderer callback with condition
export const CountDownTimer = ({
  completed,
  formatted: { hours, minutes, seconds },
}) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <CountDownContainer>
        <CountColumn>
          <CountDown>{hours}:</CountDown>
          <Time>hours</Time>
        </CountColumn>
        <CountColumn>
          <CountDown>{minutes}:</CountDown>
          <Time>min</Time>
        </CountColumn>
        <CountColumn>
          <CountDown>{seconds}</CountDown>
          <Time>sec</Time>
        </CountColumn>
      </CountDownContainer>
    );
  }
};
