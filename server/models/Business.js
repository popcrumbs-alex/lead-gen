const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  apiEndpoint: {
    type: String,
    required: true,
  },
  apiMethod: {
    type: String,
    default: "POST",
  },
  leads: [
    {
      category: {
        key: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
      questionSchemaRefId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuestionSchema",
      },
      campaignId: {
        key: {
          type: String,
        },
        value: {
          type: String,
        },
      },
      requiredFields: [
        {
          fieldName: {
            type: String,
            required: true,
          },
          referenceId: {
            type: String,
            required: true,
          },
        },
      ],
      leadContactInfo: [
        {
          fieldName: {
            type: String,
            required: true,
          },
          alt: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

module.exports = Business = mongoose.model("BusinessSchema", BusinessSchema);
