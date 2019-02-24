'use strict';

import models from 'src/models';
const UserToken = models.Token;
import { CreateUserTokenSchema } from './validation';
import Joi from 'src/utils/pjoi';
import moment from 'moment';
import { ItemNotFoundError } from 'src/utils/errors';

class TokenService {
  createToken(tokenData) {
    return new Promise((resolve, reject) => {
      Joi.validate(tokenData, CreateUserTokenSchema)
        .then(params => {
          return UserToken.create(tokenData)
        })
        .then(token => {
          resolve(token);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  getToken(token) {
    return new Promise((resolve, reject) => {
      const now = moment();
      UserToken.findOne({
        where: {
          token: token
        }
      })
        .then(token => {
          resolve(token);
        })
        .catch(err => {
          reject (err);
        });
    });
  }

  removeToken(token) {
    return new Promise((resolve, reject) => {
      UserToken.destroy({where: {token: token}})
        .then(result => {
          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
}

export default new TokenService();
