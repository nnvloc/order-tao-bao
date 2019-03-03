import Joi from 'src/utils/pjoi';

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
  phoneNumber: Joi.string().required(),
  fullName: Joi.string().required(),
});

export const ResetPasswordParams = Joi.object().keys({
  password: Joi.string().required()
});

export const ForgotPasswordParams = Joi.object().keys({
  email: Joi.string().required()
});
