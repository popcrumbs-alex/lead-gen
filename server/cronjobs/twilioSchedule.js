const { millisecondsToHours } = require("date-fns");
const { sendSMS } = require("../middleware/twilio");
const User = require("../models/User");

module.exports.twilioSchedule = async () => {
  try {
    const foundUsers = await User.find();

    if (foundUsers.length === 0) {
      console.log("no users");
      return null;
    }

    const usersReadyForMessage = await Promise.all(
      foundUsers.map(async (user) => {
        //make sure a current user exists
        const foundUser = await User.findById(user._id);

        if (!foundUser) throw new Error("could not locate a user");

        const seoSurveys = foundUser.survey
          .filter((survey) => {
            //this refers to the google listings survey, need a less hardocded approach to this
            return survey.surveyID.toString() === "60db2ac309acdc2ffc1095f2";
          })
          .filter((survey) => !survey.posted);

        if (seoSurveys.length === 0) {
          return null;
        }
        //get current time
        const date = new Date();
        //check the date of the lead collected
        const collectionDate = new Date(user.collectionDate);
        //get the difference between collection date and current time
        const diff = date.getTime() - collectionDate.getTime();
        //return total hours from miliseconds
        const totalHours = millisecondsToHours(diff);
        //if the total hours is greater than two days, send the message
        await seoSurveys.forEach(async (survey) => {
          //make sure the message hasnt been sent already
          if (!survey.posted && survey.completed) {
            console.log("survey is not posted and survey was completed");
            if (totalHours >= 48) {
              const message = await sendSMS(user._id);
              console.log("sending message", message);
              if (message) {
                console.log("posted?", survey.posted);

                survey.posted = true;

                await foundUser.save();
              }
            }
          }
        });

        return { user: foundUser.firstName, waitingTime: totalHours };
      })
    );

    console.log("date", usersReadyForMessage);
  } catch (error) {
    console.error("error", error);
    throw new Error(error);
  }
};
