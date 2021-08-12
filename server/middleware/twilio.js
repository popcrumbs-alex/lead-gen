const accountSID = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const client = require("twilio")(accountSID, authToken);
const schedule = require("node-schedule");
const User = require("../models/User");

module.exports.sendSMS = async (userId) => {
  if (!userId) throw new Error("No id provided");
  //Send text next day instead of instantly

  try {
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      throw new Error("Could not locate a user with this id");
    }

    const userPhoneNumber = foundUser.address.phone;
    const fName = foundUser.firstName;
    const city = foundUser.address.city;
    const state = foundUser.address.state;
    const surveys = foundUser.survey;

    const grabKeywords = () => {
      const keywords = surveys
        .filter((survey) => {
          console.log(typeof survey.surveyID, "60db2ac309acdc2ffc1095f2");
          return survey.surveyID.toString() === "60db2ac309acdc2ffc1095f2";
        })
        .map((survey) => {
          //keyword answers should always be the second in array
          const questions = survey.questionData[1];

          const answerKeys = JSON.parse(questions.answer);

          return Object.values(answerKeys);
        });
      return keywords[0];
    };

    const keywords = grabKeywords();

    console.log("keywords", keywords);
    //only US numbers
    const sendMessage = async () => {
      const message = await client.messages
        .create({
          body: `
            ${fName}, We need a business in (${city}, ${state}) who can help google users with (${keywords[0]}) and (${keywords[2]}),To secure the #1 listing on Google Click Here: https://seo.usasmallbusinessresources.com/seo/${userId}`,
          from: "+14049751241",
          to: "+1" + userPhoneNumber,
        })
        .then((message) => {
          return message;
        });
      return message;
    };

    sendMessage();

    console.log("success");
    return "Success!";
  } catch (error) {
    console.error("error!", error);
    throw new Error(error);
  }
};
