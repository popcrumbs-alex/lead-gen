import React from "react";
import styled from "styled-components";
import ProgressBar from "../../../components/reusable/ProgressBar";
import { Footer } from "../Footer";
const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 5rem;
  background-color: #fbfbfb;
`;
const Constrictor = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;
const Container = ({ children }) => {
  return (
    <Main>
      <Header>
        <Constrictor>
          <ProgressBar />
        </Constrictor>
      </Header>
      {children}
      <Footer />
    </Main>
  );
};

export default Container;
