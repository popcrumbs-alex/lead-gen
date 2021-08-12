const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
  reward: {
    type: String,
    required: true,
  },
  surveyName: {
    type: String,
  },
  surveyOrderNum: {
    type: Number,
    required: true,
    unique: true,
  },
  surveyType: {
    type: String,
  },
  questions: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      question: {
        type: String,
        required: true,
      },
      orderNum: {
        type: Number,
      },
      skipRestOfSurvey: {
        type: Boolean,
        default: false,
      },
      typeOfInput: {
        type: String,
        default: "select",
      },
      description: {
        type: String,
      },
      answers: [
        {
          id: {
            type: mongoose.Types.ObjectId,
          },
          answer: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

module.exports = FormShceme = mongoose.model("QuestionSchema", FormSchema);
