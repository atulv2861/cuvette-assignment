const Joi = require('joi');

const validationSchema = {
    // registraction validation
    createGroup:Joi.object().keys({
        name: Joi.string().min(3).max(30).required(),
        color:Joi.string().min(3).max(10).required(),
    }),
    createNote : Joi.object().keys({
        groupId: Joi.string().length(24).hex().required(),
        notes: Joi.string().min(6).max(1024).required()
    }),
}


module.exports = validationSchema;