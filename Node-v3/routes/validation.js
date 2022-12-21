// const joi = require('@hapi/joi');



// const registerValidation = data => {
//     const schema = joi.object({
//         fname: joi.string().min(6).required(),
//         lname: joi.string().min(6).required(),
//         username: joi.string().min(3).required(),
//         email: joi.string().min(6).email(),
//         password: joi.string().min(6).required(),
//         imageUrl: joi.string().required(),
//         roll: joi.string(),
//     });

//     return schema.validate(data)
// }

// const logInValidation = data => {
//     const schema = joi.object({
//         email: joi.string().min(6).email(),
//         password: joi.string().min(6).required()
//     });

//     return schema.validate(data);
// }



// module.exports.registerValidation = registerValidation;
// module.exports.logInValidation = logInValidation;