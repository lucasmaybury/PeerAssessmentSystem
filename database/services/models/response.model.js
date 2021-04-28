const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Response = sequelize.define('response', {
    score: {
      type: DataTypes.INTEGER,
      field: 'score',
      allowNull: false,
    },
  });

  return Response;
};
