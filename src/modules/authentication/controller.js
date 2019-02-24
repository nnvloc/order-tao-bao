import UserService from '../user/service';
import AuthService from './service';
import TokenService from 'src/modules/token/service';
import model from 'src/models';
import Joi from 'src/utils/pjoi';
import { LoginParams, RegisterParams, ResetPasswordParams, ForgotPasswordParams } from './validation';
import { ItemConflictError, BadRequestError, ItemNotFoundError, ValidationError } from 'src/utils/errors';
import { AuthorizationError } from './errors';
import config from 'src/configs';

class AuthController {
  async register(req, res, next) {
    try {
      let user;
      const params = req.body;
      Joi.validate(params, RegisterParams)
        .then(validParams => {
          // Check email existed
          return UserService.getUserByEmail(params.email)
        })
        .then(existedUser => {
          if(existedUser) {
            throw new ItemConflictError('Email existed!');
          }
          return UserService.createUser(params)
        })
        .then(u => {
          user = u;
          const jwtData = {
            id: u.id,
            email: u.email
          };
          return AuthService.generateToken(jwtData);
        })
        .then(result => {
          res.json({
            success: true
          });
        })
        .catch(err => {
          next(err);
        });
    } catch(err) {
      next(err);
    }
  };

  verifyAccount(req, res, next) {
    try {
      if(!req.user) {
        throw new BadRequestError();
      }

      UserService.updateUserById(req.user.id, {emailConfirmed: true})
        .then(result => {
          res.json({
            success: true
          });
        })
        .catch(err => {
          next(err);
        });
    } catch(err) {
      next(err);
    }
  }

  login(req, res, next) {
    try {
      const loginData = req.body;
      let user;
      Joi.validate(req.body, LoginParams)
        .then(validParams => {
          return UserService.getUserByEmail(loginData.email);
        })
        .then(u => {
          if(!u) {
            throw new AuthorizationError('Wrong username or password!');
          }
          user = u;
          return u.isValidPassword(loginData.password)
        })
        .then(isValid => {
          if (!isValid) {
            throw new AuthorizationError('Wrong username or password!');
          }
          const jwtData = {
            id: user.id,
            email: user.email
          };
          return AuthService.generateToken(jwtData);
        })
        .then(jwtToken => {
          res.json({
            user: UserService.styleUserResponse(user),
            token: jwtToken
          });
        })
        .catch(err => {
          next(err);
        });
    } catch(err) {
      next(err);
    }
  };

  logout(req, res, next) {
    try {
      const auth_token = req.body.auth_token || req.query.auth_token || req.headers['x-auth-token'];
      if(!auth_token) {
        throw new BadRequestError('Missing access token!');
      }
      TokenService.removeToken(auth_token)
        .then(result => {
          res.json({
            success: true
          });
        })
        .catch(err => {
          next(err);
        });
    } catch(err) {
      next(err);
    }
  };

  forgotPassword(req, res, next) {
    try {
      let user;
      Joi.validate(req.body, ForgotPasswordParams)
        .then(params => {
          return UserService.getUserByEmail(params.email);
        })
        .then(u => {
          if(!u) {
            throw new ItemNotFoundError('Not found!');
          }

          user = u;
          const jwtData = {
            id: u.id,
            email: u.email
          };
          return AuthService.generateToken(jwtData);
        })
        .then(jwtToken => {
          // TODO send email to user for a link to reset password
          const mailTemplateParams = {
            user,
            forgotPasswordUrl: `${config.WEB_DOMAIN}/reset-password?token=${jwtToken}`
          }
          let mailTpl = getForgotPasswordTemplate(mailTemplateParams);
          mailTpl.toUser = [user.email];
          const emailOpts = MailService.initMailOptions(mailTpl);
          return MailService.sendEmail(emailOpts);
        })
        .then(result => {
          res.json({
            success: true
          });
        })
        .catch(err => {
          next(err);
        });
    } catch(err) {
      next(err);
    }
  }

  resetPassword(req, res, next) {
    try {
      Joi.validate(req.body, ResetPasswordParams)
        .then(params => {
          return UserService.updateUserById(req.user.id, {password: req.body.password});
        })
        .then(result => {
          res.json({
            success: true
          });          
        })
        .catch(err => {
          next(err);
        });
    } catch(err) {
      next(err);
    }
  };

  refreshToken(req, res, next) {
    try {
      const oldToken = req.body.token;
      const userId = req.body.userId;

      TokenService.getToken(oldToken)
        .then(t => {
          if (!t) {
            throw new ItemNotFoundError('Not found token!');
          }
          
          if (t.userId !== userId) {
            throw new BadRequestError('Bad request.');
          }
          return TokenService.removeToken(oldToken);
        })
        .then(result => {
          return UserService.getUserById(userId);
        })
        .then(u => {
          const jwtData = {
            id: u.id,
            email: u.email
          };
          return AuthService.generateToken(jwtData);
        })
        .then(jwtToken => {
          res.json({
            token: jwtToken,
          });
        })
        .catch(err => {
          next(err);
        });
    } catch(err) {
      next(err);
    }
  }
}

export default new AuthController();
