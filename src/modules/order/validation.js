import Joi from '../../utils/pjoi';

export const CreateOrderParams = Joi.object().keys({
  exchangeMoneyRate: Joi.number().required(),
  items: Joi.array().required(),
});
