const { OrderItem } = require("../models");

exports.getAllOrderItems = async (req, res, next) => {
  try {
    const orderItems = await OrderItem.findAll({
      where: { orderId: req.order.id },
    });
    // const orderItems = await OrderItem.findAll({ where: { userId: req.user.id }, { productId: req.product.id }});
    res.json({ orderItems });
  } catch (err) {
    next(err);
  }
};

exports.getOrderItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const OrderItem = await OrderItem.findAll({
      where: { id, userId: req.order.id },
    });
    // const OrderItem  = await OrderItem .findAll({ where: { id, orderId: req.order.id }, { productId: req.product.id }} });
    res.json({ OrderItem });
  } catch (err) {
    next(err);
  }
};

exports.createOrderItem = async (req, res, next) => {
  try {
    // 1. รับ req ที่ส่งเข้ามาทาง  body
    const order = req.Order;
    // destructuring obj data จาก req ในส่วน body
    const { productamount, productprice } = req.body;
    //ใช้คำสั่ง squelize สร้างสินค้าลงใน DB
    const OrderItem = await OrderItem.create({
      productamount,
      productprice,
      orderId: order.id,
      productId: product.id,
    });
    //respond list ออกไป
    res.status(201).json({ OrderItem });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productamount, productprice } = req.body;
    //destructuring array index 0
    const [rows] = await OrderItem.update(
      { productamount, productprice, orderId: order.id, productId: product.id },
      {
        where: {
          id,
          orderId: req.order.id,
        },
      }
    );
    if (rows === 0) {
      return res.status(400).json({ message: "fail to update orderItem" });
    }

    res.status(200).json({ message: "success update orderItem" });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrderItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await Order.destroy({
      where: {
        id,
        orderId: req.order.id,
      },
    });

    if (rows === 0) {
      return res.status(400).json({ message: "fail to delete orderItem" });
    }
    res.status(204).json({ message: "sucess delete orderItem" });
  } catch (err) {
    next(err);
  }
};
