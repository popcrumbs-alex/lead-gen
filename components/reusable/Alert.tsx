import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { AlertCircle, XCircle } from "react-feather";

const AlertContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 2px;
  position: absolute;
  bottom: 100%;
  right: 00%;
  z-index: 2;
  padding: 0.2rem;
`;

const Message = styled.p`
  color: #fff;
  margin: 0;
  color: ${(props) => props.color};
`;
const Close = styled.div`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Alert = ({ message, type, closeFunc }) => {
  console.log("error in alert", message, type);
  return (
    <AlertContainer color={type === "danger" ? "#FF101F" : "#35FF6933"}>
      <Close onPointerDown={() => closeFunc()}>
        <AlertCircle color="#FF101F" size={14} />
      </Close>
      <Message color={type === "danger" ? "#FF101F" : "#35FF6933"}>
        {" "}
        {message}
      </Message>
    </AlertContainer>
  );
};

Alert.propTypes = {};

export default Alert;
