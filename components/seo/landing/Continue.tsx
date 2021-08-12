import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { HANDSVG } from "./handSvg";
import { useRouter } from "next/dist/client/router";
import LoadingSpinner from "../../reusable/LoadingSpinner";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 163px;
  padding: 100px 0;
  position: relative;
  @media screen and (max-width: 760px) {
    padding: 2rem 0 4rem 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;
const Heading = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 29px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #373f51;
  margin: 5rem 0;
  @media screen and (max-width: 760px) {
    font-weight: bold;
    font-size: 20px;
    text-align: left;
    margin: 3rem 0;
    line-height: 30px;
  }
`;

const Button = styled.button`
  width: 435px;
  height: 70px;
  border: 0;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 35px;
  line-height: 41px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #ffffff;
  filter: drop-shadow(0px 10px 50px #609ffb);
  background: linear-gradient(91.89deg, #3377ef 5.33%, #609ffb 71.9%);
  border-radius: 5px;
  position: relative;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    filter: drop-shadow(0 0 0 transparent);
  }
  @media screen and (max-width: 760px) {
    width: 100%;
    font-size: 30px;
    line-height: 35px;
  }
`;
const SvgContainer = styled.div`
  position: absolute;
  bottom: -55%;
  right: -5%;
`;
const ArrowSvgContainer = styled.div`
  display: none;
`;
type Props = {
  id: string | string[];
};
const Continue = ({ id }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const svg = (
    <svg
      width="64"
      height="63"
      viewBox="0 0 64 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0)">
        <path
          d="M-1.37691e-06 31.5C-6.17658e-07 48.8696 14.3547 63 32 63C49.6453 63 64 48.8696 64 31.5C64 14.1304 49.6453 5.45933e-06 32 6.23063e-06C14.3547 7.00193e-06 -2.13616e-06 14.1304 -1.37691e-06 31.5Z"
          fill="#3377EF"
        />
        <path
          d="M-1.37691e-06 31.5C-6.17658e-07 48.8696 14.3547 63 32 63C49.6453 63 64 48.8696 64 31.5L-1.37691e-06 31.5Z"
          fill="#609FFB"
        />
        <path
          d="M48.6666 31.5L39.9999 31.5L39.9999 46.5938C39.9999 48.4024 38.5039 49.875 36.6666 49.875L27.3332 49.875C25.4959 49.875 23.9999 48.4024 23.9999 46.5938L23.9999 31.5L15.3332 31.5C13.5732 31.5 12.6692 29.4131 13.8906 28.1663L30.5572 11.1038C30.9359 10.7179 31.4559 10.5 31.9999 10.5C32.5439 10.5 33.0639 10.7179 33.4426 11.1038L50.1092 28.1663C51.3252 29.4131 50.4292 31.5 48.6666 31.5Z"
          fill="white"
        />
        <path
          d="M32 49.875L32 10.5C32.544 10.5 33.064 10.7179 33.4427 11.1038L50.1093 28.1663C50.4933 28.56 50.6667 29.043 50.6667 29.5155C50.6667 30.5261 49.872 31.5 48.6667 31.5L40 31.5L40 46.5938C40 48.4024 38.504 49.875 36.6667 49.875L32 49.875Z"
          fill="#DEDEDE"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            width="63"
            height="64"
            fill="white"
            transform="translate(0 63) rotate(-90)"
          />
        </clipPath>
      </defs>
    </svg>
  );

  const handleNextPage = () => {
    setLoading(true);
    return router.push(`/seo/steptwo/${id}`);
  };
  return (
    <Section>
      <Content>
        <Heading>
          Click here and secure the above keywords before they are taken by
          another business
        </Heading>

        {!loading ? (
          <Button onClick={() => handleNextPage()}>
            Continue <SvgContainer>{HANDSVG}</SvgContainer>
          </Button>
        ) : (
          <LoadingSpinner color="#609ffb" text="" />
        )}
      </Content>
      <ArrowSvgContainer>{svg}</ArrowSvgContainer>
    </Section>
  );
};

Continue.propTypes = {};

export default Continue;
