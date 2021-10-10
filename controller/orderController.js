const { Order } = require("../models");

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.id } });
    res.json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findAll({ where: { id, userId: req.user.id } });
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    // 1. รับ req ที่ส่งเข้ามาทาง  body
    const order = req.user;
    // destructuring obj data จาก req ในส่วน body
    const { orderdate, paymentstatus, picurl, bankname, bankno } = req.body;
    //ใช้คำสั่ง squelize สร้างสินค้าลงใน DB
    const order = await Order.create({
      orderdate,
      paymentstatus,
      picurl,
      bankname,
      bankno,
      userId: user.id,
    });
    //respond list ออกไป
    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { orderdate, paymentstatus, picurl, bankname, bankno } = req.body;
    //destructuring array index 0
    const [rows] = await Product.update(
      { orderdate, paymentstatus, picurl, bankname, bankno, userId: user.id },
      {
        where: {
          id,
          userId: req.user.id,
        },
      }
    );
    if (rows === 0) {
      return res.status(400).json({ message: "fail to update order" });
    }

    res.status(200).json({ message: "success update order" });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await Order.destroy({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (rows === 0) {
      return res.status(400).json({ message: "fail to delete order" });
    }
    res.status(204).json({ message: "sucess delete order" });
  } catch (err) {
    next(err);
  }
};
