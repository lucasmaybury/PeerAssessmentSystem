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
let Response = require('./models/response.model.js')(sequelize, Sequelize);

// Many Users have many Groups
User.Group = User.belongsToMany(Group, { through: 'Membership' });
Group.User = Group.belongsToMany(User, { through: 'Membership' });

// Assessments have many Groups
Assessment.Group = Assessment.hasMany(Group);
Group.Assessment = Group.belongsTo(Assessment);

// Users have many Responses
User.Response = User.hasMany(Response);
Response.User = Response.belongsTo(User, { as: 'user', foreignKey: 'userId' });
Response.Recipient = Response.belongsTo(User, { as: 'recipient', foreignKey: 'recipientId' });

// Groups have many Responses
Group.Response = Group.hasMany(Response);
Response.Group = Response.belongsTo(Group);

module.exports = { db, User, Group, Assessment, Response };
