import { gql } from "@apollo/client";

export const FIND_USER = gql`
  query findUser($id: ID!) {
    findUser(id: $id) {
      message
      success
      user {
        businessName
        email
        zip
        firstName
        lastName
        survey {
          surveyID
          surveyName
          questionData {
            question
            questionSchemaRefId
            answer
          }
        }
        address {
          state
          streetAddress
          city
          phone
        }
      }
    }
  }
`;
