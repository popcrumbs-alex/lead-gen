import { gql } from "@apollo/client";

export const AUTHENTICATE_USER = gql`
  query authUser {
    authUser {
      user {
        email
        zip
        businessName
        address {
          state
          streetAddress
          city
          phone
        }
      }
      message
      success
    }
  }
`;
