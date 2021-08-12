import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

const Screen = styled.section`
  height: 100vh;
  width: 100vw;
  background: ${(props) => props.color};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Message = styled.h1`
  color: ${(props) => props.color};
  font-weight: 700;
`;
const RedirectScreen = ({ message, color, textColor, spinnerColor }) => {
  return (
    <Screen color={color}>
      <Message color={textColor}>{message}</Message>
      <LoadingSpinner text="" color={spinnerColor} />
    </Screen>
  );
};

RedirectScreen.propTypes = {};

export default RedirectScreen;
