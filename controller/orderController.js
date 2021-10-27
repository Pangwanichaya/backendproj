const { Order } = require("../models");
const { OrderItem, Product, User } = require("../models");

const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const util = require("util");
const uploadPromise = util.promisify(cloudinary.uploader.upload);

//==================== getAllOrders
exports.getAllOrders = async (req, res, next) => {
  // console.log('test');
  try {
    const orders = await Order.findAll({
      //User

      required: true,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },

      //OrderItem
      include: [
        User,
        {
          model: OrderItem,
          required: true,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },

          //Product
          include: Product,
          required: true,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
    res.json({ orders });
  } catch (err) {
    next(err);
  }
};

//==================== getOrderById
exports.getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ where: { id } });
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

//==================== createOrder
exports.createOrder = async (req, res, next) => {
  try {
    // 1. รับ req ที่ส่งเข้ามาทาง  body
    // const order = req.body;
    // destructuring obj data จาก req ในส่วน body
    //====================== ตัวรับ
    const { orderdate, paymentstatus, picurl, bankname, bankno, cartitems } =
      req.body;

    // console.log(JSON.parse(cartitems));

    const result = await uploadPromise(req.file.path);
    fs.unlinkSync(req.file.path);
    //create order
    const order = await Order.create({
      orderdate,
      paymentstatus,
      picurl: result.secure_url,
      bankname,
      bankno,
      userId: req.user.id,
    });

    //order items map เปลี่ยนเป้น obj
    const newOi = JSON.parse(cartitems).map((item) => ({
      qty: item.qty,
      productprice: item.productprice,
      orderId: order.id,
      productId: item.id,
    }));
    // console.log(newOi);

    // bulkCreat เป็นฟังก์ชัน loop ก้อน
    const orderItems = await OrderItem.bulkCreate(newOi);
    //respond list ออกไป
    const newStock = newOi.map((item) => ({
      qty: item.qty,
      productId: item.productId,
    }));

    const updateStock = newStock.map(async (item) => {
      const product = await Product.findOne({ where: { id: item.productId } });
      product.productamount = product.productamount - item.qty;
      await product.save();
    });
    await Promise.all(updateStock);
    console.log(newStock);
    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
};

//============================== updateOrder
exports.updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { bankname, bankno, paymentstatus, orderdate } = req.body;
    //destructuring array index 0
    const [rows] = await Order.update(
      { bankname, bankno, paymentstatus, orderdate },
      {
        where: {
          id,
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

//============================== deleteOrde
exports.deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await Order.destroy({
      where: {
        id,
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
