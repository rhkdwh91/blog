'use strict';

module.exports = function (sequelize, DataTypes) {
  var Portfolio = sequelize.define('Portfolio', {
    uid:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      type: DataTypes.TIME
    },
    updatedAt: {
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      type: DataTypes.TIME
    }
  }, {
    tableName: 'portfolio',
    timestamps: true
  });

  return Portfolio;
};
//# sourceMappingURL=Comment.js.map

export {}
