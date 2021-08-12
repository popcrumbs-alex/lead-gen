import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { HeaderParameters } from "../../typeDefinitions/Home";
import { Check } from "react-feather";

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

const Container = styled.header`
  height: 17rem;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  animation: ${fadeIn} 1.3s ease forwards;
  @media screen and (max-width: 760px) {
    flex-direction: column;
    min-height: 20rem;
    max-height: 25rem;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.datatype});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  @media screen and (max-width: 760px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Headline = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0.5rem;
  opacity: 0.9;
  & h1 {
    color: #222;
    font-size: 2rem;
    margin: 0.5rem;
  }
  @media screen and (max-width: 760px) {
    min-width: 85%;
    & h1 {
      font-size: 1.2rem;
      padding: 0rem;
      margin: 0.5rem 0;
    }
  }
`;

const RewardBox = styled.div`
  background: #fff;
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;

const Image = styled.img`
  object-fit: contain;
  width: 50%;
  @media screen and (max-width: 760px) {
    width: 100%;
    max-height: 10rem;
  }
`;

const Logo = styled.img`
  object-fit: contain;
  max-width: 15rem;
  @media screen and (max-width: 760px) {
    max-width: 10rem;
    margin-top: -1rem;
  }
`;

const Availability = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #eee;
  & h2 {
    font-size: 1.5rem;
    & span {
      color: #5eeb5b;
    }
  }
  & svg {
    margin: 0 0.3rem;
    color: #5eeb5b;
  }
  @media screen and (max-width: 760px) {
    & h2 {
      font-size: 1rem;
    }
  }
`;

const Header = ({ reward }: HeaderParameters) => {
  const imgSrc =
    "https://ik.imagekit.io/usam13ogl7u/AdobeStock_291513748_Editorial_Use_Only_xxBBMq8l_L.png";
  const rewardLogo =
    "https://ik.imagekit.io/usam13ogl7u/-11596996178apaxd1pez2_LuSkdKaii.png";
  return (
    <Container>
      <Content>
        <Image src={imgSrc} />
        <RewardBox>
          <Availability>
            <h2>
              Status: <span>Available</span>
            </h2>

            <Check />
          </Availability>
          <Headline>
            <h1>{reward}</h1>
          </Headline>
          <Logo src={rewardLogo} />
        </RewardBox>
      </Content>
    </Container>
  );
};

Header.propTypes = {};

export default Header;
