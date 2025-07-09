import { check, body, param, query } from "express-validator";

export const userBodyValidationRules = [
  body("id").not().exists().withMessage("ID is not allowed in the body"),
  body("name").notEmpty().withMessage("Name is required"),
  body("age")
    .isInt({ min: 0, max: 99 })
    .withMessage("Age must be a valid number")

];

export const patchUserValidationRules = [
  body("id").not().exists().withMessage("ID cannot be updated"),
  body("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("age")
    .optional()
    .isInt({ min: 0, max: 99 })
    .withMessage("Age must be valid")

];








export const userParamRules = [
  param("id")
    .notEmpty()
    .withMessage("ID param is required")
    .isInt({ min: 1,max:99 })
    .withMessage("ID must be a positive integer")
];

export const userQueryRules = [
  query("active").isBoolean().withMessage("Active must be true or false"),
];

