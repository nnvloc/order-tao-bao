import Joi from 'src/utils/pjoi';

export const createUserSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
});

export const ChangePasswordRequest = Joi.object().keys({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

export const ChangeEmailRequest = Joi.object().keys({
  password: Joi.string().required(),
  newEmail: Joi.string().required(),
});
