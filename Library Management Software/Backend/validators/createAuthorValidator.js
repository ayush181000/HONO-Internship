import Joi from '@hapi/joi';
// import joiObjectId from 'joi-objectid'
// Joi.objectId = joiObjectId(Joi);

const createAuthorValidator = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        // id: Joi.objectId().required()
    });
    return schema.validate(data);
};

export default createAuthorValidator;