const db = require('../services/db');

exports.getUserByUsername = (req, res) => {
  const user = {
    username: 'user1',
    firstName: 'Lucas',
    lastName: 'Maybury',
    role: '2',
  };
  res.json(user);
};

exports.getUsers = (req, res) => {
  db.query(`SELECT * FROM user`)
    .then(data => res.json(data))
    .catch(err => {
      console.error(err);
      res.send(err);
    });
};
