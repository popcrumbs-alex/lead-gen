import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useKeyWordDistribution } from "../seoHooks/useKeywordDistribution";
import LoadingSpinner from "../../reusable/LoadingSpinner";
import Countdown from "react-countdown";
import { CountDownTimer } from "./CountDownTimer";

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 1040px;
  position: relative;
  @media screen and (max-width: 760px) {
    min-height: 800px;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;
const Box = styled.div`
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 50px;
  /* or 125% */
  max-width: 900px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #373f51;
  & span {
    color: red;
    text-decoration: line-through;
  }
  @media screen and (max-width: 760px) {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 800;
    font-size: 30px;
    line-height: 40px;
    /* or 133% */
    text-align: left;
    color: #373f51;
    margin: 0.2rem 0;
  }
`;
const Keyword = styled.h3`
  font-family: Montserrat;
  font-weight: 800;
  font-size: 30px;
  font-style: italic;
  line-height: 30px;
  /* or 125% */
  max-width: 900px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #fff;
  background: #329f5b;
  border-radius: 3px;
  padding: 0.5rem;
  margin: 2rem 0 1rem 0;
  @media screen and (max-width: 760px) {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 800;
    font-size: 30px;
    line-height: 40px;
    /* or 133% */
    text-align: left;
    color: #373f51;
    margin: 0.2rem 0;
  }
`;
const Tag = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
  text-align: center;
  letter-spacing: 0.01em;
  text-transform: lowercase;

  color: #596275;
  @media screen and (max-width: 760px) {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    /* or 150% */
    text-align: left;
    text-transform: lowercase;
    margin: 0.2rem 0;
    color: #596275;
  }
`;

const Text = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
  text-align: center;
  letter-spacing: 0.01em;
  text-transform: uppercase;

  color: #596275;
  @media screen and (max-width: 760px) {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
    /* or 150% */

    text-transform: uppercase;
    text-align: left;
    color: #596275;
  }
`;
const Direction = styled.div`
  position: absolute;
  width: 130px;
  height: 133.2px;
  background: #ffffff;
  border-radius: 100px;
  top: 92%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
const ArrowSvgContainer = styled.div`padding 1rem 0;`;

const Header = ({ userData }) => {
  const {
    findUser: { user },
  } = userData;

  const keywords = useKeyWordDistribution(user);

  const ArrowSvg = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5L12 19"
        stroke="#373F51"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19 12L12 19L5 12"
        stroke="#373F51"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  if (keywords.length === 0) {
    return <LoadingSpinner text="Loading keywords" color="#666" />;
  }

  return (
    <HeaderContainer>
      <Content>
        <Box>
          {" "}
          <Title>
            Unfortunately the keyword (
            <span>{keywords[1].value.split(":")[0]}</span>) has been secured by
            another user
          </Title>
          <Tag>
            We still have the below keyword available and will hold it for
          </Tag>
          <Countdown
            date={Date.now() + 420000}
            renderer={CountDownTimer}
            zeroPadTime={2}
            precision={3}
          />
          <Keyword>{keywords[0].value}</Keyword>
          <Text>
            Upon completion of your information below an SEO strategist will
            have a discovery call with you to go over everything you want us to
            know about your business so we can ensure those searching for it
            know what to expect.
          </Text>
        </Box>
      </Content>
      <Direction>
        <ArrowSvgContainer>{ArrowSvg}</ArrowSvgContainer>
      </Direction>
    </HeaderContainer>
  );
};

Header.propTypes = {};

export default Header;
