const { Category } = require("../models");

exports.getAllcategorys = async (req, res, next) => {
  try {
    const categorys = await Category.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: ["categoryname"],
    });
    console.log(categorys);
    res.json({ categorys });
  } catch (err) {
    next(err);
  }
};

exports.getcategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json({ category });
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { categoryname } = req.body;
    console.log("Cate", req.body);
    const catagory = await Category.create({
      categoryname,
    });
    res.status(201).json({ catagory: catagory });
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { categoryname } = req.body;
    const rows = await Category.update(
      {
        categoryname,
      },
      {
        where: { id },
      }
    );
    if (rows[0] === 0)
      return res.status(400).json({ message: "update failed" });
    res.json({ message: "update completed" });
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await Category.destroy({
      where: { id },
    });
    if (rows === 0) return res.status(400).json({ message: "delete failed" });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
