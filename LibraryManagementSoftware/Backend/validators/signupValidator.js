import Joi from '@hapi/joi';
import joiObjectId from 'joi-objectid'
Joi.objectId = joiObjectId(Joi);

const signupValidator = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6),
    });
    return schema.validate(data);
};

export default signupValidator;