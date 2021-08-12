import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0%{
    opacity:0;
    transform: translateY(-4vh);
  }
  100% {
    opacity:1;
    transform: translate(0vh);
  }
`;

const Container = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1rem 0 4rem 0;
  min-height: 15rem;
  background-color: #fbfbfb;
  animation: ${fadeIn} 1.6s ease forwards;
`;
const Content = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  @media screen and (max-width: 760px) {
    width: 90%;
  }
`;
const TopBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Heading = styled.h3`
  color: ${(props) => props.color};
  font-weight: 700;
  font-size: 2rem;
  margin: 1rem 0 2rem 0;
  @media screen and (max-width: 760px) {
    font-size: 1.4rem;
    text-align: center;
  }
`;

const FormContainer = ({ children, headline }) => {
  return (
    <Container>
      <Content>
        <TopBar>
          <Heading color={`#003D5B`}>{headline}</Heading>
        </TopBar>
        {children}
      </Content>
    </Container>
  );
};

FormContainer.propTypes = {};

export default FormContainer;
