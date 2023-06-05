const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../middlewares");

// Joi params!
const Joi = require("joi");
const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "co", "uk"] },
    })
    .required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean().required(),
});
//

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      match: phoneRegexp,
      require: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = { Contact, contactAddSchema, contactUpdateFavoriteSchema };
