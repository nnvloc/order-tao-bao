'use strict';

import models from 'src/models';
const OrderItem = models.OrderItem;
import { ItemNotFoundError } from 'src/utils/errors';
import Joi from 'src/utils/pjoi';
import moment from 'moment';

const DEFAULT_MONEY_EXCHANGE_RATE = 3500;

class OrderItemService {
  createOrderItems(items) {
    return new Promise((resolve, reject) => {
      return OrderItem.bulkCreate(items)
        .then(orderItems => {
          return resolve(orderItems);
        })
        .catch(err => {
          return reject(err);
        });
    });
  };

  generateOrderItem(orderId, subOrderId, item) {
    const {
      quanlity,
      isSupportMix,
      offerId,
      skuId,
      previewImageUrl,
      linkItem,
      sellerUserId,
      price,
      priceVN,
      beginAmount,
      skuProps,
      nameItem,
      tigia,
    } = item;

    return {
      quantity: quanlity,
      isSupportMix,
      itemId: offerId,
      skuId,
      skuProps: JSON.stringify(skuProps),
      previewImageUrl,
      linkItem,
      sellerUserId,
      sellerPrice: price,
      price: priceVN,
      beginAmount,
      itemName: nameItem,
      orderId,
      subOrderId,
      siteMoneyExchangeRate: DEFAULT_MONEY_EXCHANGE_RATE,
      shopMoneyEXchangeRate: tigia,
      totalAmount: +quanlity * +priceVN,
    };
  }

  styleOrderItemResponse(orderItem) {
    let result = orderItem.toJSON ? orderItem.toJSON() : { ...orderItem };
    if (result.skuProps && typeof(result.skuProps) === 'string') {
      result.skuProps = JSON.parse(result.skuProps);
    }

    return result;
  };
}

export default new OrderItemService();
