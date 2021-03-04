const { body, validationResult } = require('express-validator')

module.exports = {
    categoryValidationRules: () => {
        return [
            // username must be an email
            body('categorycode')
                .isAlphanumeric()
                .notEmpty().withMessage('require')
                .isLength({ min: 6 , max: 6 }).withMessage('Category Code must be 6 digits'),
            // password must be at least 5 chars long
            body('categoryname')
                .notEmpty().withMessage('require')
        ]
    },
    typeValidationRules: () => {
        return [
            // username must be an email
            body('typecode')
                .isAlphanumeric()
                .notEmpty().withMessage('require')
                .isLength({ min: 6 , max: 6 }).withMessage('Type Code must be 6 digits'),
            // password must be at least 5 chars long
            body('typename')
                .trim()
                .notEmpty().withMessage('require')
        ]
    },
    userValidationRules: () => {
        return [
            // username must be an email
            body('firstname')
                .isAlpha()
                .notEmpty().withMessage('require')
                .isLength({ max: 20 }).withMessage('max length is 20'),
            body('lastname')
                .isAlpha()
                .notEmpty().withMessage('require')
                .isLength({ max: 20  }).withMessage('max length is 20'),
            body('username')
                .isAlphanumeric()
                .notEmpty().withMessage('require')
                .isLength({ max: 20  }).withMessage('max length is 20'),
            // password must be at least 5 chars long
            body('email')
                .isEmail()
                .trim()
                .notEmpty().withMessage('require'),
            body('phonenumber')
                .isMobilePhone()
                .trim()
                .notEmpty().withMessage('require'),
            body('password')
                .trim()
                .isLength({ min: 8 })
                .notEmpty().withMessage('require'),
        ]
    },

    customerValidationRules: () => {
        return [
            // username must be an email
            body('username')
                .isAlphanumeric()
                .notEmpty().withMessage('require')
                .isLength({ max: 20  }).withMessage('max length is 20'),
            // password must be at least 5 chars long
            body('email')
                .isEmail()
                .trim()
                .notEmpty().withMessage('require'),
            body('phonenumber')
                .isMobilePhone()
                .trim()
                .notEmpty().withMessage('require'),
            body('password')
                .trim()
                .isLength({ min: 8 })
                .notEmpty().withMessage('require'),
        ]
    },

    brandValidationRules: () => {
        return [
            // username must be an email
            body('brandcode')
                .isAlphanumeric()
                .notEmpty().withMessage('require')
                .isLength({ min: 6 , max: 6 }).withMessage('Brand Code must be 6 digits'),
            // password must be at least 5 chars long
            body('brandname')
                .notEmpty().withMessage('require')
        ]
    },
    variantValidationRules: () => {
        return [
            // username must be an email
            body('variantcode')
                .isAlphanumeric()
                .notEmpty().withMessage('require')
                .isLength({ min: 6 , max: 6 }).withMessage('Variant Code must be 6 digits'),
            // password must be at least 5 chars long
            body('variantname')
                .notEmpty().withMessage('require')
                .isAlpha().withMessage('Variant Name must be alphabet'),
            body('varianvalue')
                .notEmpty().withMessage('require')
        ]
    },
    warehouseValidationRules: () => {
        return [
            // username must be an email
            body('warehousecode')
                .isAlphanumeric()
                .notEmpty().withMessage('require')
                .isLength({ min: 6 , max: 6 }).withMessage('Warehouse Code must be 6 digits'),
            // password must be at least 5 chars long
            body('warehousename')
                .notEmpty().withMessage('require'),
        ]
    },
    stocklocationValidationRules: () => {
        return [
            // username must be an email
            body('stocklocationcode')
                .isAlphanumeric()
                .notEmpty().withMessage('require')
                .isLength({ min: 6, max: 6 }).withMessage('Stock Location Code must be 6 digits'),
            // password must be at least 5 chars long
            body('stocklocationname')
                .notEmpty().withMessage('require')
                .isAlphanumeric().withMessage('StockLocation Name must be alphabet'),
            body('stocklocationdescription')
                .notEmpty().withMessage('require')
        ]
    },
    storelocationValidationRules: () => {
        return [
            // username must be an email
            body('storelocationcode')
                .isAlphanumeric()
                .notEmpty().withMessage('require')
                .isLength({ min: 6, max: 6 }).withMessage('Store Location Code must be 6 digits'),
            // password must be at least 5 chars long
            body('storelocationname')
                .notEmpty().withMessage('require')
                .isAlphanumeric().withMessage('Store Location Name must be alphabet'),
            body('storelocationdescription')
                .notEmpty().withMessage('require')
        ]
    },
    vendorValidationRules: () => {
        return [
            // username must be an email
            body('vendorcode')
                .isAlphanumeric()
                .notEmpty().withMessage('require')
                .isLength({ min: 6, max: 6 }).withMessage('Vendor Code must be 6 digits'),
            // password must be at least 5 chars long
            body('vendorname')
                .notEmpty().withMessage('require')
                .isAlphanumeric().withMessage('StockLocation Name must be alphabet'),
            // body('phonenumber')
            //     .isMobilePhone()
            //     .notEmpty().withMessage('require'),
            body('email')
                .isEmail()
                .normalizeEmail()
                .notEmpty().withMessage('require'),
            body('facebook')
                .isURL(),
            
            body('address.*.no')
                .isAlphanumeric()
                .isLength({ max: 6 }).withMessage('No has 6 maximum characters'),
            body('address.*.street')
                .isAlphanumeric()
                .isLength({ max: 6 }).withMessage('No has 6 maximum characters')
        ]
    },


    validate: (req, res, next) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        const extractedErrors = []
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
        return res.status(422).json({
            errors: extractedErrors,
        })
    }
}