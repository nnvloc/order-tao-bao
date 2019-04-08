import models from 'src/models';
import UserService from './service';
import Joi from 'src/utils/pjoi';
import { handleSuccessResponse } from 'src/utils/response';
import { BadRequestError, ItemNotFoundError, ValidationError } from 'src/utils/errors';

class UserController {
  async getUserProfile(req, res, next) {
    try {
      const curUser = req.user;
      UserService.getUserById(curUser.id)
        .then(user => {
          if (!user) {
            return next(new ItemNotFoundError());
          }
          handleSuccessResponse(res, true, { user: UserService.styleUserResponse(user) });
        })
        .catch(err => {
          next(err);
        });
    } catch(err) {
      next(err);
    }
  }

  // Private functions
}

export default new UserController();
