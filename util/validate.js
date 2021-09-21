const { validationResult } = require('express-validator');



/**
 * @param {*} validations | Parameters in POST request 
 * @returns next if there's no errors or else HTTP 400 with an error message in JSON
 */
const validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);

        if(errors.isEmpty()){
            return next();
        }

        res.status(400).json({errors: errors.array()});

    };
};

module.exports = {validate};