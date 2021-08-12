const { gql } = require("apollo-server-express");
const Admin = require("../models/Admin");
const Question = require("../models/Question");
const FormScheme = require("../models/Question");
const User = require("../models/User");

module.exports.typeDefs = gql`
  type Form {
    id: ID!
    surveyName: String
    surveyOrderNum: Float
    reward: String
    questions: [Question]
    surveyType: String
  }
  type Question {
    _id: ID!
    question: String
    answers: [Answer]
    orderNum: Float
    skipRestOfSurvey: Boolean
    typeOfInput: String
    description: String
  }

  type Answer {
    _id: ID!
    answer: String
  }

  input QuestionInput {
    question: String
    answers: [AnswerInput]
    orderNum: Float
    skipRestOfSurvey: Boolean
    typeOfInput: String
    description: String
  }

  input AnswerInput {
    answer: String
  }

  input UpdateQuestionInput {
    question: String
    orderNum: Float
    _id: ID!
    typeOfInput: String
    skipRestOfSurvey: Boolean
    answers: [UpdateAnswerInput]
    description: String
  }

  input UpdateAnswerInput {
    answer: String
  }

  type Query {
    loadForm: LoadFormResponse
    loadAllForms: LoadFormResponse
    findForm(id: ID!): FoundFormResponse
  }

  type Mutation {
    createForm(
      reward: String
      surveyName: String
      questions: [QuestionInput]
      surveyOrderNum: Float
      surveyType: String
    ): CreateFormResponse
    addQuestionsToForm(id: ID!, questions: [QuestionInput]): UpdateFormResponse
    deleteForm(id: ID!): DeleteFormResponse
    updateForm(
      id: ID!
      reward: String
      surveyName: String
      surveyType: String
      surveyOrderNum: Float
      questions: [UpdateQuestionInput]
    ): UpdateFormResponse
    updateQuestion(
      questionId: ID!
      question: QuestionInput
    ): UpdateQuestionResponse
    addAnswerToQuestion(
      surveyID: ID!
      questionID: ID!
      answer: AnswerInput
    ): AddAnswerResponse
    updateAnswer(answerId: ID!, answer: AnswerInput): UpdateAnswerResponse
  }

  type CreateFormResponse {
    message: String
    success: Boolean
    form: Form
  }

  type UpdateFormResponse {
    message: String
    success: Boolean
    form: Form
  }

  type UpdateQuestionResponse {
    message: String
    success: Boolean
    question: Question
  }

  type UpdateAnswerResponse {
    message: String
    success: Boolean
    answer: Answer
  }

  type LoadFormResponse {
    form: [Form]
    success: Boolean
    message: String
  }

  type FoundFormResponse {
    message: String
    success: Boolean
    form: Form
  }
  type AddAnswerResponse {
    message: String
    success: Boolean
    form: Form
  }
  type DeleteFormResponse {
    message: String
    success: Boolean
  }
`;

module.exports.resolvers = {
  Query: {
    loadForm: async (_, {}) => {
      try {
        const foundForm = await FormScheme.find();

        return {
          form: foundForm,
          message: "Loaded questions successfully",
          success: true,
        };
      } catch (error) {
        console.error("QUESTION QUERY ERROR:", error);
        throw new Error("QUESTION QUERY ERROR:", error);
      }
    },
    loadAllForms: async (_, {}, context) => {
      const { user } = context;

      if (!user) throw new Error("Error Status:400 'No Authorization'");
      try {
        const foundUser = await User.findById(user.id);

        if (!foundUser) throw new Error("Error Status:400, 'No Authorization'");

        const foundForm = await FormScheme.find();

        return {
          form: foundForm,
          message: "Loaded questions successfully",
          success: true,
        };
      } catch (error) {
        console.error("QUESTION QUERY ERROR:", error);
        throw new Error("QUESTION QUERY ERROR:", error);
      }
    },
    findForm: async (_, { id }, context) => {
      const { user } = context;

      if (!user) throw new Error("Error Status:400 'No Authorization'");

      try {
        const foundUser = await User.findById(user.id);

        if (!foundUser) throw new Error("Error Status:400, 'No Authorization'");

        const res = await FormScheme.findById(id);

        return {
          message: "Found the form",
          success: true,
          form: res,
        };
      } catch (error) {
        console.error("FIND FORM ERROR:", error);
        throw new Error("Error Status 404: Could not locate");
      }
    },
  },
  Mutation: {
    createForm: async (
      _,
      { reward, questions, surveyName, surveyOrderNum, surveyType },
      context
    ) => {
      if (!context.user)
        throw new Error("Authorization Error: No Authorization");

      try {
        const foundAdmin = await Admin.findById(context.user.id);

        if (!foundAdmin)
          throw new Error("Authorization Error: Not Authorized(1)");

        if (foundAdmin) {
          const authLevel = foundAdmin.restrictions.tier;
          console.log("ADMIN", foundAdmin);
          if (authLevel > 1)
            throw new Error("Authorization Error: Not Authorized to edit");
        }

        if (!reward) throw new Error("Please add a reward to the form");
        if (!questions) throw new Error("Please add questions");
        if (!surveyOrderNum)
          throw new Error("Please add a number to the survey");
        if (!surveyType) throw new Error("Please add a survey type");

        const newQuestion = {};

        newQuestion.surveyName = surveyName;

        newQuestion.reward = reward;

        newQuestion.surveyOrderNum = surveyOrderNum;

        newQuestion.surveyType = surveyType;

        newQuestion.questions = [...questions.map((question) => question)];

        let duplicates = [];

        const checkOrderNumDuplicates = (arr) => {
          const arrToCheck = [];
          //add element to array if non existant

          arr.forEach((orderNum) =>
            !arrToCheck.includes(orderNum)
              ? arrToCheck.push(orderNum)
              : duplicates.push(`Duplicate:${orderNum}`)
          );
          console.log("duplicates!!!", duplicates);
          return duplicates.length > 0;
        };

        if (
          checkOrderNumDuplicates(
            newQuestion.questions.map((question) => question.orderNum)
          )
        ) {
          return duplicates.map((dupe) => {
            throw new Error("Error Duplicate Order Num:" + dupe);
          });
        }

        const newForm = new FormScheme(newQuestion);

        await newForm.save();

        return {
          message: "Successfully added new form scheme",
          success: true,
          form: newForm,
        };
      } catch (error) {
        console.error("CREATE_FORM_ERROR:", error);
        throw new Error("CREATE_FORM_ERROR:", error);
      }
    },
    updateForm: async (
      _,
      { reward, surveyName, surveyOrderNum, surveyType, id, questions },
      context
    ) => {
      if (!context.user) throw new Error("Authorization error: Not Authorized");

      try {
        const foundAdmin = await Admin.findById(context.user.id);

        if (!foundAdmin)
          throw new Error("Authorization Error: Not Authorized(1)");

        if (foundAdmin) {
          const authLevel = foundAdmin.restrictions.tier;

          if (authLevel > 1)
            throw new Error("Authorization Error: Not Authorized to edit");
        }

        if (!id) throw new Error("Need a form id in order to edit!");

        console.log("context", context);

        const foundSurvey = await Question.findById(id);

        if (!foundSurvey)
          throw new Error("Could not find a survey with this id");

        //nothing is required when updating a survey
        if (reward) foundSurvey.reward = reward;
        if (surveyName) foundSurvey.surveyName = surveyName;
        if (surveyOrderNum) foundSurvey.surveyOrderNum = surveyOrderNum;
        if (surveyType) foundSurvey.surveyType = surveyType;

        if (questions) {
          //combining two arrays to match and edit content of array
          const dupedQuestions = foundSurvey.questions
            .slice()
            .map((question) => question);
          //1 get ids of incoming questions to be edited in the existing array
          const ids = questions.map((i) => i._id);
          //2 find a incoming match(index) of that id in existing array
          dupedQuestions.map((dupe) => {
            const match = ids.indexOf(dupe._id.toString());

            if (match >= 0) {
              const matchRef = questions[match];
              //main question editing
              if (matchRef.question) dupe.question = matchRef.question;
              if (matchRef.typeOfInput) dupe.typeOfInput = matchRef.typeOfInput;
              if (matchRef.orderNum) dupe.orderNum = matchRef.orderNum;
              if (matchRef.answers) dupe.answers = matchRef.answers;
              if (matchRef.description) dupe.description = matchRef.description;
              if (matchRef.skipRestOfSurvey)
                dupe.skipRestOfSurvey = matchRef.skipRestOfSurvey;
            }
            // console.log("changed dupe", dupe);
            return dupe;
          });
          //3 change the found question to the one being inputted
          console.log("dfsdfsfsdf", dupedQuestions);
          foundSurvey.questions = dupedQuestions;
        }

        await foundSurvey.save();

        return {
          message: "Successfully updated survey",
          success: true,
          form: foundSurvey,
        };
      } catch (error) {
        console.error("ERROR_EDITING_SURVEY", error);
        throw new Error(error);
      }
    },

    addQuestionsToForm: async (_, { id, questions }, context) => {
      if (!context.user) throw new Error("Authorization error: Not Authorized");

      try {
        const foundAdmin = await Admin.findById(context.user.id);

        if (!foundAdmin)
          throw new Error("Authorization Error: Not Authorized(1)");

        if (foundAdmin) {
          const authLevel = foundAdmin.restrictions.tier;

          if (authLevel > 1)
            throw new Error("Authorization Error: Not Authorized to edit");
        }

        const foundForm = await FormScheme.findById(id);

        if (!foundForm) throw new Error("Could not locate a form with this id");

        const questionOrderNumbers = foundForm.questions.map(
          (question) => question.orderNum
        );

        if (
          questions.filter((question) =>
            questionOrderNumbers.includes(question.orderNum)
          ).length > 0
        ) {
          //get the last number in the array and add to it to show which number is next available
          const nextAvail =
            questionOrderNumbers[questionOrderNumbers.length - 1] + 1;
          //cannot have dupe order numbers or array will not sort properly
          throw new Error(
            `Order number populated already, next available is:${nextAvail} `
          );
        }

        const updatedQuestions = [...foundForm.questions, ...questions];

        foundForm.questions = updatedQuestions;

        await foundForm.save();

        return {
          message: "Successfully updated form",
          boolean: true,
          form: foundForm,
        };
      } catch (error) {
        console.error("ADD QUESTION TO FORM ERROR:", error);
        throw new Error("ADD QUESTION TO FORM ERROR:", error);
      }
    },

    addAnswerToQuestion: async (
      _,
      { surveyID, questionID, answer },
      context
    ) => {
      if (!surveyID) throw new Error("Please provide a survey id");
      if (!questionID) throw new Error("Please provide a question id");
      if (!answer) throw new Error("Please provide an answer to add to schema");

      if (!context.user) {
        throw new Error(
          "Authorization Error: You are not authorized to perform this action"
        );
      }

      try {
        const foundAdmin = await Admin.findById(context.user.id);

        if (!foundAdmin) {
          console.log("no admin exists");
          throw new Error("No admin with this ID exists");
        }
        if (foundAdmin) {
          const authLevel = foundAdmin.restrictions.tier;

          if (authLevel > 1)
            throw new Error("Authorization Error: Not Authorized to edit");
          console.log("Admin has access");
        }

        const foundSurvey = await Question.findById(surveyID);

        if (!foundSurvey) throw new Error("This survey does not exist!");

        const foundQuestionInSurvey = foundSurvey.questions.filter(
          (question) => {
            const id = question._id.toString();
            return id === questionID;
          }
        )[0];

        if (!foundQuestionInSurvey)
          throw new Error("Could not locate a question in the survey schema");

        foundQuestionInSurvey.answers = [
          ...foundQuestionInSurvey.answers,
          answer,
        ];

        await foundSurvey.save();

        console.log("found question", foundQuestionInSurvey.answers);

        return {
          message: "Added a new answer to survey question:" + foundSurvey._id,
          success: true,
          form: foundSurvey,
        };
      } catch (error) {
        console.error("error:", error);
        throw new Error(error);
      }
    },
    deleteForm: async (_, { id }) => {
      try {
        const foundForm = await FormScheme.findById(id);

        if (!foundForm) throw new Error("Could not locate this form");

        await foundForm.remove();

        return {
          message: "Sucessfully deleted form",
          success: true,
        };
      } catch (error) {
        console.error("FORM REMOVAL ERROR:", error);
        throw new Error("FORM REMOVAL ERROR:", error);
      }
    },
  },
};
