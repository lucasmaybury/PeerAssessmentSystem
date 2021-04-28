const { db, User, Group, Assessment, Response } = require('./db');

exports.seed = () => {
  db.sequelize
    .sync({ force: true })
    .then(() =>
      User.bulkCreate([
        { id: 'user1', firstName: 'Bobby', lastName: 'Bobson', role: 1 },
        { id: 'user2', firstName: 'Andy', lastName: 'Anderson', role: 1 },
        { id: 'user3', firstName: 'Charlie', lastName: 'Chaplain', role: 1 },
        { id: 'user4', firstName: 'Danny', lastName: 'Donson', role: 1 },
      ]).catch(err => console.error(err))
    )
    .then(() =>
      Group.bulkCreate(
        [
          { name: 'Team B', users: [] },
          { name: 'Doods', users: [] },
        ],
        { include: User }
      ).catch(err => console.error(err))
    )
    .then(() =>
      Group.bulkCreate(
        [
          {
            name: 'Group 1',
            users: [
              { id: 'acc17lm', firstName: 'Lucas', lastName: 'Maybury', role: 1 },
              { id: 'psy16fr', firstName: 'Fae', lastName: 'Rathmell', role: 1 },
            ],
          },
          {
            name: 'Team 2',
            users: [
              { id: 'got0p', firstName: 'Alfie', lastName: 'Allen', role: 1 },
              { id: 'bob420', firstName: 'Bob', lastName: 'Marley', role: 1 },
            ],
          },
        ],
        { include: User }
      ).catch(err => console.error(err))
    )
    .then(() =>
      Assessment.bulkCreate(
        [
          {
            id: 10,
            name: 'COM1234 Assignment',
            groups: [
              {
                name: 'Group C',
                users: [
                  { id: '1', firstName: 'Anne', lastName: 'McCaffrey', role: 1 },
                  { id: '2', firstName: 'George RR', lastName: 'Martin', role: 1 },
                ],
              },
              {
                name: 'Group D',
                users: [
                  { id: '3', firstName: 'Brandon', lastName: 'Sanderson', role: 1 },
                  { id: '4', firstName: 'Aldous', lastName: 'Huxley', role: 1 },
                ],
              },
            ],
          },
        ],
        {
          include: [
            {
              association: Assessment.Group,
              include: Group.User,
            },
          ],
        }
      ).catch(err => console.error(err))
    )
    .then(() =>
      Response.bulkCreate([
        {
          userId: '1',
          recipientId: '2',
          assessmentId: 10,
          score: 5,
        },
      ]).catch(err => console.error(err))
    );
};
