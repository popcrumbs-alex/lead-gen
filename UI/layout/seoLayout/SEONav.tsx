import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Nav = styled.nav`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(95.63deg, #3377ef 3.02%, #609ffb 93.97%);
`;
const Content = styled.div`
  width: 90%;
  display: flex;
`;
const Title = styled.h3`
  color: #fff;
  font-weight: 500;
  font-family: Montserrat;
  font-size: 25px;
`;

const SEONav = (props) => {
  return (
    <Nav>
      <Content>
        <Title>$29 SEO</Title>
      </Content>
    </Nav>
  );
};

SEONav.propTypes = {};

export default SEONav;
