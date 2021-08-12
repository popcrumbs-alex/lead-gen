const { gql } = require("apollo-server-express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Question = require("../models/Question");

module.exports.typeDefs = gql`
  type Question {
    question: String
    answer: String
    questionSchemaRefId: String
  }

  type Survey {
    reward: String
    questionData: [Question]
    surveyName: String
    surveyID: String
  }

  type User {
    businessName: String
    email: String! @constraint(format: "email", maxLength: 255)
    zip: String
    address: Address
    firstName: String
    lastName: String
    token: ID!
    survey: [Survey]
  }

  type Address {
    streetAddress: String
    city: String
    state: String
    phone: String
  }

  input QuestionInput {
    question: String
    answer: String
  }

  type Query {
    loadUsers: [User]
    authUser: UserResponse
    findUser(id: ID!): UserResponse
  }

  type Mutation {
    createUser(
      email: String
      businessName: String
      zip: String
      streetAddress: String
      city: String
      state: String
      phone: String
      firstName: String
      lastName: String
    ): CreateUserResponse

    addQuestionToUserData(
      question: String
      questionSchemaRefId: String
      answer: String
      surveyId: ID!
    ): UserDataResponse
    batchAddQuestionData(
      questions: [QuestionInput]
      surveyId: ID!
    ): BatchAddQuestionResponse
  }

  type UserResponse {
    user: User
    message: String
    success: Boolean
  }

  type CreateUserResponse {
    message: String
    success: Boolean
    user: User
    token: ID!
  }

  type UserDataResponse {
    message: String
    success: String
    user: User
  }
  type BatchAddQuestionResponse {
    message: String
    success: Boolean
    user: User
  }
`;

module.exports.resolvers = {
  Query: {
    loadUsers: async () => {
      try {
        const foundUsers = await User.find();

        return foundUsers;
      } catch (error) {
        console.error("could not locate any user?");
        throw new Error(error);
      }
    },
    findUser: async (_, { id }) => {
      try {
        const foundUser = await User.findById(id);
        return {
          message: "Found a user",
          success: true,
          user: foundUser,
        };
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    },
    authUser: async (_, {}, context) => {
      const { user } = context;
      console.log("is there a user", context);
      if (!user) throw new Error("Error Status:401, 'No Authorization'");

      try {
        const foundUser = await User.findById(user.id);
        console.log("found user!", foundUser);
        return {
          user: foundUser,
          message: "Found the user!",
          success: true,
        };
      } catch (error) {
        console.error("Error in locating a user:", error);
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createUser: async (
      _,
      {
        email,
        businessName,
        zip,
        streetAddress,
        city,
        phone,
        state,
        firstName,
        lastName,
      }
    ) => {
      try {
        if (!email) throw new Error("Please provide your email");
        if (!businessName) throw new Error("Please provide your business name");
        if (!zip) throw new Error("Please provide your zip code");
        if (!streetAddress) throw new Error("Please provide an address");
        if (!city) throw new Error("Please provide your city");
        if (!phone) throw new Error("Please provide your phone number");
        if (!state) throw new Error("Please provide your state");
        if (!firstName) throw new Error("Please provide your first name");
        if (!lastName) throw new Error("Please provide your last name");

        const address = { streetAddress, city, phone, state };

        const foundUser = await User.findOne({ email });
        console.log("found user?", foundUser);
        let userToMutate;

        if (foundUser) {
          foundUser.email = email;
          foundUser.businessName = businessName;
          foundUser.zip = zip;
          foundUser.address = address;
          foundUser.firstName = firstName;
          foundUser.lastName = lastName;

          await foundUser.save();

          userToMutate = foundUser;
        }

        if (!foundUser) {
          console.log("not found user email", email);
          const newUser = new User({
            email,
            businessName,
            zip,
            address,
            firstName,
            lastName,
          });
          await newUser.save();

          userToMutate = newUser;
        }

        const payload = {
          user: {
            id: userToMutate.id,
          },
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: 3600000,
        });

        console.log("USER RESOLVER:", userToMutate);

        return {
          message: "User Created Successfully",
          success: true,
          user: userToMutate,
          token,
        };
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    },
    addQuestionToUserData: async (
      _,
      { question, answer, surveyId, questionSchemaRefId },
      context
    ) => {
      if (!context.user) {
        throw new Error("Unauthorized request");
      }

      if (!question) throw new Error("A question was not passed");
      if (!answer) throw new Error("An answer was not passed");
      if (!surveyId) throw new Error("No survey id was passed");
      if (!questionSchemaRefId)
        throw new Error("Please provide a reference id");

      try {
        const foundUser = await User.findById(context.user.id);
        const foundSurvey = await Question.findById(surveyId);

        if (!foundUser)
          throw new Error("This user does not exist! OoOooO Very Mysterious");
        if (!foundSurvey)
          throw new Error("Could not locate a survey with this id");

        //find the survey within the user's data and push the added questions to that one
        if (
          foundUser.survey.filter(
            (survey) => survey.surveyID.toString() === surveyId
          ).length > 0
        ) {
          //survey on the user model
          const existingSurvey = foundUser.survey.filter(
            (survey) => survey.surveyID.toString() === surveyId
          )[0];

          existingSurvey?.questionData.push({
            question,
            answer,
            questionSchemaRefId,
          });

          if (
            existingSurvey?.questionData.length >= foundSurvey.questions.length
          ) {
            //if all questions pertaining to a survey have been answered, it is then completed
            existingSurvey.completed = true;
          }
        } else {
          //if no survey was found matching the id, create a new one
          const questionData = [{ question, answer, questionSchemaRefId }];
          foundUser.survey.push({
            reward: foundSurvey.reward,
            surveyID: surveyId,
            questionData,
          });
        }

        await foundUser.save();

        console.log(
          "found survey on the user",
          foundUser.survey
            .filter((survey) => survey.surveyID.toString() === surveyId)
            .map((el) => el.questionData),
          surveyId.toString()
        );

        return {
          message: "Added question data to user model",
          success: true,
          user: foundUser,
        };
      } catch (error) {
        console.error("ERROR_IN_QUESTION_DATA", error);
        throw new Error(error);
      }
    },
    batchAddQuestionData: async (_, { questions, surveyId }, context) => {
      console.log("wtf");
      console.log("context!", context);
      if (!context.user) {
        throw new Error("Unauthorized request");
      }

      if (questions.length === 0) throw new Error("A question was not passed");
      if (!surveyId) throw new Error("No survey id was passed");

      try {
        const foundUser = await User.findById(context.user.id);
        const foundSurvey = await Question.findById(surveyId);

        if (!foundUser)
          throw new Error("This user does not exist! OoOooO Very Mysterious");
        if (!foundSurvey)
          throw new Error("Could not locate a survey with this id");

        //find the survey within the user's data and push the added questions to that one
        if (
          foundUser.survey.filter(
            (survey) => survey.surveyID.toString() === surveyId
          ).length > 0
        ) {
          const existingSurvey = foundUser.survey.filter(
            (survey) => survey.surveyID.toString() === surveyId
          )[0];

          questions.map((questionObj) =>
            existingSurvey?.questionData.push({
              question: questionObj.question,
              answer: questionObj.answer,
            })
          );
        } else {
          //if no survey was found matching the id, create a new one
          const surveyName = foundSurvey.surveyName;

          foundUser.survey.push({
            reward: foundSurvey.reward,
            surveyID: surveyId,
            questionData: [...questions],
            surveyName,
          });
        }

        await foundUser.save();

        console.log(
          "found survey on the user",
          foundUser.survey
            .filter((survey) => survey.surveyID.toString() === surveyId)
            .map((data) => data.questionData)
        );

        return {
          message: "Added question data to user model",
          success: true,
          user: foundUser,
        };
      } catch (error) {
        console.error("ERROR_IN_QUESTION_DATA", error);
        throw new Error(error);
      }
    },
  },
};
