const { User } = require("../models");
const bcrypt = require("bcryptjs");
exports.getProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      order: [
        "username",
        "password",
        "name",
        "address",
        "birthdate",
        "email",
        "phone",
      ],
    });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, name, address, birthdate, email, phone } =
      req.body;
    //destructuring array index 0

    const hasedPassword = await bcrypt.hash(password, 12);
    const [rows] = await User.update(
      {
        username,
        password: hasedPassword,
        name,
        address,
        birthdate,
        email,
        phone,
      },
      {
        where: {
          id,
        },
      }
    );
    if (rows === 0) {
      return res.status(400).json({ message: "fail to update profile" });
    }

    res.status(200).json({ message: "success update profile" });
  } catch (err) {
    next(err);
  }
};
//const { username, password, name, address, birthdate, email, phone } =req.body
