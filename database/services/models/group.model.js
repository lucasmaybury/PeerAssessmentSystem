const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Group = sequelize.define('group', {
    name: {
      type: DataTypes.STRING(45),
      field: 'name',
      allowNull: false,
    },
    grade: {
      type: DataTypes.DOUBLE,
      field: 'grade',
      allowNull: true,
    },
  });

  return Group;
};
