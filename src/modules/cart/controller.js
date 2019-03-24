import CartService from './service';
import Joi from 'src/utils/pjoi';
import { handleSuccessResponse } from 'src/utils/response';
import { UpdateCartSchema } from './validation';
import { BadRequestError, ItemNotFoundError, ValidationError } from 'src/utils/errors';

class CartController {
  async updateCart(req, res, next) {
    try {
      const curUser = req.user;
      const params = req.body;
      Joi.validate(params, UpdateCartSchema)
        .then(validParams => {
          return CartService.getCartByUserID(curUser.id);
        })
        .then(cart => {
          if(!cart) {
            throw new ItemNotFoundError('Not found!');
          }
          const items = JSON.stringify(req.body.items);
          return CartService.updateCart(cart.id, items);
        })
        .then(result => {
          handleSuccessResponse(res, true, { cart: CartService.styleCartResponse(result) });
        })
        .catch(err => {
          next(err);
        });
    } catch(err) {
      next(err);
    }
  };

  async getCart(req, res, next) {
    try {
      const curUser = req.user;
      CartService.getCartByUserID(curUser.id)
        .then(cart => {
          handleSuccessResponse(res, true, { cart: CartService.styleCartResponse(cart) });
        })
        .catch(err => {
          next(err);
        });
    } catch(err ){
      next(err);
    };
  }
}

export default new CartController();
