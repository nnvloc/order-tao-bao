'use strict';

import bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;
const hashPassword = (pwd) => {
  return new Promise((resolve, reject) => {
    if (!pwd) return resolve(null);
    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
      if (err) return reject(err);
      bcrypt.hash(pwd, salt, (err, hash) => {
        if (err) return reject(err);
        return resolve(hash);
      });
    });
  });
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {});

  // Associations
  User.associate = function(models) {
    // associations can be defined here
    this.hasMany(models['Token'], { foreignKey: 'userId', sourceKey: 'id' });
  };

  // Instance methods
  User.prototype.isValidPassword = function(pwd) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(pwd, this.password, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  // Hook functions
  User.beforeCreate((instance, options) => {
    return hashPassword(instance.password).then(hashedPwd => {
      if(hashedPwd) {
        instance.password = hashedPwd;
      }
      return instance;
    });
  });

  User.beforeUpdate((instance, options) => {
    const changed = instance._changed;
    if(!changed.password) {
      return instance;
    }
    
    return hashPassword(instance.password).then(hashedPwd => {
      if(hashedPwd) {
        instance.password = hashedPwd;
      }
      return instance;
    });
  });

  return User;
};
