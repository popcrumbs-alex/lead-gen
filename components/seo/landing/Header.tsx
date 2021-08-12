import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { SEOSVG } from "./headerSvg";
import { useKeyWordDistribution } from "../seoHooks/useKeywordDistribution";
import { AiFillAlert } from "react-icons/ai";

const Pulse = keyframes`
  0%{
    transform:scale(1);
  }
  50% {
    transform:scale(1.05);
  }
  100%{
    transform:scale(1);
  }
`;
const HeaderSection = styled.header`
  min-height: 919px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gqp: 1rem;
  width: 90%;
  @media screen and (max-width: 760px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
const Heading = styled.h1`
  font-family: Montserrat;
  font-style: italic;
  font-weight: 800;
  font-size: 40px;
  line-height: 50px;
  /* or 125% */
  letter-spacing: 0.01em;
  color: #373f51;
  @media screen and (max-width: 760px) {
    font-weight: 800;
    font-size: 30px;
    line-height: 40px;
  }
`;
const Keywords = styled.div``;
const KW = styled.p`
  font-family: Montserrat;
  font-style: italic;
  font-weight: 500;
  font-size: 35px;
  line-height: 43px;
  letter-spacing: 0.01em;
  text-transform: lowercase;
  color: #596275;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  @media screen and (max-width: 760px) {
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
  }
`;
const Text = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #596275;
  @media screen and (max-width: 760px) {
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    /* or 150% */
    text-transform: lowercase;
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
const SvgContainer = styled.div`
  padding: 1rem 0;
  @media screen and (max-width: 760px) {
    padding: 0;
    max-width: 100%;
    height: 30vh;
    & svg {
      height: 100%;
      width: 100%;
    }
  }
`;

const ArrowSvgContainer = styled.div`padding 1rem 0;`;

const DecorativeOutline = styled.div`
  position: absolute;
  width: 115.6px;
  height: 109.69px;
  left: 28.28px;
  top: 753.67px;
  border: 1px solid #80b3ff;
  box-sizing: border-box;
  border-radius: 30px;
  transform: matrix(0.73, -0.68, -0.68, -0.73, 0, 0);
  @media screen and (max-width: 760px) {
    left: 80%;
    top: 500px;
  }
`;
const DecorativeBox = styled.div`
  position: absolute;
  width: 115.6px;
  height: 109.69px;
  left: -18.65px;
  top: 750.44px;
  background: rgba(235, 239, 242, 0.42);
  border-radius: 30px;
  transform: matrix(0.73, -0.68, -0.68, -0.73, 0, 0);
  @media screen and (max-width: 760px) {
    left: 90%;
    top: 500px;
  }
`;

const Available = styled.div`
  background: #329f5b;
  border-radius: 3px;
  padding: 0.1rem 0.5rem;
  margin-left: 0.5rem;
  color: #fff;
  font-size: 13px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  font-weight: 700;
  animation: ${Pulse} 1s infinite;
`;

const Unavailable = styled.span``;

const Warning = styled.span`
  margin-left: 0.5rem;
  color: red;
  text-decoration: line-through;
`;

const Header = ({ data }) => {
  const {
    findUser: { user },
  } = data;

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
    return <p>Loading keywords...</p>;
  }

  return (
    <HeaderSection>
      <Content>
        <Column>
          <Heading>
            {user.firstName} {user.lastName}, {user.businessName} is eligible
            for a first page Google listing for the following keywords
          </Heading>
          <Keywords>
            {keywords.map((kw: { key: string; value: string }, i: number) => {
              return (
                <KW key={i}>
                  {kw.key}:{" "}
                  {i !== keywords.length - 1 ? (
                    <>
                      {kw.value}
                      <Available>
                        <AiFillAlert
                          size={15}
                          style={{ marginRight: ".5rem" }}
                        />
                        AVAILABLE
                      </Available>
                    </>
                  ) : (
                    <Unavailable>
                      {kw.value.split(":")[0]}
                      <Warning>{kw.value.split(":")[1]}</Warning>
                    </Unavailable>
                  )}
                </KW>
              );
            })}
          </Keywords>
          <Text>
            If you wish to secure the above available Keywords please continue
            below.{" "}
          </Text>
        </Column>
        <Column>
          <SvgContainer>{SEOSVG}</SvgContainer>
        </Column>
      </Content>
      <Direction>
        <ArrowSvgContainer>{ArrowSvg}</ArrowSvgContainer>
      </Direction>
      <DecorativeOutline />
      <DecorativeBox />
    </HeaderSection>
  );
};

Header.propTypes = {};

export default Header;
