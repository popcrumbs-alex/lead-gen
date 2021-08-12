import React from "react";
import styled from "styled-components";
import SEONav from "./SEONav";
import SEOFooter from "./SEOFooter";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  overflow-x: hidden;
  background: #fff;
`;
const Container = styled.div`
  max-width: 1996px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SEOLayout = ({ children }) => {
  return (
    <Main>
      <Container>
        <SEONav />
        {children}
        <SEOFooter />
      </Container>
    </Main>
  );
};

SEOLayout.propTypes = {};

export default SEOLayout;
