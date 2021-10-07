module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      categoryname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
      underscored: true, // map ชื่อ colunm ในรูปแบบ uderScore
    }
  );

  //   ความสัมพันธ์

  Category.associate = (models) => {
    // Category มี Product
    Category.hasMany(models.Product, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Category;
};
