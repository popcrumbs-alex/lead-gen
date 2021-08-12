import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { RewardSvg } from "./RewardSvg";
import LoadingSpinner from "./LoadingSpinner";

const fadeIn = keyframes`
    0% {
        opacity:0;
        transform:translateX(-100vw); 
    }
    100% {
        opacity:1;
        transform:translateY(0);
    }`;

const Pop = keyframes`
    0%{
        transform:scale(.8);
    }
    50% {
        transform:scale(1.1);
    }
    100% {
        transform:scale(1);
    }
`;
const slideIn = keyframes`
    0%{
        opacity:0;
        transform:translateX(-40vw);
    }
    100%{opacity:1;
        transform:translateX(0);
    }
`;

const Container = styled.section`
  height: 100vh;
  width: 100vw;
  background-color: #003d5b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  animation: ${fadeIn} 0.3s linear;
  overflow: hidden;
`;
const Confetti = styled.div`
  background-image: url("https://ik.imagekit.io/usam13ogl7u/confetti-bg_SEZQuMU7i.png");
  background-size: contain;
  opacity: 0.6;
  backgound-repeat: no-repeat;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  animation: ${Pop} 0.3s linear forwards;
  top: 0;
  left: 0;
  z-index: 0;
`;
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  @media screen and (max-width: 760px) {
    width: 90%;
  }
`;
const Heading = styled.h1`
  color: ${(props) => props.color};
  font-weight: 700;
  font-size: 3rem;
  margin: 0.5rem 0;
  @media screen and (max-width: 760px) {
    font-size: 2rem;
    text-align: center;
  }
`;

const AnimContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
  animation: ${Pop} 0.3s linear forwards;
  @media screen and (max-width: 760px) {
    width: 90%;
  }
`;

const SaveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${slideIn} 0.5s linear forwards;
`;

const Token = styled.h3`
  padding: 1rem;
  font-weight: 400;
  font-size: 2.5rem;
  margin: 0.5rem 0;
  background-color: ${(props) => props.color};
  color: #fff;
  font-weight: 700;
  border-radius: 3px;
  @media screen and (max-width: 760px) {
    font-size: 1.5rem;
  }
`;

const Subject = styled.h2`
  color: ${(props) => props.color};
  font-weight: 400;
  font-size: 2.5rem;
  margin: 0.5rem 0;
  @media screen and (max-width: 760px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const LoadingScreen = ({ text, color, subColor, loadingTime }) => {
  const tokens = [
    "#4234n4nfm3d",
    "#4234n4nfa4x",
    "#4234n4nfxs4",
    "#4234n4nam14",
    "#4234nscfdsf",
    "#4234nfd4ff4",
    "#423647jrnnr",
    "#434545454df",
    "#413234vdfdf",
    "#225678nng34",
    "#3rdsfdsfdsd",
    "#e32edefesfe",
    "#e32edefdswr",
    "#e32edef1234",
    "#ddfdgfdgfs3",
  ];

  const [processing, setProcessing] = useState<boolean>(true);
  const [generating, generate] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [code, setCode] = useState<string>("#4234n4nfm3d");
  const [current, setIndex] = useState<number>(0);
  const [heading, setHeading] = useState("Validating information");

  const handleIndexChange = () => {
    const max = tokens.length - 1;

    if (current >= max) {
      setIndex(0);
      return false;
    }

    setIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    //Process data entered
    if (processing) {
      setTimeout(() => {
        setProcessing(false);
        generate(true);
        setHeading("Congrats! Your Information Was Confirmed");
      }, loadingTime / 2);
    }
  }, [processing]);

  useEffect(() => {
    //save reward token
    if (generating) {
      setTimeout(() => {
        setHeading("Your Reward Token Has Been Saved!");
        generate(false);
        setSaving(true);
      }, loadingTime / 2);
    }
  }, [generating]);

  useEffect(() => {
    //generate the reward code
    let time: any;
    if (generating) {
      time = setTimeout(() => {
        handleIndexChange();
      }, 50);
    }
    return () => clearTimeout(time);
  }, [current, generating]);

  useEffect(() => {
    if (current >= 0) {
      setCode(tokens[current]);
    }
  }, [current]);

  return (
    <Container>
      <Inner>
        <Heading color={color}>{heading}</Heading>
        {!processing && <Confetti />}
        {processing && (
          <LoadingSpinner text="Checking for errors..." color={subColor} />
        )}
        {generating && (
          <AnimContainer>
            <Subject color={subColor}>Generating Your Reward Token</Subject>
            <RewardSvg code={code} />
          </AnimContainer>
        )}
        {saving && (
          <SaveContainer>
            <Subject color={subColor}>Your token is </Subject>
            <Token color={subColor}>{tokens[current]}</Token>
          </SaveContainer>
        )}
      </Inner>
    </Container>
  );
};

LoadingScreen.propTypes = {};

export default LoadingScreen;
