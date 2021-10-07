const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.checkRole =
  (...roles) =>
  async (req, res, next) => {
    if (!roles.includes(req, res, next)) {
      res.status(403).json({ message: "You not allowed" });
    }
    next();
  };

exports.authenticate = async (req, res, next) => {
  try {
    // get request headers
    // const headers = req.headers;
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer")) {
      return res.status(401).json({ message: "you are unauthorized" });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "you are unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // decoded { id: , email: , username }

    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ message: "you are unauthorized" });
    }

    req.user = user;
    req.data = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // SELECT * FROM users WHERE username = username
    const user = await User.findOne({ where: { username: username } });
    // username not found
    if (!user) {
      return res.status(400).json({ message: "invalid username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    // password did not match
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "invalid username or password" });
    }

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 1500,
    }); // '30d' 60 * 60 * 24 * 30
    res.json({ message: "success logged in", token });
  } catch (err) {
    next(err);
  }
};
exports.register = async (req, res, next) => {
  try {
    const { username, password, name, address, birthdate, email, phone } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      password: hashedPassword,
      name,
      address,
      birthdate,
      email,
      phone,
    });
    res.status(200).json({ msg: "Register Successfully" });
  } catch (err) {
    err.where = "Error in Register_authController";
    next(err);
  }
};
