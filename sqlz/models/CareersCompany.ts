'use strict';

module.exports = function (sequelize, DataTypes) {
  var CareersCompany = sequelize.define('CareersCompany', {
    uid:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
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
    tableName: 'careers_company',
    timestamps: true
  });

  return CareersCompany;
};
//# sourceMappingURL=Comment.js.map

export {}
