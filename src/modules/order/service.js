'use strict';

import models from 'src/models';
const Order = models.Order;
import { ItemNotFoundError } from 'src/utils/errors';
import Joi from 'src/utils/pjoi';
import moment from 'moment';
import orderItemService from '../orderItem/service';

const DEFAULT_EXCHANGE_MONEY_RATE = 3500;
const STATUS = {
  WAITING_FOR_CHARGE: 'WAITING_FOR_CHARGE',
}

class OrderService {
  createOrder(data) {
    return new Promise((resolve, reject) => {
      return Order.create(data)
        .then(order => {
          return resolve(order);
        })
        .catch(err => {
          return reject(err);
        });
    });
  };

  getOrderByUser(userId, query) {
    const where = {
      userId,
    }

    if (query && query.where) {
      where = { userId, ...query.where };
      delete query.where;
    }

    const finalQuery = {
      where,
      ...query,
    }

    return new Promise((resolve, reject) => {
      return Order.findAll(finalQuery)
        .then(orders => {
          return resolve(orders);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  getOrderById(id) {
    return new Promise((resolve, reject) => {
      return Order.find({ where: { id } })
        .then(o => {
          return resolve(o);
        })
        .catch(err => reject(err));
    });
  }

  updateOrderById(id, data) {
    return new Promise((resolve, reject) => {
      return Order.update({ ...data }, { where: { id } })
        .then(result => {
          return resolve(result);
        })
        .catch(err => reject(err));
    })
  }

  generateNewOrderData(curUser, items) {
    const serviceFee = 5000;
    const totalItemsAmount = items.reduce((result, item) => {
      return result += (+item.priceVN * +item.quanlity);
    }, 0);
    const depositAmount = 0.7 * totalItemsAmount;
    const orderFee = 0.05 * totalItemsAmount;
    const totalAmount = totalItemsAmount + orderFee + serviceFee;
    const deptAmount = totalAmount;

    return {
      userId: curUser.id,
      chinaDeliveryFee: 0,
      vnDeliveryFee: 0,
      otherFee: 0,
      status: STATUS.WAITING_FOR_CHARGE,
      moneyExchangeRate: DEFAULT_EXCHANGE_MONEY_RATE,
      itemsMoneyAmount: totalItemsAmount,
      serviceFee,
      orderFee,
      depositAmount,
      deptAmount,
      totalAmount,
    };
  }

  styleOrderResponse(order) {
    let result = order.toJSON();
    if (result.items) {
      result.items = result.items.map(item => orderItemService.styleOrderItemResponse(item));
    }

    return result;
  };
}

export default new OrderService();
