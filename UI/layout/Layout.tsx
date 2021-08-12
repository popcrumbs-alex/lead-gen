import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Footer } from "./Footer";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eee;
  width: 100%;
  overflow-x: hidden;
`;
const Container = styled.div`
  width: 90%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;

const Layout = ({ children }) => {
  return (
    <Main>
      <Container>
        {children}
        <Footer />
      </Container>
    </Main>
  );
};

Layout.propTypes = {};

export default Layout;
