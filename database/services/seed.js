const { db, User, Group, Assessment, Response } = require('./db');

exports.seed = () => {
  db.sequelize
    .sync({ force: true })
    .then(() =>
      Assessment.bulkCreate(
        [
          {
            id: 10,
            name: 'COM1234 Assignment',
            groups: [
              {
                id: 1,
                name: 'Group A',
                users: [
                  { id: '1', firstName: 'Anne', lastName: 'McCaffrey', role: 1 },
                  { id: '2', firstName: 'George RR', lastName: 'Martin', role: 1 },
                  { id: '3', firstName: 'Brandon', lastName: 'Sanderson', role: 1 },
                  { id: '4', firstName: 'Aldous', lastName: 'Huxley', role: 1 },
                  { id: '5', firstName: 'Robit', lastName: 'Hobb', role: 1 },
                ],
              },
              {
                id: 2,
                name: 'Group B',
                users: [
                  { id: 'user5', firstName: 'Emily', lastName: 'Emmerson', role: 1 },
                  { id: 'user6', firstName: 'Franky', lastName: 'Foxley', role: 1 },
                ],
              },
              { name: 'Group C', users: [] },
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
        },
      ).catch(err => console.error(err)),
    )
    .then(() => Response.bulkCreate([
      { userId: 'user5', recipientId: 'user5', score: 2, groupId: 2 },
      { userId: 'user5', recipientId: 'user6', score: 4, groupId: 2 },
      { userId: 'user6', recipientId: 'user5', score: 8, groupId: 2 },
      { userId: 'user6', recipientId: 'user6', score: 5, groupId: 2 },
    ]))
    .then(() =>
      User.bulkCreate([
        { id: 'user1', firstName: 'Andy', lastName: 'Anderson', role: 1 },
        { id: 'user2', firstName: 'Bobby', lastName: 'Bobson', role: 1 },
        { id: 'user3', firstName: 'Charlie', lastName: 'Chaplain', role: 1 },
        { id: 'user4', firstName: 'Danny', lastName: 'Donson', role: 1 },
      ]).catch(err => console.error(err)),
    );
};
