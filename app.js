// const { sequelize } = require("./models");
// sequelize.sync();

// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

require("dotenv").config();
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const errController = require("./controller/errController");

const app = express();
app.use(passport.initialize());
app.use(cors());
app.use(express.json());

app.use("/", authRoute);

app.use((req, res, next) => {
  res.status(404).json({ message: "resource not found on this server" });
});

app.use(errController);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server running on port ${port}`));
