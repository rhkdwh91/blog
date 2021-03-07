'use strict';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    uid:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: '이미 가입된 이메일 입니다.'
      },
      validate: {
        isEmail: {
          msg: '올바르지 않은 이메일 입니다.'
        }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEven: function isEven(value) {
          if (value.length <= 2) {
            throw new Error('이름은 최소 2자 이상 입력해주세요.');
          }
          if (value.length > 10) {
            throw new Error('이름은 최대 10자 이내로 입력해주세요.');
          }
        }
      }
    },
    isAdmin: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      type: DataTypes.TIME,
    },
    updatedAt: {
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      type: DataTypes.TIME,
    }
  }, {
    tableName: 'user',
    timestamps: true
  });
  /*
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Post);
  };

  User.prototype.toJSON = function () {
    var value = Object.assign({}, this.get());
    delete value.password;
    delete value.createdAt;
    delete value.updatedAt;
    return value;
  };
  User.prototype.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.dataValues.password);
  };
  */
  return User;
};
//# sourceMappingURL=User.js.map

export {}