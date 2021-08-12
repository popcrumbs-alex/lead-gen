import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { LISTINGSVG } from "./listingSvg";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-height: 1154px;
  background: #fcfcfc;

  @media screen and (max-width: 760px) {
    padding: 4rem 0 2rem 0;
    min-height: 900px;
    background: linear-gradient(
      180deg,
      #fcfcfc 0%,
      rgba(252, 252, 252, 0.87) 100%
    );
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 95%;
  justify-content: space-around;
  align-items: center;
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
`;

const SvgContainer = styled.div`
  display: block;
  @media screen and (max-width: 760px) {
    position: relative;
    height: 45vh;
    width: 100%;
    & svg {
      position: absolute;
      width: 100%;
      width: 380.79px;
      height: 301.59px;
      left: 0;
    }
  }
`;
const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  & > p:nth-child(1) {
    text-decoration-line: underline;
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
  color: #596275;
  & span {
    font-weight: 800;
  }
  @media screen and (max-width: 760px) {
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    text-align: left;
  }
`;

const ListingSection = ({ data }) => {
  return (
    <Section>
      <Content>
        <Heading>Your listing on the 1st page</Heading>
        <SvgContainer>{LISTINGSVG}</SvgContainer>
        <TextBlock>
          <Text>
            Normally these first page listings go for <span>$599 a month</span>{" "}
            and up.
          </Text>
          <Text>
            But since you were selected as a top candidate in the area and we
            love helping businesses like (business name) get more customers we
            can offer it for <span>only $59 a month</span>, but only for a
            limited time.
          </Text>
        </TextBlock>
      </Content>
    </Section>
  );
};

ListingSection.propTypes = {};

export default ListingSection;
