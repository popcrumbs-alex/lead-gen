import React from "react";
import PropTypes from "prop-types";
import SEOLayout from "../../UI/layout/seoLayout/SEOLayout";
import SEOLanding from "../../components/seo/SEOLanding";

const SEO = () => {
  return (
    <SEOLayout>
      <SEOLanding />
    </SEOLayout>
  );
};

SEO.propTypes = {};

export default SEO;
