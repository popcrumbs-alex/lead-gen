import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { connect, RootStateOrAny } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  @media screen and (max-width: 760px) {
    width: 95%;
  }
`;
const Heading = styled.h4`
  font-size: 0.8rem;
  margin: 0.5rem 0;
  color: #003d5b55;
`;
const Bar = styled.div`
  width: 100%;
  border-radius: 60px;
  height: 4px;
  background: #eee;
  display: block;
  position: relative;
`;
const Fill = styled.div`
  width: ${(props: any) => props.datatype}%;
  transition: all 1s ease-in-out;
  height: 100%;
  background: #5eeb5b;
  display: block;
  border-radius: 60px;
`;

const SurveyHeader = ({ currentQuestionIndex, totalQuestionAmt }) => {
  console.log("data from header", currentQuestionIndex);

  const [currentWidth, setCurrentWidth] = useState<number>(0);

  const handleFillWidth = () => {
    const percentage = (currentQuestionIndex / totalQuestionAmt) * 100;
    console.log("perky", percentage);
    setCurrentWidth(percentage);
  };

  useMemo(() => {
    handleFillWidth();
  }, [currentQuestionIndex]);

  return (
    <Container>
      <Heading>Progress</Heading>
      <Bar>
        <Fill datatype={`${currentWidth}`} />
      </Bar>
    </Container>
  );
};

SurveyHeader.propTypes = {};

const mapStateToProps = (state: RootStateOrAny) => ({
  formScheme: state.formScheme,
});
export default connect(mapStateToProps, {})(SurveyHeader);
