import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { LOAD_ALL_FORMS } from "../../graphql/queries/formQuery";
import LoadingScreen from "../../components/reusable/LoadingScreen";
import ErrorPage from "../errors/ErrorPage";
import SurveyComponent from "../../components/survey/SurveyComponent";
import { addFormSchemeToState } from "../../redux/actions/formScheme";
import { connect } from "react-redux";

const Surveys = ({ addFormSchemeToState }) => {
  const { data, loading, error } = useQuery(LOAD_ALL_FORMS);

  useEffect(() => {
    if (data) {
      addFormSchemeToState(data.loadAllForms.form);
    }
  }, [data]);

  if (loading) {
    return (
      <LoadingScreen
        text="Loading Sruveys"
        color="#fff"
        subColor="#eee"
        loadingTime={5000}
      />
    );
  }

  if (error) {
    return <ErrorPage error={error.message} />;
  }

  console.log("surveys", data);

  return <SurveyComponent formData={data.loadAllForms.form} />;
};

Surveys.propTypes = {};

export default connect(null, { addFormSchemeToState })(Surveys);
