const { gql } = require("apollo-server-express");
const Service = require("../models/Service");

module.exports.typeDefs = gql`
  type Service {
    contact: Contact
    serviceBought: ServiceBought
    paymentInfo: PaymentInfo
  }

  type ServiceBought {
    key: String
    value: String
  }

  type Contact {
    businessName: String
    email: String
    name: String
    zip: String
    phone: String
  }

  type PaymentInfo {
    cardNumber: String
    expiry: String
    zip: String
  }

  input ContactInput {
    businessName: String
    email: String
    name: String
    zip: String
    phone: String
  }

  input PaymentInput {
    cardNumber: String
    expiry: String
    zip: String
  }

  input ServiceBoughtInput {
    key: String
    value: String
  }

  input ServiceInput {
    contact: ContactInput
    serviceBought: ServiceBoughtInput
    paymentInfo: PaymentInput
  }

  type Mutation {
    acquireService(service: ServiceInput): AcquireServiceResponse
  }

  type AcquireServiceResponse {
    message: String
    success: Boolean
    service: Service
    error: String
  }
`;

module.exports.resolvers = {
  Mutation: {
    acquireService: async (_, { service }) => {
      const checkValuesExist = (...values) => {
        const objValues = values.map((obj) => Object.values(obj));
        const flatten = (vals) => {
          return vals.reduce(
            (acc, next) =>
              acc.concat(Array.isArray(next) ? flatten(next) : next),
            []
          );
        };
        //Should return array of objects
        const flattenedVals = flatten(objValues);

        const errors = flattenedVals.map((obj) => {
          const vals = Object.values(obj).map((val, index) =>
            val === "" ? index : -1
          );
          const keys = Object.keys(obj);

          return vals
            .map((valIndex) => {
              return valIndex >= 0
                ? `${keys[valIndex].toLowerCase()} is required`
                : null;
            })
            .filter(Boolean);
        });

        return flatten(errors);
      };

      const errors = await checkValuesExist(service);

      if (errors.length > 0) {
        console.log("error", errors[0]);

        return {
          message: errors[0],
          success: false,
          service: null,
          error: errors[0],
        };
      }

      console.log("errors?", errors.length > 0 ? "errors" : "no errors");

      try {
        const newServiceAcquired = new Service({
          ...service,
        });

        await newServiceAcquired.save();

        return {
          message: "Lead has been saved in database",
          success: true,
          service: newServiceAcquired,
          error: "",
        };
      } catch (error) {
        console.error("error:service mutation", error);
        return {
          message: error,
          success: false,
          service: null,
          error: error,
        };
      }
    },
  },
};
