import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { svg } from "./svg";
import { useKeyWordDistribution } from "../seoHooks/useKeywordDistribution";
import LoadingSpinner from "../../reusable/LoadingSpinner";

const Section = styled.header`
  min-height: 1080px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
const Heading = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 50px;
  /* or 125% */

  text-align: center;
  letter-spacing: 0.01em;

  color: #373f51;
  @media screen and (max-width: 760px) {
    font-size: 30px;
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
  text-transform: lowercase;

  color: #596275;
  @media screen and (max-width: 760px) {
    font-size: 20px;
    margin: 0.4rem 0;
  }
`;
const Keyword = styled.h2`
  font-family: Montserrat;
  font-style: italic;
  font-weight: 900;
  font-size: 60px;
  line-height: 73px;
  text-align: center;
  letter-spacing: 0.01em;
  text-transform: lowercase;

  color: #373f51;
  @media screen and (max-width: 760px) {
    font-size: 40px;
    margin: 0.4rem 0;
  }
`;
const SvgContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Header = ({ data }) => {
  const {
    findUser: { user },
  } = data;
  const keywords = useKeyWordDistribution(user);
  if (keywords.length === 0) {
    return <LoadingSpinner text="Loading Page..." color="dodgeblue" />;
  }
  return (
    <Section>
      <Content>
        <Heading>Thank you, your payment was successful.</Heading>
        <Text>Your keywords</Text>
        <Keyword>{keywords[0].value}</Keyword>
        <Text>have been successfully secured</Text>
        <SvgContainer>{svg}</SvgContainer>
      </Content>
    </Section>
  );
};

Header.propTypes = {};

export default Header;
