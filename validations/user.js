const { body } = require("express-validator");
const { UserModel } = require("./../models");

const SignupValidations = [
  body("firstname").not().isEmpty().withMessage("First name is required"),
  body("lastname").not().isEmpty().withMessage("Last name is required"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value });
      if (user) {
        throw new Error("Email is already taken");
      }
    }),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .isStrongPassword()
    .withMessage("Please select a stronger password"),
  body("confirmpassword")
    .notEmpty()
    .withMessage("Confirm Password should not be empty")
    .custom(async (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match')
      }
    })
];

module.exports = {
  SignupValidations,
};
