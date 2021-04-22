const db = require('../services/db');

exports.getUserByUsername = (req, res) => {
  getUsersFiltered({ id: req.params.username })
    .then(data => res.json(data))
    .catch(err => {
      console.error(err);
      res.send(err);
    });
};

exports.getUsers = (req, res) => {
  getUsersFiltered({})
    .then(data => res.json(data))
    .catch(err => {
      console.error(err);
      res.send(err);
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
      .then(data => {
        console.log(data);
        resolve(data);
      })
      .catch(err => reject(err));
  });
}
