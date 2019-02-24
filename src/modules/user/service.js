import models from 'src/models';
import { createUserSchema } from './validation';
import Joi from 'src/utils/pjoi';
import { ItemNotFoundError } from 'src/utils/errors';

const User = models.User;

class UserService {
  createUser(params) {
    return new Promise((resolve, reject) => {
      Joi.validate(params, createUserSchema)
        .then(params => {
          return User.create(params);
        })
        .then(user => {
          resolve(user);
        })
        .catch(reject);
    });
  };

  getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: {email: email}
      })
        .then(u => {
          resolve(u);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  getUserById(id) {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: {id: id}
      })
        .then(u => {
          resolve(u);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  updateUserById(id, params) {
    return new Promise((resolve, reject) => {
      User.findOne({where: {id: id}})
        .then(u => {
          if(!u) {
            return reject(new ItemNotFoundError());
          }

          return u.update(params);
        })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  styleUserResponse(user) {
    let result = user.toJSON();
    delete result.password;
    return result;
  };
}

export default new UserService();
