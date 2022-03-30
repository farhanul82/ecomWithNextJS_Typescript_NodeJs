import { check, validationResult } from "express-validator";

export const LoginValidator = [
    check("username")
        .isLength({
            min: 1,
        })
        .withMessage("Mobile number or email is required"),
    check("password").isLength({ min: 1 }).withMessage("Password is required"),
];



export const doLoginValidationHandler = function (req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
      next();
    } else {
      next(mappedErrors)
    }
  };