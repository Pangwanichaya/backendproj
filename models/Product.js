module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      productname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productdetail: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      productprice: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      productamount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      picurl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
      underscored: true, // map ชื่อ colunm ในรูปแบบ uderScore
      paranoid: true,
    }
  );

  //   ความสัมพันธ์

  Product.associate = (models) => {
    //product เป็นของ Category
    Product.belongsTo(models.Category, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  return Product;
};
