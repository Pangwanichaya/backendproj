const { Product } = require("../models");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: { categoryId: req.category.id },
    });
    res.json({ products });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findAll({
      where: { id, categoryId: req.category.id },
    });
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    // 1. รับ req ที่ส่งเข้ามาทาง  body

    // destructuring obj data จาก req ในส่วน body
    const {
      productname,
      productdetail,
      productprice,
      productamount,
      picurl,
      categoryId,
    } = req.body;
    //ใช้คำสั่ง squelize สร้างสินค้าลงใน DB
    const product = await Product.create({
      productname,
      productdetail,
      productprice,
      productamount,
      picurl,
      categoryId,
    });
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productname, productdetail, productprice, productamount, picurl } =
      req.body;
    //destructuring array index 0
    const [rows] = await Product.update(
      {
        productname,
        productdetail,
        productprice,
        productamount,
        picurl,
        categoryId: category.id,
      },
      {
        where: {
          id,
          categoryId: req.category.id,
        },
      }
    );
    if (rows === 0) {
      return res.status(400).json({ message: "fail to update product" });
    }

    res.status(200).json({ message: "success update product" });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await Product.destroy({
      where: {
        id,
        categoryId: req.category.id,
      },
    });

    if (rows === 0) {
      return res.status(400).json({ message: "fail to delete product" });
    }
    res.status(204).json({ message: "sucess delete product" });
  } catch (err) {
    next(err);
  }
};
