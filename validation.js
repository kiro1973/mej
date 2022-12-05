const Joi = require('@hapi/joi');
//register validation
const registerValidation=(data)=>{
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(6)
            .required(),
    
        password: Joi.string()
            .min(6)
            .required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
        email: Joi.string()
            .email()
            .required()
    });
   return  schema.validate(data);
}
const loginValidation=(data)=>{
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(6)
            .required(),
    
        password: Joi.string()
            .min(6)
            .required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
        // email: Joi.string()
        //     .email()
        //     .required()
    });
   return  schema.validate(data);
}
module.exports.registerValidation=registerValidation;
module.exports.loginValidation=loginValidation;