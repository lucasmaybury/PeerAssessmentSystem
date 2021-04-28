const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

let db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

let User = require('./models/user.model.js')(sequelize, Sequelize);
let Group = require('./models/group.model.js')(sequelize, Sequelize);
let Assessment = require('./models/assessment.model.js')(sequelize, Sequelize);

User.Product = User.belongsToMany(Group, { through: 'Membership' });
Group.User = Group.belongsToMany(User, { through: 'Membership' });
Assessment.Group = Assessment.hasMany(Group);

module.exports = { db, User, Group, Assessment };
