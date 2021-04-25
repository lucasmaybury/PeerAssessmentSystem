const db = require('../services/db');
const helper = require('./helper.js');

exports.getUserByUsername = (req, res) => {
  getUsersFiltered({ id: req.params.username })
    .then(data => {
      if (data.length == 0) {
        res.status(404).send('Not Found');
      } else {
        res.json(data);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(err.message);
    });
};

exports.getUsers = (req, res) => {
  getUsersFiltered({})
    .then(data => res.json(data))
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(err.message);
    });
};

function getUsersFiltered(filters) {
  return new Promise(function(resolve, reject) {
    let whereClauses = '';
    for (const [key, value] of Object.entries(filters)) {
      whereClauses += `${key}='${value}'`;
    }
    let query = `SELECT * FROM user ${whereClauses != '' ? 'WHERE ' + whereClauses : ''}`;
    console.log(query);
    db.query(query)
      .then(data => resolve(data))
      .catch(err => reject(helper.handleSQLError(err)));
  });
}

exports.createUser = (req, res) => {
  let user = req.body;
  console.log('creating user:');
  console.log(user);
  let query = `INSERT INTO user VALUES ('${user.id}', '${user.firstName}', '${user.lastName}', '${user.role}')`;
  console.log(query);
  db.query(query)
    .then(data => {
      console.log(data);
      res.status(201).json({ message: 'success' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(helper.getSQLErrorMessage(err));
    });
};
