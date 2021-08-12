import React from "react";
import PropTypes from "prop-types";
import Header from "./landing/Header";
import ListingSection from "./landing/ListingSection";
import Continue from "./landing/Continue";
import { useQuery } from "@apollo/client";
import { FIND_USER } from "../../graphql/queries/user";
import LoadingSpinner from "../reusable/LoadingSpinner";
import ErrorPage from "../../pages/errors/ErrorPage";
import { useRouter } from "next/dist/client/router";

const SEOLanding = () => {
  const router = useRouter();

  const { loading, data, error } = useQuery(FIND_USER, {
    variables: { id: router.query.id },
  });

  if (loading) {
    return <LoadingSpinner color="#666" text="Loading page, please wait" />;
  }

  if (error) {
    return <ErrorPage error={error.message} />;
  }

  return (
    <>
      <Header data={data} />
      <ListingSection data={data} />
      <Continue id={router.query.id} />
    </>
  );
};

SEOLanding.propTypes = {};

export default SEOLanding;
