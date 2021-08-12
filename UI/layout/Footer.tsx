import React from "react";
import styled from "styled-components";

const Container = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2rem 0;
`;
const Inner = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 760px) {
    width: 90%;
  }
`;
const Disclaimer = styled.div`
  display: flex;
`;
const Text = styled.p`
  color: #003d5b;
  text-align: center;
  font-size: 0.9rem;
`;
const Policies = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

const Link = styled.a`
  color: #003d5b;
  @media screen and (max-width: 760px) {
    text-align: center;
    margin: 0 0.3rem;
  }
`;

const Credits = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Footer = () => {
  const linkData = [
    { name: "Privacy Policy", to: "#" },
    { name: "Program Requirements", to: "/" },
    { name: "About", to: "/" },
    { name: "Rewards Status", to: "/" },
  ];
  return (
    <Container>
      <Inner>
        <Disclaimer>
          <Text>
            Trade names or rights associated with all brands on this site are
            the property of their respective owners and are not affiliated with
            this promotion.
          </Text>
        </Disclaimer>
        <Policies>
          {linkData.map((link: { name: string; to: string }) => {
            return (
              <Link href={link.to} key={link.name}>
                {link.name}
              </Link>
            );
          })}
        </Policies>
        <Credits>
          <Text>
            &copy; {new Date().getFullYear()} winfreeadvertising.com all rights
            reserved
          </Text>
        </Credits>
      </Inner>
    </Container>
  );
};
