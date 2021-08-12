import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoadingSpinner from "../../reusable/LoadingSpinner";
import AnswerButton from "../answers/AnswerButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
`;

const TextInput = styled.input`
  width: 100%;
  resize: none;
  border: 1px solid #eee;
  background: #eee;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;
  padding: 1rem;

  &:focus {
    outline: 0px solid transparent;
    box-shadow: 0 0 0 3px #003d5b33;
  }
  &:hover {
    box-shadow: 0 0 0 3px #003d5b33;
  }
`;

const TextInputType = ({
  item,
  loading,
  handleAnswerSelection,
  selectAnswer,
  answerSelected,
}) => {
  //need to pass data as a string to send answers
  //therefore need to stringify object data
  const [data, setData] = useState<any>({});

  const onChange = (e: React.FormEvent<HTMLInputElement>) =>
    setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });

  const addAnswersToObject = (answers: Array<any>) => {
    const answerObject = {};

    answers.forEach((item: { answer: string }) => {
      answerObject[item.answer] = "";
    });

    setData(answerObject);
  };

  const checkForDataEntry = (data: any) =>
    Object.values(data).every((item) => item === "");

  useEffect(() => {
    if (item?.answers) {
      //load values into data to be passed as text input values
      addAnswersToObject(item.answers);
    }
  }, [item]);

  useEffect(() => {
    if (data) {
      //only set continue if a keyword has been entered
      if (!checkForDataEntry(data)) selectAnswer(0);
      else selectAnswer(null);
    }
  }, [data]);

  console.log("datatatatata", checkForDataEntry(data), Object.values(data));

  if (Object.values(data).length === 0) {
    return <LoadingSpinner color="#555" text="Loading Data" />;
  }
  return (
    <>
      <Container>
        {item?.answers.map((answerObj: { answer: string }, index: number) => {
          return (
            <Row key={index}>
              <Label htmlFor={data[item.answer]}>{answerObj.answer}:</Label>
              <TextInput
                type="text"
                value={data[item.answer]}
                name={answerObj.answer}
                placeholder={answerObj.answer}
                onChange={(e) => onChange(e)}
              />
            </Row>
          );
        })}
      </Container>
      <AnswerButton
        handleAnswerSelection={handleAnswerSelection}
        item={item}
        loading={loading}
        question={item.question}
        answer={JSON.stringify(data)}
        answerSelected={answerSelected}
      />
    </>
  );
};

export default TextInputType;
