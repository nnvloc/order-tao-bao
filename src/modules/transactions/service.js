'use strict';

import models from 'src/models';
const Transaction = models.Transaction;
import { ItemNotFoundError } from 'src/utils/errors';
import Joi from 'src/utils/pjoi';
import moment from 'moment';

class TransactionService {
  createTransaction(data) {
    return new Promise((resolve, reject) => {
      return Transaction.create(data)
        .then(t => {
          return resolve(t);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  getTransactionsByUserId(userId) {
    return new Promise((resolve, reject) => {
      return Transaction.findAll({
        where: {
          userId,
        }
      })
        .then(result => {
          return resolve(result || []);
        })
        .catch(err => {
          return reject(err);
        })
    });
  }

  getTransactionById(id) {
    return new Promise((resolve, reject) => {
      return Transaction.find({ where: { id } })
        .then(t => {
          return resolve(t);
        })
        .catch(err => reject(err));
    });
  }

  updateTransactionById(id, data) {
    return new Promise((resolve, reject) => {
      Transaction.update({ ...data }, { where: { id } })
        .then(result => {
          return resolve(result);
        })
        .catch(err => reject(err));
    })
  }

  getTransactionsByQuery(query) {
    return new Promise((resolve, reject) => {
      return Transaction.findAll(query)
        .then(result => {
          return resolve(result);
        })
        .catch(err => reject(err));
    });
  }

  styleOrderResponse(transaction) {
    let result = transaction.toJson ? transction.toJson() : transaction;
    return result;
  };
}

export default new TransactionService();
