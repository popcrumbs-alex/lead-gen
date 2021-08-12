import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { useMutation } from "@apollo/client";
import { ACQUIRE_SERVICE } from "../../../graphql/mutations/service";
import LoadingSpinner from "../../reusable/LoadingSpinner";
import { AlertCircle } from "react-feather";
import ErrorPage from "../../../pages/errors/ErrorPage";
const Section = styled.section`
  width: 100%;
  min-height: 1285px;
  background: #fcfcfc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1100px;
  width: 90%;
`;
const Title = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 50px;
  /* or 125% */

  text-align: center;
  letter-spacing: 0.01em;

  color: #373f51;
  @media screen and (max-width: 760px) {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 800;
    font-size: 30px;
    line-height: 40px;
    /* identical to box height, or 133% */

    text-align: center;

    color: #373f51;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 700px;
`;
const Input = styled.input`
  background: #ffffff;
  border: 1px solid #d1d1d1;
  box-sizing: border-box;
  padding: 1rem;
  text-indent: 10px;
  margin: 0.6rem 0;
  border-radius: 5px;
  @media screen and (max-width: 760px) {
    max-width: ${(props) => props["data-type-maxwidth"] + "px" || "100%"};
  }
`;
const PlanRow = styled.div`
  display: flex;
  align-items: center;
  & p {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.01em;

    color: #596275;
    @media screen and (max-width: 760px) {
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 0.01em;

      color: #596275;
    }
  }
`;
const PlanSelect = styled.input`
  width: 29px;
  height: 29px;
  background: #ffffff;
  border: 1px solid #d1d1d1;
  box-sizing: border-box;
  border-radius: 3px;

  @media screen and (max-width: 760px) {
    width: 21px;
    height: 21px;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  background: #f9dc5c63;
  border-radius: 3px;
  margin: 0.5rem 0;
  padding: 1rem;
  border: 4px dashed #f9dc5c;
  & span {
    color: #4a7b9d;
    font-style: italic;
    text-decoration: underline;
    font-weight: 700;
  }
  & p {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 25px;
    /* or 125% */

    letter-spacing: 0.01em;
    text-transform: lowercase;

    font-style: italic;
    color: #222;
    @media screen and (max-width: 760px) {
      font-weight: 500;
      font-size: 16px;
      line-height: 30px;
      /* or 150% */

      text-transform: lowercase;

      color: #596275;
    }
  }
`;

const CreditCardForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.01em;
  color: #596275;
  @media screen and (max-width: 760px) {
    font-size: 15px;
    line-height: 18px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.01em;
    text-transform: uppercase;

    color: #596275;
  }
`;
const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  @media screen and (max-width: 760px) {
    min-width: 30px;
  }
`;
const InputRow = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
  margin: 0.5rem 0;
  position: relative;
  @media screen and (max-width: 760px) {
    gap: 0.4rem;
  }
`;
const Separator = styled.div`
  display: flex;
  align-items: flex-end;
  & p {
      font-size:1.2rem;
      color #eee;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 70px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 35px;
  line-height: 41px;
  letter-spacing: 0.01em;
  border: 0;
  color: #ffffff;
  background: linear-gradient(91.89deg, #3478ef 5.33%, #609ffb 71.9%);
  border-radius: 5px;
  margin: 1rem 0;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 760px) {
    font-size: 25px;
    height: 50px;
  }
`;

const Alert = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem 1rem;
  background: #ff596488;
  border-radius: 3px;
  & p {
    font-weight: 700;
    color: #fff;
    font-size: 1.1rem;
  }
  & svg {
    color: #fff;
    margin-right: 0.5rem;
  }
`;

const FormContainer = ({ userData }) => {
  const {
    findUser: { user },
  } = userData;

  const router = useRouter();

  const [error, setErrors] = useState<any>(null);

  const [sendData, { loading, data, error: graphqlError }] =
    useMutation(ACQUIRE_SERVICE);

  const [serviceData, setServiceData] = useState<any>({
    businessName: "",
    email: "",
    name: "",
    zip: "",
    key: "SEO",
    value: "$29 monthly SEO package paid annually",
    phone: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
  });

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setServiceData({
      ...serviceData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    setErrors(null);
  };
  const planChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { plan } = e.currentTarget.dataset;
    if (!plan) return;
    setServiceData({ ...serviceData, value: plan });
    setErrors(null);
  };
  const {
    businessName,
    email,
    name,
    zip,
    value,
    phone,
    cardNumber,
    expiryMonth,
    expiryYear,
  } = serviceData;

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newServiceObject = {
      service: {
        contact: {
          businessName,
          email,
          name,
          phone,
          zip,
        },
        serviceBought: {
          key: "SEO Plan",
          value: value || "$29 monthly SEO package paid annually",
        },
        paymentInfo: {
          cardNumber,
          expiry: `${expiryMonth}/${expiryYear}`,
          zip,
        },
      },
    };
    sendData({ variables: newServiceObject });
  };

  const callback = useCallback(() => {
    if (user) {
      setServiceData({
        ...serviceData,
        name: user.firstName + " " + user.lastName,
        phone: user.address.phone,
        email: user.email,
        businessName: user.businessName,
      });
    }
  }, []);

  useMemo(() => {
    callback();
  }, [user]);

  useEffect(() => {
    if (error) {
      setErrors(error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      if (data.acquireService.success) {
        router.push(`/seo/thankyou/${router.query.id}`);
      }
      if (!data.acquireService.success) {
        setErrors(data.acquireService.error);
      }
    }
  }, [data]);
  console.log("data!", data);

  if (graphqlError) {
    return <ErrorPage error={graphqlError.message} />;
  }

  return (
    <Section>
      <Container>
        <Title>Lets Get Started</Title>
        <Form>
          <Input
            type="text"
            name="name"
            value={name}
            required={true}
            placeholder="Your Name"
            onChange={onChange}
          />
          <Input
            type="text"
            name="businessName"
            value={businessName}
            required={true}
            placeholder="Your Business Name"
            onChange={onChange}
          />
          <Input
            type="tel"
            name="phone"
            required={true}
            value={phone}
            placeholder="Your Phone #"
            onChange={onChange}
          />
          <Input
            type="email"
            name="email"
            required={true}
            value={email}
            placeholder="Your Email"
            onChange={onChange}
          />
          <PlanRow>
            <PlanSelect
              type="radio"
              name="value"
              value={value}
              onChange={planChange}
              defaultChecked={true}
              data-plan="$29 monthly SEO package paid annually"
            />
            <p>$29 monthly SEO package paid annually</p>
          </PlanRow>
          <PlanRow>
            <PlanSelect
              type="radio"
              name="value"
              value={value}
              onChange={planChange}
              data-plan="$39 monthly paid monthly"
            />
            <p>$39 monthly paid monthly</p>
          </PlanRow>
          <Text>
            <span>Good guy service plan (secure keyword for 30 days) </span>
            <p>
              Selecting a plan secures your keyword(s), you can cancel anytime
              and refunded if service is not right for you once speaking with
              the onboarding agent.
            </p>
          </Text>
          <CreditCardForm>
            <InputRow>
              <InputColumn>
                <Label>Credit Card Number:</Label>
                <Input
                  type="tel"
                  placeholder="XXXX XXXX XXXX"
                  name="cardNumber"
                  value={cardNumber}
                  onChange={onChange}
                />
              </InputColumn>
              <IconContainer data-type-width="89" data-type-height="89">
                <Image
                  src="https://ik.imagekit.io/usam13ogl7u/kisspng-logo-visa-credit-card-business-5b3f8c1d89ae40_1_MhUAtE6CB.png"
                  alt="visa icon"
                  width="89px"
                  height="89px"
                  objectFit="contain"
                />
              </IconContainer>
              <IconContainer data-type-width="81" data-type-height="48">
                <Image
                  src="https://ik.imagekit.io/usam13ogl7u/MasterCard_early_1990s_logo_1_MiZsY0i_z.png"
                  alt="mastercard icon"
                  width="81px"
                  height="48px"
                  objectFit="contain"
                />
              </IconContainer>
            </InputRow>
            <InputColumn>
              <InputRow>
                <InputColumn>
                  <Label>Expiry Date</Label>
                  <Input
                    type="text"
                    placeholder="07"
                    data-type-maxwidth="134"
                    value={expiryMonth}
                    name="expiryMonth"
                    onChange={onChange}
                  />
                </InputColumn>
                <Separator>
                  <p>{`/`}</p>
                </Separator>
                <InputColumn>
                  <Label>
                    {" "}
                    <br />
                  </Label>
                  <Input
                    type="text"
                    placeholder="24"
                    data-type-maxwidth="134"
                    name="expiryYear"
                    value={expiryYear}
                    onChange={onChange}
                  />
                </InputColumn>
              </InputRow>
            </InputColumn>
            <InputColumn>
              <InputRow>
                <InputColumn>
                  <Label>CVV</Label>
                  <Input
                    type="text"
                    placeholder="***"
                    maxLength={3}
                    data-type-maxwidth="134"
                  />
                </InputColumn>
                <InputColumn>
                  <Label>Zip Code</Label>
                  <Input
                    type="text"
                    placeholder="*****"
                    data-type-maxwidth="134"
                    name="zip"
                    value={zip}
                    onChange={onChange}
                  />
                </InputColumn>
              </InputRow>
            </InputColumn>
            <InputColumn>
              {" "}
              {error && (
                <Alert>
                  <AlertCircle size={20} />
                  <p>{error} </p>
                </Alert>
              )}
              {!loading ? (
                <Button
                  onSubmit={(e) => handleSubmit(e)}
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </Button>
              ) : (
                <LoadingSpinner color="dodgerblue" text="Submitting Order..." />
              )}
            </InputColumn>
          </CreditCardForm>
        </Form>
      </Container>
    </Section>
  );
};


export default FormContainer;
