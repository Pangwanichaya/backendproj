module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      productamount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      productprice: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
    },

    {
      underscored: true, // map ชื่อ colunm ในรูปแบบ uderScore
    }
  );

  //   ความสัมพันธ์

  OrderItem.associate = (models) => {
    //OrderItem เป็นของ Order
    OrderItem.belongsTo(models.Order, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    //OrderItem เป็นของ Product
    OrderItem.belongsTo(models.Product, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return OrderItem;
};
