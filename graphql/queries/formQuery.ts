import { gql } from "@apollo/client";

export const LOAD_FORM = gql`
  query loadForm {
    loadForm {
      message
      success
      form {
        id
        reward
      }
    }
  }
`;

export const LOAD_ALL_FORMS = gql`
  query loadAllForms {
    loadAllForms {
      message
      success
      form {
        id
        reward
        surveyName
        surveyOrderNum
        surveyType
        questions {
          _id
          question
          orderNum
          typeOfInput
          skipRestOfSurvey
          description
          answers {
            answer
          }
        }
      }
    }
  }
`;

export const QUERY_FORM_BY_ID = gql`
  query findForm($id: ID!) {
    findForm(id: $id) {
      message
      success
      form {
        reward
        id
        questions {
          question

          answers {
            answer
          }
        }
      }
    }
  }
`;
