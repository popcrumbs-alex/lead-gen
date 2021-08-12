import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $email: String!
    $businessName: String!
    $zip: String!
    $city: String!
    $state: String!
    $streetAddress: String!
    $phone: String!
    $firstName: String!
    $lastName: String!
  ) {
    createUser(
      email: $email
      phone: $phone
      businessName: $businessName
      zip: $zip
      city: $city
      streetAddress: $streetAddress
      state: $state
      firstName: $firstName
      lastName: $lastName
    ) {
      token
      message
      success
      user {
        email
        businessName
        zip
        firstName
        lastName
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
