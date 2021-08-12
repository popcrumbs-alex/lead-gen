import { useQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import SurveyComponent from "../../components/survey/SurveyComponent";
import { QUERY_FORM_BY_ID } from "../../graphql/queries/formQuery";
import { addFormSchemeToState } from "../../redux/actions/formScheme";
import ErrorPage from "../errors/ErrorPage";
import Head from "next/head";
const Survey = ({ addFormSchemeToState }) => {
  const { query } = useRouter();

  const { data, error, loading } = useQuery(QUERY_FORM_BY_ID, {
    variables: { id: query.id },
  });

  useEffect(() => {
    if (data) {
      addFormSchemeToState(data.findForm.form);
    }
  }, [data]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <ErrorPage error={error.message} />;
  }

  if (data) {
    return (
      <>
        {" "}
        <Head>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `EF.conversion({
              offer_id: 102,
              event_id: 275,
              });`,
            }}
          ></script>
        </Head>
        <SurveyComponent formData={data} />
      </>
    );
  }

  return <h2>Loading...</h2>;
};

export default connect(null, { addFormSchemeToState })(Survey);
