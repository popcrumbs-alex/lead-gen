const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  zip: {
    type: String,
    required: true,
  },
  collectionDate: {
    type: Date,
    default: Date.now,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  address: {
    streetAddress: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  survey: [
    {
      surveyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuestionSchema",
      },
      reward: {
        type: String,
      },
      surveyName: {
        type: String,
      },
      completed: {
        type: Boolean,
        default: false,
      },
      posted: {
        //TODO should change to where lead is posted
        type: Boolean,
        default: false,
      },
      questionData: [
        {
          question: {
            type: String,
          },
          questionSchemaRefId: {
            type: String,
          },
          answer: {
            type: String,
          },
        },
      ],
    },
  ],
});

module.exports = User = mongoose.model("User", UserSchema);
