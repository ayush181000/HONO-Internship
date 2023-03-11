import Joi from '@hapi/joi';
import joiObjectId from 'joi-objectid'
Joi.objectId = joiObjectId(Joi);

const finePaymentValidator = (data) => {
    const schema = Joi.object({
        transactionId: Joi.objectId().required(),
        finePaid: Joi.number().required(),
        fineTransactionId: Joi.string().required()

    });
    return schema.validate(data);
};

export default finePaymentValidator;