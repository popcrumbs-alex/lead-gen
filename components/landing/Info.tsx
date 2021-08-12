import React, {
  ElementType,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import Alert from "../reusable/Alert";

const fadeIn = keyframes`
  0% {
    opacity:0;
    transform:translateY(4vh);
  }
  100% {
    opacity:1;
    transform:translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 1s ease;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.3rem 0;
  width: 100%;
  position: relative;
`;
const Label = styled.label`
  color: #119da4;
  font-weight: 700;
  position: absolute;
  background-color: #fbfbfb;
  bottom: 80%;
  left: 5%;
  padding: 0.2rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  padding: 1rem 2rem;
  border-radius: 2px;
  border: 1px solid #119da4;
  background-color: transparent;
  color: #119da4;
  transition: all 0.3s ease;
  box-shadow: 0 0 0px 0.5px #119da443;
  font-size: 16px;
  &:focus {
    outline: 1px solid transparent;
    box-shadow: 0 0 0px 5px #119da427 !important;
  }
  &:hover {
    box-shadow: 0 0 0px 5px #119da427 !important;
  }
  &::placeholder {
    color: #66666649;
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.color};
  color: #fff;
  border-radius: 120px;
  font-weight: 700;
  border: 0;
  box-shadow: 0 1px 10px ${(props) => props.color + "66"};
  padding: 1rem 2rem;
  margin: 1rem 0;
  transition: all 0.3s ease;
  font-size: 1.4rem;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0 5px ${(props) => props.color + "66"};
  }
`;

const Info = ({ collectData, addInfo, setHeadline }) => {
  const [data, setData] = useState<any>({
    businessName: "",
    email: "",
    zip: "",
  });

  const [errors, setErrors] = useState<Array<any>>([]);

  const { businessName, email, zip } = data;

  const focusRef = useRef<any>();

  const inputData = [
    {
      label: "Business Name",
      type: "text",
      value: businessName,
      name: "businessName",
      focus: true,
    },
    {
      label: "Email",
      type: "email",
      value: email,
      name: "email",
      focus: false,
    },
    { label: "Zip Code", type: "text", value: zip, name: "zip", focus: false },
  ];

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    const { target } = e;

    setErrors((prevErrors) =>
      prevErrors.filter((err) => err.ref !== target.name)
    );
    setData((prevData: any) => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

  const removeError = (name: string) =>
    setErrors((prevErrors) =>
      prevErrors.filter((err: any, i: number) => err.ref !== name)
    );

  const checkForErrors: () => any[] = () => {
    const errorsArr = [];

    console.log("business", businessName, "email", email, "zip", zip);
    if (!businessName) {
      errorsArr.push({
        message: "Please provide business name",
        ref: "businessName",
      });
    }
    if (!zip) {
      errorsArr.push({ message: "Please provide zip code", ref: "zip" });
    }
    if (!email) {
      errorsArr.push({ message: "Please provide an email", ref: "email" });
    }
    setErrors(errorsArr);

    return errorsArr;
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const errorCheck = checkForErrors();

    console.log("error check", errorCheck);
    if (errorCheck.length > 0) return;
    //add data to the aggregate collection
    collectData((prevData: any) => ({
      ...prevData,
      customerInfo: data,
    }));
    //This allows users to proceed to next section
    addInfo(true);
  };

  useEffect(() => {
    if (errors.length > 0) addInfo(false);
  }, [errors]);

  useEffect(() => {
    if (focusRef.current) {
      console.log(focusRef.current);
      focusRef.current.focus();
    }
  }, [focusRef]);

  useEffect(() => {
    setHeadline("Enter To Win");
  }, []);

  return (
    <Container>
      <Form onSubmit={(e) => onSubmit(e)}>
        {inputData.map(
          (
            input: {
              label: string;
              type: string;
              value: string;
              name: string;
              focus: boolean;
            },
            key
          ) => {
            return (
              <InputContainer key={key}>
                {errors?.map((err: any, i: number) => {
                  return err.ref === input.name ? (
                    <Alert
                      message={err.message}
                      type={"danger"}
                      closeFunc={() => removeError(input.name)}
                      key={i}
                    />
                  ) : null;
                })}
                <Label>{input.label}</Label>
                <Input
                  type={input.type}
                  value={input.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(e)
                  }
                  ref={(inputRef) =>
                    input.focus ? (focusRef.current = inputRef) : null
                  }
                  required={true}
                  name={input.name}
                  placeholder={"Enter " + input.label}
                  style={
                    input.value !== ""
                      ? {
                          boxShadow: `0 0 0 2.5px  #5EEB5B`,
                          border: "1px solid #5EEB5B",
                        }
                      : errors.length > 0 &&
                        errors.filter((err) => err.ref === input.name).length >
                          0
                      ? { boxShadow: `0 0 0 2.5px  #FF101F` }
                      : {}
                  }
                />
              </InputContainer>
            );
          }
        )}

        <Button color={"#5EEB5B"} onPointerDown={(e) => onSubmit(e)}>
          Continue
        </Button>
      </Form>
    </Container>
  );
};

Info.propTypes = {};

export default Info;
