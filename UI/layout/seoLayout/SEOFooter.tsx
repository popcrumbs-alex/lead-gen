import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Footer = styled.footer`
  height: 90px;
  background: #373f51;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  width: 90%;
  align-items: center;
  justify-content: center;
`;
const Text = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
  letter-spacing: 0.01em;
  color: #babcc0;
`;

const SEOFooter = () => {
  return (
    <Footer>
      <Content>
        <Text>$29 SEO</Text>
      </Content>
    </Footer>
  );
};

SEOFooter.propTypes = {};

export default SEOFooter;
