'use strict';

module.exports = function (sequelize, DataTypes) {
  var CareersProject = sequelize.define('CareersProject', {
    uid:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company: {
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
    tableName: 'careers_project',
    timestamps: true
  });

  return CareersProject;
};
//# sourceMappingURL=Comment.js.map

export {}
