import { body } from "express-validator";

export const validateRegisterInput = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is invalid"),
  body("phone").isMobilePhone("en-IN").withMessage("Phone number is invalid"),
  body("password").notEmpty().withMessage("Password is required"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

export const validateLoginInput = [
  body("email").isEmail().withMessage("Email is invalid"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const validateOwnerRequestInput = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is invalid"),
  body("phone").isMobilePhone("en-IN").withMessage("Phone number is invalid"),
];
