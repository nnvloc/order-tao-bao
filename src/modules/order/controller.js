import models from 'src/models';
import OrderService from './service';
import SubOrderService from '../subOrder/service';
import OrderItemService from '../orderItem/service';
import Joi from 'src/utils/pjoi';
import { handleSuccessResponse } from 'src/utils/response';
import { CreateOrderParams } from './validation';
import { BadRequestError, ItemNotFoundError, ValidationError } from 'src/utils/errors';
import { STATUS_CODES } from 'http';

const DEFAULT_EXCHANGE_MONEY_RATE = 3500;

class OrderController {
  async createOrder(req, res, next) {
    try {
      const curUser = req.user;
      const params = req.body;
      let createdOrder = null;
      let createdSubOrder = null;
      const {
        exchangeMoneyRate,
        items,
      } = params;
      Joi.validate(params, CreateOrderParams)
        .then(validParams => {
          if (exchangeMoneyRate !== DEFAULT_EXCHANGE_MONEY_RATE) {
            throw new BadRequestError('Wrong rate', { exchangeMoneyRate: DEFAULT_EXCHANGE_MONEY_RATE });
          }

          const newOrderData = OrderService.generateNewOrderData(curUser, items);
          return OrderService.createOrder(newOrderData);
        })
        .then(order => {
          createdOrder = order;
          const subOrder = SubOrderService.generateSubOrder(order);
          return SubOrderService.createSubOrder(subOrder);
        })
        .then(subOrder => {
          createdSubOrder = subOrder;
          const orderItems = items.map(item => {
            return OrderItemService.generateOrderItem(createdOrder.id, createdSubOrder.id, item);
          });
          return OrderItemService.createOrderItems(orderItems);
        })
        .then(orderItems => {
          handleSuccessResponse(res, true);
        })
        .catch(err => {
          next(err);
        });
    } catch(err) {
      next(err);
    }
  };

  async getOrderByUser(req, res, next) {
    try {
      const curUser = req.user;
      const query = {
        include: ['items'],
      }
      OrderService.getOrderByUser(curUser.id, query)
        .then(orders => {
          handleSuccessResponse(res, true, { orders });
        })
        .catch(err => {
          next(err);
        });
    } catch(err ){
      next(err);
    };
  }

  // Private functions
}

export default new OrderController();
