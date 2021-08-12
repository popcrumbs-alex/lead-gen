import React from "react";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";
import { ArrowLeft } from "react-feather";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
const Inner = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const ErrorHeading = styled.h1`
  font-size: 3rem;
  margin: 1rem 0;
`;
const Grouping = styled.div`
  background: #66666622;
  padding: 2rem;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const SubHeading = styled.h2`
  font-size: 2rem;
  margin: 0.5rem 0;
`;
const Caption = styled.h4`
  font-size: 1rem;
  margin: 0.5rem 0;
  color: #666;
`;
const Button = styled.button`
  padding: 1rem 2rem;
  color: #fff;
  background-color: #222;
  border-radius: 3px;
  border: 0;
  max-width: 20rem;
  margin: 1rem 0;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0 5px #22222233;
    padding-right: 4rem;
  }
`;

const ErrorPage = ({ error }) => {
  const { push } = useRouter();
  const returnHome = () => {
    return push("/");
  };

  console.log("error", error);
  return (
    <Container>
      <Inner>
        <ErrorHeading>{error}</ErrorHeading>
        <Grouping>
          <SubHeading>Hello Darkness My Old Friend</SubHeading>
          <Caption>Looks like there's nothing here</Caption>

          <Button onPointerDown={(e) => returnHome()}>
            <ArrowLeft />
            {` `} Go Back
          </Button>
        </Grouping>
      </Inner>
    </Container>
  );
};

export default ErrorPage;
