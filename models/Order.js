module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      orderdate: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      paymentstatus: {
        type: DataTypes.ENUM("PENDING", "COMPLETED"),
        allowNull: false,
      },
      picurl: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      bankname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bankno: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
      underscored: true, // map ชื่อ colunm ในรูปแบบ uderScore
    }
  );

  //   ความสัมพันธ์

  Order.associate = (models) => {
    // Order เป็นของ User
    Order.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  return Order;
};
