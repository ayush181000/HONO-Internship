import Joi from '@hapi/joi';
import joiObjectId from 'joi-objectid'
Joi.objectId = joiObjectId(Joi);

const createBookValidator = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        genre: Joi.string().required(),
        author: Joi.objectId().required(),
        pages: Joi.number().required(),
    });
    return schema.validate(data);
};

export default createBookValidator;