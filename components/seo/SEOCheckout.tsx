import React from "react";
import Header from "./checkout/Header";
import FormContainer from "./checkout/FormContainer";
import { useQuery } from "@apollo/client";
import { FIND_USER } from "../../graphql/queries/user";
import { useRouter } from "next/dist/client/router";
import ErrorPage from "../../pages/errors/ErrorPage";
import LoadingSpinner from "../reusable/LoadingSpinner";

const SEOCheckout = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(FIND_USER, {
    variables: { id: router.query.id },
  });

  if (loading) {
    return <LoadingSpinner color="#555" text="loading page" />;
  }

  if (error) {
    return <ErrorPage error={error.message} />;
  }

  return (
    <>
      <Header userData={data} />
      <FormContainer userData={data} />
    </>
  );
};

SEOCheckout.propTypes = {};

export default SEOCheckout;
