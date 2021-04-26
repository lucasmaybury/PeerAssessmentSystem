const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING(45),
      field: 'first_name',
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(45),
      field: 'last_name',
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER(),
      field: 'role',
      allowNull: false,
    },
  });

  return User;
};
