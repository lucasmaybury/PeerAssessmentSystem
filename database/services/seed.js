const { db, User, Group } = require('./db');

exports.seed = () => {
  db.sequelize
    .sync({ force: true })
    .then(() => {
      let group = { id: 2, name: 'groupA', Membership: { selfGranted: true } };
      User.bulkCreate(
        [
          { firstName: 'Lucas', lastName: 'Maybury', role: 1, groups: [group] },
          { firstName: 'Fae', lastName: 'Rathmell', role: 1, groups: [group] },
        ],
        { include: Group }
      );
    })
    .then(() =>
      Group.bulkCreate(
        [
          {
            name: 'Group1',
            users: [
              { firstName: 'Alfie', lastName: 'Allen', role: 1, Membership: { selfGranted: true } },
              { firstName: 'Bob', lastName: 'Marley', role: 1, Membership: { selfGranted: true } },
            ],
          },
        ],
        { include: User }
      )
    );
};
