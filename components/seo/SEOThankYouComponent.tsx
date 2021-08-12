import React from "react";
import Header from "./thankyou/Header";
import { useRouter } from "next/dist/client/router";
import { useQuery } from "@apollo/client";
import { FIND_USER } from "../../graphql/queries/user";
import LoadingSpinner from "../reusable/LoadingSpinner";
import ErrorPage from "../../pages/errors/ErrorPage";

const SEOThankYouComponent = () => {
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
      <Header data={data} />
    </>
  );
};

export default SEOThankYouComponent;
