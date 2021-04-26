const { db, User, Group } = require('./db');

exports.seed = () => {
  db.sequelize.sync({ force: true }).then(() =>
    Group.bulkCreate(
      [
        {
          name: 'Group1',
          users: [
            { id: 'acc17lm', firstName: 'Lucas', lastName: 'Maybury', role: 1 },
            { id: 'psy16fr', firstName: 'Fae', lastName: 'Rathmell', role: 1 },
          ],
        },
        {
          name: 'Team2',
          users: [
            { id: 'got0p', firstName: 'Alfie', lastName: 'Allen', role: 1 },
            { id: 'bob420', firstName: 'Bob', lastName: 'Marley', role: 1 },
          ],
        },
      ],
      { include: User }
    ).catch(err => console.error(err))
  );
};
