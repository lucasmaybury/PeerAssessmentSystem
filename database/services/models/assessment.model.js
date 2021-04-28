const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Assessment = sequelize.define('assessment', {
    name: {
      type: DataTypes.STRING(45),
      field: 'name',
      allowNull: false,
    },
  });

  return Assessment;
};
