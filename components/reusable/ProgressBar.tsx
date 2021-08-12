import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { connect, RootStateOrAny } from "react-redux";
import { CheckCircle } from "react-feather";
import { completeStep } from "../../redux/actions/formScheme";

const Move = keyframes`
    0%{
        max-width:80%;
    }
    50% {
        max-width:100%;
    }
     100%{
        max-width:80%;
    }
`;
const FadeIn = keyframes`
    0%{
        transform:translateY(-5vh);
        opacity:0;
    }
    100% {
      opacity:1;
        transform:translateY(0);
    }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0;
  padding: 1rem 0 2rem 0;
  background: #003d5b;
  animation: ${FadeIn} 1s linear forwards;
`;
const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  @media screen and (max-width: 760px) {
    width: 95%;
  }
`;
const Bar = styled.div`
  display: block;
  background: #eee;
  border-radius: 120px;
  height: 5px;
  width: 100%;
  position: relative;
`;
const BarFill = styled.div`
  height: 100%;
  max-width: 0;
  border-radius: 120px;
  transition: all 2s ease;
  animation: ${Move} 3s linear infinite;
`;

const BarFillCompleted = styled.div`
  transition: all 2s ease;
  max-width: 100%;
  width: 100%;
  height: 100%;
  border-radius: 120px;
  background-color: #5eeb5b;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0.8rem;
  width: 70%;
`;
const Label = styled.h4`
  display: block;
  position: absolute;
  font-size: 0.8rem;
  text-align: center;
  width: 100%;
  top: 50%;
  left: 0;
  color: ${(props) => props.color};
  transition: all 2s ease;
`;

//TODO figure
const ProgressBar = ({ formScheme: { steps }, completeStep }: any) => {
  //If user refreshes page, access the step in persisted data
  const handleCompleteStepsBelowCurrent = () => {
    const max = parseFloat(localStorage.getItem("@currentStep") || "0");
    console.log("max?", max);
    let step = 0;
    if (max === 0) return;
    while (step <= max) {
      console.log("step!", step);
      completeStep(step);
      step++;
    }
  };

  useEffect(() => {
    handleCompleteStepsBelowCurrent();
  }, []);

  return (
    <Container>
      <Inner>
        {steps.map(
          (
            step: { title: string; completed: boolean; current: boolean },
            index: number
          ) => {
            return (
              <React.Fragment key={step.title}>
                <Step>
                  <CheckCircle
                    color={step.completed ? "#5EEB5B" : "#eeeeee55"}
                    style={{ transition: "all .3s ease" }}
                  />

                  <Label color={step.completed ? "#5EEB5B" : "#eeeeee55"}>
                    {step.title}
                  </Label>
                </Step>
                {index < steps.length - 1 && (
                  <Bar>
                    {step.current ? (
                      <BarFill
                        style={
                          step.completed
                            ? {
                                maxWidth: "100%",
                                width: "100%",
                                backgroundColor: "#5EEB5B",
                              }
                            : {}
                        }
                      />
                    ) : (
                      step.completed && <BarFillCompleted />
                    )}
                  </Bar>
                )}
              </React.Fragment>
            );
          }
        )}
      </Inner>
    </Container>
  );
};

ProgressBar.propTypes = {};

const appState = (state: RootStateOrAny) => ({
  formScheme: state.formScheme,
});

export default connect(appState, { completeStep })(ProgressBar);
