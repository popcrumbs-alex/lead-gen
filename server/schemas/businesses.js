const { gql } = require("apollo-server-express");
const Business = require("../models/Business");
const mongoose = require("mongoose");

module.exports.typeDefs = gql`
  type Lead {
    category: Category
    campaignId: CampaignId
    requiredFields: [requiredFields]
    leadContactInfo: [leadContactInfo]
    questionSchemaRefId: String
  }
  type Category {
    key: String
    value: String
  }
  type CampaignId {
    key: String
    value: String
  }
  type requiredFields {
    fieldName: String
  }
  type leadContactInfo {
    fieldName: String
    alt: String
  }
  type BusinessCriteria {
    companyName: String
    website: String
    apiEndpoint: String
    apiMethod: String
    leads: [Lead]
  }
  input CategoryInput {
    key: String
    value: String
  }
  input CampaignIdInput {
    key: String
    value: String
  }
  input requiredFieldsInput {
    fieldName: String
    referenceId: String
  }
  input leadContactInfoInput {
    fieldName: String
    alt: String
  }

  input LeadInput {
    category: CategoryInput
    campaignId: CampaignIdInput
    requiredFields: [requiredFieldsInput]
    leadContactInfo: [leadContactInfoInput]
    questionSchemaRefId: String
  }

  input CriteriaInput {
    companyName: String
    website: String
    apiEndpoint: String
    apiMethod: String
    leads: [LeadInput]
  }

  type Mutation {
    createBusinessCriteria(criteria: CriteriaInput): CreateResponse
  }

  type CreateResponse {
    message: String
    success: Boolean
    business: BusinessCriteria
  }
`;

module.exports.resolvers = {
  Query: {},
  Mutation: {
    createBusinessCriteria: async (_, { criteria }) => {
      if (criteria === null)
        throw new Error("Please enter correct business criteria");
      try {
        const newBusiness = new Business({
          ...criteria,
        });

        await newBusiness.save();

        return {
          message: "Created a new business connection!",
          success: true,
          business: newBusiness,
        };
      } catch (error) {
        console.error("error in creating business connect", error);
        throw new Error(error);
      }
    },
  },
};
