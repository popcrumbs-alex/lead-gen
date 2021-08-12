import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Layout = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const AdminLayout = ({ children }) => {
  return <Layout>{children}</Layout>;
};

AdminLayout.propTypes = {};

export default AdminLayout;
