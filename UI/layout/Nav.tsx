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

const Navigation = styled.nav`
  width: 100%;
  min-height: 5rem;
  max-height: 5.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  animation: ${fadeIn} 1s ease forwards;
  @media screen and (max-width: 760px) {
    padding: 1rem 0;
    max-height: 7rem;
  }
`;
const Content = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  & p {
    color: #fff;
    font-weight: 700;
  }
  @media screen and (max-width: 760px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Logo = styled.img`
  object-fit: contain;
  max-width: 15rem;
  @media screen and (max-width: 760px) {
    max-width: 10rem;
  }
`;

const LinkBox = styled.div`
  display: flex;
  align-items: center;
`;
const Link = styled.a`
  text-decoration: none;
  color: #fff;
  font-size: 0.9rem;
`;
const Div = styled.p`
  text-decoration: none;
  color: #fff;
  font-size: 0.9rem;
  margin: 0 1rem;
`;

const Nav = () => {
  return (
    <Navigation color={"#119DA4"}>
      <Content>
        <Logo
          src={`https://ik.imagekit.io/usam13ogl7u/winfreelogo_1___JCPjNfRS.png`}
        />
        <LinkBox>
          <Link>Privacy Policy</Link>
          <Div>{`|`}</Div>
          <Link>Terms {`&`} Conditions</Link>
        </LinkBox>
      </Content>
    </Navigation>
  );
};

export default Nav;
