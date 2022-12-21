const joi = require('@hapi/joi');


// const itemValidation = data => {
//     const schema = joi.object({
//         title: joi.string().min(6).required(),
//         descripion: joi.string().min(6).required(),
//         image_url: joi.string().min(6).required(),
//         id:joi.integer()
//     });

//     return schema.validate(data)
// }

module.exports.itemValidation = itemValidation;