// const { sequelize } = require("./models");
// sequelize.sync();

// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

require("dotenv").config();
const express = require("express");

const cors = require("cors");
const userAuthRoute = require("./routes/userAuthRoute");

const categoryRoute = require("./routes/categoruRoute");
const profileRoute = require("./routes/profileRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", userAuthRoute);

app.use("/category", categoryRoute);

app.use("/profile", profileRoute);

app.use((req, res, next) => {
  res.status(404).json({ message: "resource not found on this server" });
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server running on port ${port}`));
