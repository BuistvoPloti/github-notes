const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("note", {
    repository_id: {
      // type: Sequelize.STRING,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    creator_id: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    text: {
      type: DataTypes.TEXT, // or STRING
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    timestamps: false,
  });
};
