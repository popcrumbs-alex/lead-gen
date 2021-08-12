import React, { useEffect } from "react";
import styled from "styled-components";
import { completeStep } from "../../redux/actions/formScheme";
import { connect } from "react-redux";
import Head from "next/head";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem 0;
  min-height: 20rem;
`;
const Heading = styled.h1`
  font-size: 3rem;
  text-align: center;
  font-weight: 700;
  color: #003d5b;
  @media screen and (max-width: 760px) {
    font-size: 2rem;
    margin: 0.5rem 0;
  }
`;
const Paragraph = styled.p`
  font-size: 1.2rem;
  line-height: 1.3;
  letter-spacing: 1.3px;
  color: #66666688;
  text-align: center;
  @media screen and (max-width: 760px) {
    margin: 0.5rem 0;
  }
`;

//finishing step 3 is the thank you page
const ThankYou = ({ completeStep }) => {
  useEffect(() => {
    completeStep(3);
    completeStep(4);
  }, []);

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `EF.conversion({
              offer_id: 102,
              event_id: 277,
          });`,
          }}
        ></script>
      </Head>
      <Container>
        <Heading>Thank you for filling out the survey!</Heading>
        <Paragraph>
          Your information has been saved and entered to win the reward!
        </Paragraph>
      </Container>
    </>
  );
};

ThankYou.propTypes = {};

export default connect(null, { completeStep })(ThankYou);
