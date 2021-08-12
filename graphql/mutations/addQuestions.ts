import { gql } from "@apollo/client";

export const ADD_QUESTION_DATA = gql`
  mutation addQuestionToUserData(
    $question: String!
    $answer: String!
    $surveyId: ID!
    $questionSchemaRefId: String
  ) {
    addQuestionToUserData(
      question: $question
      answer: $answer
      surveyId: $surveyId
      questionSchemaRefId: $questionSchemaRefId
    ) {
      message
      success
      user {
        survey {
          questionData {
            question
            answer
          }
          reward
        }
      }
    }
  }
`;

export const BATCH_ADD_QUESTIONS = gql`
  mutation batchAddQuestionData($questions: [QuestionInput!]!, $surveyId: ID!) {
    batchAddQuestionData(questions: $questions, surveyId: $surveyId) {
      message
      success
      user {
        email
        survey {
          reward
          surveyID
          surveyName
          questionData {
            question
            answer
          }
        }
      }
    }
  }
`;
