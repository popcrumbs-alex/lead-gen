import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import Alert from "../reusable/Alert";
import { areaCodes } from "../reusable/areaCodes";
import { states } from "../reusable/states";

const fadeIn = keyframes`
  0% {
    opacity:0;
    transform:translateY(-4vh);
  }
  100% {
    opacity:1;
    transform:translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.5s ease;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 1.3rem 0rem;
  width: 100%;
  position: relative;
`;

const Select = styled.select`
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
    box-shadow: 0 0 0px 2.5px #119da477;
  }
  &:hover {
    box-shadow: 0 0 0px 2.5px #119da477 !important;
  }
  @media screen and (max-width: 760px) {
    height: 100%;
  }
  &::placeholder {
    color: #66666649;
  }
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
  font-size: 1.4rem;
  border: 0;
  box-shadow: 0 1px 10px ${(props) => props.color + "66"};
  padding: 1rem 2rem;
  margin: 1rem 0;
  transition: all 0.3s ease;
  width: 100%;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0 5px ${(props) => props.color + "66"};
  }
`;

const Address = ({ collectData, setHeadline, setReadyState }) => {
  const [data, setData] = useState<any>({
    streetAddress: "",
    city: "",
    state: "",
    phone: "",
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState<Array<any>>([]);

  const focusRef = useRef<any>();

  const { streetAddress, city, state, phone, firstName, lastName, areaCode } =
    data;

  const inputData = [
    {
      label: "First Name",
      type: "text",
      value: firstName,
      row: true,
      select: false,
      name: "firstName",
      focus: true,
      placeholderText: "Enter first Name",
    },
    {
      label: "Last Name",
      type: "text",
      value: lastName,
      row: true,
      select: false,
      name: "lastName",
      focus: true,
      placeholderText: "Enter last Name",
    },
    {
      label: "Address",
      type: "text",
      value: streetAddress,
      name: "streetAddress",
      row: false,
      select: false,
      focus: false,
      placeholderText: "Enter Address",
    },
    {
      label: "City",
      type: "text",
      value: city,
      name: "city",
      row: true,
      select: false,
      focus: false,
      placeholderText: "Enter City",
    },
    {
      label: "State",
      type: "text",
      value: state,
      name: "state",
      row: true,
      select: true,
      focus: false,
      selectValues: states,
    },

    {
      label: "Phone",
      type: "tel",
      value: phone,
      name: "phone",
      row: false,
      select: false,
      focus: false,
      placeholderText: "Format: 555-555-5555",
    },
  ];

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { target } = e;

    setErrors((prevErrors) =>
      prevErrors.filter((err) => err.ref !== target.name)
    );
    setData((prevData: any) => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

  const checkForErrors = () => {
    const errorsArr = [];

    if (!firstName) {
      errorsArr.push({
        message: "Please provide your first name",
        ref: "firstName",
      });
    }
    if (!lastName) {
      errorsArr.push({
        message: "Please provide your last name",
        ref: "lastName",
      });
    }
    if (!streetAddress) {
      errorsArr.push({
        message: "Please provide your address",
        ref: "streetAddress",
      });
    }

    if (!city) {
      errorsArr.push({ message: "Please provide your city", ref: "city" });
    }

    if (!state) {
      errorsArr.push({ message: "Please provide your state", ref: "state" });
    }

    if (!phone) {
      errorsArr.push({
        message: "Please provide your phone number",
        ref: "phone",
      });
    }

    setErrors(errorsArr);

    return errorsArr;
  };

  const removeError = (name: string) =>
    setErrors((prevErrors) =>
      prevErrors.filter((err: any) => err.ref !== name)
    );

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const errorsArr = checkForErrors();

    if (errorsArr.length > 0) return;

    collectData((prevData: any) => ({
      ...prevData,
      customerInfo: {
        ...prevData.customerInfo,
        ...data,
      },
    }));

    setReadyState(true);
  };

  useEffect(() => {
    setHeadline("Enter Address To Continue");
  }, []);

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, [focusRef]);
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
              row: boolean;
              select: boolean;
              focus: boolean;
              placeholderText: string;
              selectValues: any;
            },
            key: number
          ) => {
            return (
              <InputContainer
                style={input.row ? { width: "47%" } : {}}
                key={key}
              >
                {errors?.map((err: any, i: number) => {
                  console.log(err.ref === input.name);
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
                {!input.select ? (
                  <Input
                    type={input.type}
                    value={input.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onChange(e)
                    }
                    name={input.name}
                    required={true}
                    pattern={
                      input.type === "tel" ? "[0-9]{3}-[0-9]{3}-[0-9]{4}" : null
                    }
                    ref={(inputRef) =>
                      input.focus ? (focusRef.current = inputRef) : null
                    }
                    style={
                      input.value !== ""
                        ? {
                            boxShadow: `0 0 0 2.5px #5EEB5B`,
                            border: "1px solid #5EEB5B",
                          }
                        : {}
                    }
                    placeholder={input.placeholderText}
                  />
                ) : (
                  <Select
                    onChange={onChange}
                    name={input.name}
                    required={true}
                    style={
                      input.value !== ""
                        ? {
                            boxShadow: `0 0 0 2.5px #5EEB5B`,
                            border: "1px solid #5EEB5B",
                          }
                        : {}
                    }
                  >
                    <option>Select {input.name.toLowerCase()}</option>
                    {input.selectValues.map((obj: any, index: number) => {
                      return (
                        <option value={obj.dialCode || obj.name} key={index}>
                          {obj.name} {obj.dialCode || null}
                        </option>
                      );
                    })}
                  </Select>
                )}
              </InputContainer>
            );
          }
        )}

        <Button color={"#5EEB5B"} onPointerDown={(e) => onSubmit(e)}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

Address.propTypes = {};

export default Address;
