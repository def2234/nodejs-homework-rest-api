const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

// Joi params!
const Joi = require("joi");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscription = ["starter", "pro", "business"];

const userRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "co", "uk"] },
    })
    .pattern(emailRegex)
    .required(),
  password: Joi.string().required().min(8),
});

const userLoginSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "co", "uk"] },
    })
    .pattern(emailRegex)
    .required(),
  password: Joi.string().required().min(8),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscription)
    .required(),
});
//

// Mongoose schema
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscription,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);
//

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = {
  User,
  userRegisterSchema,
  userLoginSchema,
  subscriptionSchema,
};
