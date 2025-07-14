import { body } from "express-validator";

export const signupValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password too short"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];


export const emailValidator = [
  body("email").isEmail().withMessage("Invalid email")
];

export const passwordTokenValidator = [
  
 body("password")
  .notEmpty().withMessage("Password is required")
  .isLength({ min: 6 }).withMessage("Password too short"),

   body("token")
    .notEmpty().withMessage("Token is required"),

];
