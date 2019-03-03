'use strict';

import models from 'src/models';
const Cart = models.Cart;
import { CreateCartSchema } from './validation';
import { ItemNotFoundError } from 'src/utils/errors';
import Joi from 'src/utils/pjoi';
import moment from 'moment';

class CartService {
  createCart(cartData) {
    return new Promise((resolve, reject) => {
      Joi.validate(cartData, CreateCartSchema)
        .then(params => {
          return Cart.create(cartData)
        })
        .then(cart => {
          resolve(cart);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  getCartByUserID(userId) {
    return new Promise((resolve, reject) => {
      const now = moment();
      Cart.findOne({
        where: {
          userId,
        }
      })
        .then(cart => {
          resolve(cart);
        })
        .catch(err => {
          reject (err);
        });
    });
  }

  updateCart(cartId, items) {
    return new Promise((resolve, reject) => {
      Cart.findOne({ where: { id: cartId } })
        .then(cart => {
          if (!cart) {
            return reject(ItemNotFoundError);
          }

          return cart.update({items})
        })
        .then(result => {
          return resolve(result);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  styleCartResponse(cart) {
    cart = cart.toJSON();
    let items = cart.items ? JSON.parse(cart.items) : [];
    delete cart.createdAt;
    delete cart.updatedAt;
    return { ...cart, items };
  };
}

export default new CartService();
