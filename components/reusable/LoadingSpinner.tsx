import React from "react";
import styled, { keyframes } from "styled-components";

type SpinnerParams = {
  color: string;
  text: string;
};

const spin = keyframes` 
   100% {
    transform:rotate(360deg);
    }`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Text = styled.h4`
  color: ${(props) => props.color};
  font-weight: 700;
`;
const Spinner = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 1000px;
  border: 3px solid ${(props) => props.color};
  border-top: 3px solid transparent;
  animation: ${spin} 0.5s linear infinite;
`;

const LoadingSpinner = ({ color, text }: SpinnerParams) => {
  return (
    <Container>
      <Text color={color}>{text}</Text>
      <Spinner color={color} />
    </Container>
  );
};

export default LoadingSpinner;
