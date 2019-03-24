'use strict';

import models from 'src/models';
const SubOrder = models.SubOrder;
import { ItemNotFoundError } from 'src/utils/errors';
import Joi from 'src/utils/pjoi';
import moment from 'moment';

class SubOrderService {
  createSubOrder(data) {
    return new Promise((resolve, reject) => {
      return SubOrder.create(data)
        .then(subOrder => {
          return resolve(subOrder);
        })
        .catch(err => {
          return reject(err);
        });
    });
  };

  generateSubOrder(order) {
    const {
      id,
      userId,
      itemsMoneyAmount,
      status,
      totalAmount,
    } = order;

    return {
      orderId: id,
      userId,
      itemsMoneyAmount,
      status,
      totalAmount,
    };
  }

  styleSubOrderResponse(sb) {
    return sb.toJSON();
  };
}

export default new SubOrderService();
