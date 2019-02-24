import Joi from '../../utils/pjoi';

// const TimeFormat = Joi.string().regex(/^(?:(?:([01]?[0-9]|2[0-3]):)?([0-5]?[0-9]):)?([0-5]?[0-9])$/);

export const CreateUserTokenSchema = Joi.object().keys({
  token: Joi.string().required(),
  userId: Joi.number().integer().required(),
  expiredAt: Joi.string().required()
});

export const LoginParams = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required()
});

export const RegisterParams = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required()
});

export const ResetPasswordParams = Joi.object().keys({
  password: Joi.string().required()
});

export const ForgotPasswordParams = Joi.object().keys({
  email: Joi.string().required()
});
