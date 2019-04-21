import models from 'src/models';
import Joi from 'src/utils/pjoi';
import { handleSuccessResponse } from 'src/utils/response';
import { BadRequestError, ItemNotFoundError, ValidationError } from 'src/utils/errors';
import { TYPES, STATUS } from './constants';
import TransactionService from './service';
import UserService from '../user/service';
import OrderService from '../order/service';

class TransactionController {
  async getHistory(req, res, next) {
    try {
      const curUser = req.user;
      let query = {
        where: {
          userId: curUser.id,
        },
        order: ['createdAt'],
      }
      TransactionService.getTransactionsByQuery(query)
        .then(results => {
          handleSuccessResponse(res, true, { transactions: [...results] });
        })
        .catch(err => next(err));
    } catch(err) {
      next(err);
    }
  }

  async addMoney(req, res, next) {
    try {
      const curUser = req.user;
      const {
        amount
      } = req.body;
      let money = curUser.money || 0;
      money += amount;
      const transactionData = {
        beforeChangeAmount: curUser.money,
        changeAmount: amount,
        afterChangeAmount: money,
        userId: curUser.id,
        type: TYPES.ADD_MONEY,
        status: STATUS.WAITING_FOR_APPROVED,
      };

      TransactionService.createTransaction(transactionData)
        .then(transaction => {
          handleSuccessResponse(res, true);
        })
        .catch(err => {
          next(err);
        });
    } catch(err) {
      next(err);
    }
  }

  async approveTransaction(req, res, next) {
    try {
      let curUser = req.user;
      const {
        transactionId,
      } = req.params;
      let foundTransaction = null;
      ///////////
      // TODO: Handle min max value of order. Ex: pay more than dept
      //////////
      TransactionService.getTransactionById(transactionId)
        .then(t => {
          t = t.toJSON();
          foundTransaction = t;

          if (t.userId !== curUser.id) {
            throw new ItemNotFoundError();
          }

          if (t.status === STATUS.APPROVED) {
            throw new BadRequestError('Approved already.');
          }

          let money = curUser.money;
          if (t.type === TYPES.ADD_MONEY) {
            money += t.changeAmount;
          }
          if (t.type === TYPES.PAY_DEPOSIT || t.type === TYPES.CHARGE) {
            money -= t.changeAmount;
          }

          return UserService.updateUserById(curUser.id, { money });
        })
        .then(u => {
          return TransactionService.updateTransactionById(transactionId, { status: STATUS.APPROVED });
        })
        .then(result => {
          if (foundTransaction.type === TYPES.ADD_MONEY) {
            handleSuccessResponse(res, true);
            return null;
          } else {
            return OrderService.getOrderById(foundTransaction.orderId);
          }
        })
        .then(order => {
          if (!order || !order.toJSON) return null;

          order = order.toJSON();
          const paidAmount = order.paidAmount + foundTransaction.changeAmount;
          const deptAmount = order.deptAmount - foundTransaction.changeAmount;
          let updateData = {
            paidAmount,
            deptAmount,
          }
          if (paidAmount >= order.depositAmount) {
            if (foundTransaction.type === TYPES.PAY_DEPOSIT) {
              updateData.status = 'PAID_DEPOSIT';
            }
          }
          return OrderService.updateOrderById(order.id, updateData);
        })
        .then(result => {
          if (!result) return;
          handleSuccessResponse(res, true);
        })
        .catch(err => next(err));
    } catch(err) {
      next(err);
    }
  }

  async payDeposit(req, res, next) {
    try {
      const curUser = req.user;
      const {
        orderId
      } = req.body;
      OrderService.getOrderById(orderId)
        .then(o => {
          const order = o.toJSON();
          if (order.userId !== curUser.id) {
            throw new ItemNotFoundError();
          }

          const afterChangeAmount = curUser.money - order.depositAmount;
          if (afterChangeAmount < 0) {
            throw new BadRequestError('Not enough money.');
          }

          const transactionData = {
            beforeChangeAmount: curUser.money,
            changeAmount: order.depositAmount,
            afterChangeAmount,
            orderId: order.id,
            userId: curUser.id,
            type: TYPES.PAY_DEPOSIT,
            status: STATUS.WAITING_FOR_APPROVED,
          };

          return TransactionService.createTransaction(transactionData);
        })
        .then(t => {
          handleSuccessResponse(res, true);
        })
        .catch(err => next(err));
    } catch(err) {
      next(err);
    }
  }

  async payOrder(req, res, next) {
    try {
      const curUser = req.user;
      const {
        orderId,
        amount,
      } = req.body;
      OrderService.getOrderById(orderId)
        .then(o => {
          const order = o.toJSON();
          if (order.userId !== curUser.id) {
            throw new ItemNotFoundError();
          }

          const afterChangeAmount = curUser.money - amount;
          if (afterChangeAmount < 0) {
            throw new BadRequestError('Not enough money.');
          }

          const transactionData = {
            beforeChangeAmount: curUser.money,
            changeAmount: amount,
            afterChangeAmount,
            orderId: order.id,
            userId: curUser.id,
            type: TYPES.CHARGE,
            status: STATUS.WAITING_FOR_APPROVED,
          };

          return TransactionService.createTransaction(transactionData);
        })
        .then(t => {
          handleSuccessResponse(res, true);
        })
        .catch(err => next(err));
    } catch(err) {
      next(err);
    }
  }

  // Private functions
}

export default new TransactionController();
