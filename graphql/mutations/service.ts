import { gql } from "@apollo/client";

export const ACQUIRE_SERVICE = gql`
  mutation acquireService($service: ServiceInput) {
    acquireService(service: $service) {
      message
      success
      error
      service {
        contact {
          name
          businessName
        }
        serviceBought {
          key
          value
        }
        paymentInfo {
          cardNumber
          expiry
          zip
        }
      }
    }
  }
`;
