import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { LOAD_FORM } from "../graphql/queries/formQuery";
import {
  addFormSchemeToState,
  addStepsToScheme,
} from "../redux/actions/formScheme";
import { HomeParameters } from "../typeDefinitions/Home";
import Layout from "../UI/layout/Layout";
import Nav from "../UI/layout/Nav";
import Form from "../components/landing/Form";
import Header from "../components/landing/Header";
import ProgressBar from "../components/reusable/ProgressBar";
import styled from "styled-components";
import LoadingSpinner from "../components/reusable/LoadingSpinner";
import Head from "next/head";

const LoadingContainer = styled.section`
  width: 100vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const initialSteps = [
  {
    title: "Business",
    completed: false,
    current: false,
  },
  {
    title: "Address",
    completed: false,
    current: false,
  },
  {
    title: "Offers",
    completed: false,
    current: false,
  },
  {
    title: "Survey",
    completed: false,
    current: false,
  },
  {
    title: "Reward!",
    completed: false,
    current: false,
  },
];

const Home = ({ addFormSchemeToState, addStepsToScheme }: HomeParameters) => {
  const { loading, error, data } = useQuery(LOAD_FORM);

  useEffect(() => {
    if (!loading && data) {
      addFormSchemeToState(data.loadForm);
    }
  }, [loading, data]);

  //need to remove the session items if user goes back to beginning
  useEffect(() => {
    localStorage.removeItem("@auth_token");
    localStorage.removeItem("@currentStep");
    localStorage.removeItem("@email");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0 });
    }
  }, []);

  useEffect(() => {
    addStepsToScheme(initialSteps);
  }, []);

  console.log("is loading? ", loading);

  if (error) {
    return (
      <Layout>
        <h1>Uh Oh, Looks like something went horribly wrong!</h1>
        <p>please try reloading the page</p>
      </Layout>
    );
  }

  if (loading || !data) {
    return (
      <Layout>
        <Header reward="Win $1000 in Google Ads" />
        <ProgressBar />
        <LoadingContainer>
          <LoadingSpinner color="#666" text="Loading..." />
        </LoadingContainer>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `EF.conversion({
              offer_id: 102,
              event_id: 274,
          });`,
          }}
        ></script>
      </Head>
      <Nav />
      <Layout>
        <Header reward="Win $1000 in Google Ads" />
        <ProgressBar />
        <Form data={data.loadForm.form} />
      </Layout>
    </>
  );
};

const mapStateToProps = (state: RootStateOrAny) => ({
  formScheme: state.formScheme,
});

export default connect(mapStateToProps, {
  addFormSchemeToState,
  addStepsToScheme,
})(Home);
