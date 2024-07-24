import { body } from "express-validator";

export const validateTurfInput = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("sportTypes").notEmpty().withMessage("Sport types is required"),
  body("pricePerHour")
    .notEmpty()
    .withMessage("Price per hour is required")
    .isNumeric()
    .withMessage("Price per hour must be a number"),

  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: [
          {
            type: "field",
            msg: "Image is required",
            path: "image",
            location: "body",
          },
        ],
      });
    }
    next();
  },
];
