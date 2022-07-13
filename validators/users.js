const {check, validationResult} = require("express-validator");

const validatorCreateUser = [
check("name")
    .exists().withMessage("Name field required")
    .trim()
    .isAlpha('es-ES', { ignore: ' ' }).withMessage("Only letters")
    .isLength({ min: 2, max: 90 }).withMessage("Character count: min 2, max 90"),
check("email")
    .exists().withMessage("Email field required")
    .trim()
    .isEmail().withMessage("Must be a valid email adress")
    .normalizeEmail(),
check("password")
    .exists().withMessage("Password field required")
    .trim()
    .isLength({ min: 5, max: 90 }).withMessage("Password must be: min 5, max 90")
    ,
    (req,res,next) => { 
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            res.status(400).json({error: error.array() })
        } 
    }
];

const validatorEditUser = [
    check("name")
        .exists().withMessage("Name field required")
        .trim()
        .isAlpha('es-ES', { ignore: ' ' }).withMessage("Only letters")
        .isLength({ min: 2, max: 90 }).withMessage("Character count: min 2, max 90"),
    check("email")
        .exists().withMessage("Email field required")
        .trim()
        .isEmail().withMessage("Must be a valid email adress")
        .normalizeEmail(),
        (req,res,next) => { 
            try {
                validationResult(req).throw()
                return next()
            } catch (error) {
                res.status(400).json({error: error.array() })
            } 
        }
    ]


module.exports = {validatorCreateUser, validatorEditUser}