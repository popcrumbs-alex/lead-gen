const { gql } = require("apollo-server-express");
const Question = require("../models/Question");
const User = require("../models/User");
const Business = require("../models/Business");
const axios = require("axios");
const { sendSMS } = require("../middleware/twilio");
const { cipher } = require("../middleware/apiCipher");

module.exports.typeDefs = gql`
  type Lead {
    businessName: String
    email: String
    zip: String
    address: Address
    firstName: String
    lastName: String
  }
  type Mutation {
    receiveUserUpdate(arg1: String!): ReceiveUserUpdateResponse
    testSMS: TestSMSResponse
  }
  type ReceiveUserUpdateResponse {
    message: String
    success: Boolean
    user: Lead
  }
  type TestSMSResponse {
    message: String
    success: Boolean
  }
`;

module.exports.resolvers = {
  Mutation: {
    testSMS: async () => {
      try {
        const text = await sendSMS();
        console.log("text", text);
        return {
          message: "Sent test sms in twilio",
          success: true,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    receiveUserUpdate: async (_, { arg1 }) => {
      //Steps for posting user data
      //1. receive the user id and find a user
      //2. search through the user's answered questions
      //3. match the answered questions that exist on the business schema
      //4. post to the lead data api if criteria is met
      try {
        const foundUser = await User.findById(arg1);

        if (!foundUser)
          throw new Error("Seems there is no existing user there?");

        //get the survey that exists in question schema from the user's questions
        const foundSurveys = await Promise.all(
          foundUser.survey.map(async (survey) => {
            const foundSurvey = await Question.findById(survey.surveyID);
            if (!foundSurvey) return;
            return survey;
          })
        );

        //Business refer to the connections for lead posting
        const businesses = await Business.find();

        if (businesses.length === 0) {
          console.log("no businesses here");
          throw new Error("Nothing was returned");
        }

        // a user's answers pertaining to specific surveys
        // determine whether user has answered questions that exist on any business lead schema
        const existingSurveys = foundSurveys.filter((survey) => {
          //survey id existing on user answered question
          const surveyId = survey.surveyID;
          //surveys that match on the business schema that the user has answered
          return (
            businesses.filter((biz) => {
              //make sure that leads exist on
              const leadExist = biz?.leads
                .map((lead) => lead.questionSchemaRefId)
                .includes(surveyId);
              return leadExist;
            }).length > 0
          );
        });

        if (existingSurveys.length === 0) {
          console.log("no mathcing business data");
          return {
            message: "No matching business data",
            success: false,
            user: null,
          };
        }

        //search through business schemas to match the survey answers to appropriate business schema
        const businessData = existingSurveys
          .map((survey) => {
            //Existing business are those exist that the user answered
            if (!survey.completed) {
              //if the user does not fill out the required data attributes for the lead affiliate
              //cancel posting
              console.log(`Survey:${survey.surveyID} was not completed`);
              return;
            }
            if (survey.posted) {
              //if data has already been sent, do noit resend
              console.log("lead data has already been posted");
              return;
            }
            console.log("businesss", survey);
            const existingBusiness = businesses
              .map((business) => {
                const match = business.leads
                  .map((lead) => lead.questionSchemaRefId)
                  .includes(survey.surveyID);

                return match ? business : null;
              })
              .filter(Boolean)[0];

            //business schema refs
            const refs = existingBusiness.leads.map(
              (lead) => lead.questionSchemaRefId
            );

            const matchingIndex = refs.indexOf(survey.surveyID);

            const leadPost = existingBusiness.leads[matchingIndex];

            const posting = survey.questionData.filter((question) => {
              const matchingQuestion = leadPost.requiredFields
                .map((field) => field.referenceId)
                .indexOf(question.questionSchemaRefId);

              if (matchingQuestion < 0) return;

              return question;
            });
            return {
              instructions: leadPost,
              posting,
              survey,
              business: existingBusiness,
            };
          })
          .filter(Boolean);

        const formattedPosts = businessData.map((biz) => {
          const fields = biz.instructions.requiredFields.map((field) => {
            //make sure post index matches the correct field index
            const matchingPost = biz.posting
              .map((post) => post.questionSchemaRefId)
              .indexOf(field.referenceId);

            const post = biz.posting;
            const postKey = field.fieldName;
            const postValue = post[matchingPost].answer;

            return {
              [postKey]: postValue,
            };
          });
          const contactAlts = biz.instructions.leadContactInfo.map(
            (info) => info.alt
          );
          const firstNameIndex = contactAlts.indexOf("firstName");
          const lastNameIndex = contactAlts.indexOf("lastName");
          const phoneIndex = contactAlts.indexOf("phone");
          const emailIndex = contactAlts.indexOf("email");
          const businessIndex = contactAlts.indexOf("businessName");
          const zipIndex = contactAlts.indexOf("zip");
          const cityIndex = contactAlts.indexOf("city");
          const stateIndex = contactAlts.indexOf("state");
          const streetIndex = contactAlts.indexOf("streetAddress");

          const leadCI = biz.instructions.leadContactInfo;

          const contactFields = {};
          //////////////////////////////////////////////////////////
          if (firstNameIndex >= 0)
            contactFields[leadCI[firstNameIndex].fieldName] =
              foundUser.firstName;
          /////////////////////////////////////////////////////////
          if (lastNameIndex >= 0)
            contactFields[leadCI[lastNameIndex].fieldName] = foundUser.lastName;
          ///////////////////////////////////////////////////////////
          if (phoneIndex >= 0)
            contactFields[leadCI[phoneIndex].fieldName] =
              foundUser.address.phone;
          ///////////////////////////////////////////////////////////
          if (emailIndex >= 0)
            contactFields[leadCI[emailIndex].fieldName] = foundUser.email;
          ///////////////////////////////////////////////////////////
          if (businessIndex >= 0)
            contactFields[leadCI[businessIndex].fieldName] =
              foundUser.businessName;
          //////////////////////////////////////////////////////////////
          if (zipIndex >= 0)
            contactFields[leadCI[zipIndex].fieldName] = foundUser.zip;
          //////////////////////////////////////////////////////////////////
          if (cityIndex >= 0)
            contactFields[leadCI[cityIndex].fieldName] = foundUser.address.city;
          ////////////////////////////////////////////////////////////////
          if (stateIndex >= 0)
            contactFields[leadCI[stateIndex].fieldName] =
              foundUser.address.state;
          ////////////////////////////////////////////////////////////////
          if (streetIndex >= 0)
            contactFields[leadCI[streetIndex].fieldName] =
              foundUser.address.streetAddress;

          const campaignIdKey = biz.instructions.campaignId.key;
          ////////////////////////////////////////////////////////////
          const campaignIdValue = biz.instructions.campaignId.value;
          ////////////////////////////////////////////////////////////
          const categoryKey = biz.instructions.category.key;
          /////////////////////////////////////////////////////////////
          const categoryValue = biz.instructions.category.value;
          /////////////////////////////////////////////////////////////
          const combinedFields = fields.reduce((acc, next) => {
            return { ...acc, ...next };
          }, {});

          return {
            [campaignIdKey]: campaignIdValue,
            [categoryKey]: categoryValue,
            ...combinedFields,
            ...contactFields,
            postingSource: biz.business,
            survey: biz.survey,
          };
        });

        //TODO when app is ready to go live, take off test mode
        Promise.all(
          formattedPosts.map(async (postObj) => {
            //only want to send postData in the data body api call
            const { postingSource, survey, ...postData } = postObj;

            console.log("posting object", postObj);

            try {
              const res = await cipher({
                postData,
                postingSource,
                user: foundUser,
              });

              console.log("resasdfsarsasd", res);

              if (res !== null) {
                survey.posted = true;

                await foundUser.save();

                console.log("survey posted", res);
                return res;
              } else {
                survey.posted = false;
                await foundUser.save();
                console.log("survey did not post to any leads");
                return;
              }
            } catch (error) {
              console.error(error);
            }
          })
        );

        return {
          message: "Lead data successfully posted",
          success: true,
          user: foundUser,
        };
      } catch (error) {
        console.error("error", error);
        throw new Error(error);
      }
    },
  },
};
