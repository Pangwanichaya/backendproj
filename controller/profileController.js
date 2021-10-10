const { User } = require("../models");

exports.getProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findAll({ where: { id } });
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
    const [rows] = await User.update(
      {
        username,
        password,
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
