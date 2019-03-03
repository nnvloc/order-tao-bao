import Joi from '../../utils/pjoi';

export const CreateCartSchema = Joi.object().keys({
  userId: Joi.number().integer().required(),
  items: Joi.string(),
});

export const UpdateCartSchema = Joi.object().keys({
  items: Joi.array().items(Joi.object()),
});
