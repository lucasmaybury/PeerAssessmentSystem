const fetch = require('node-fetch');

exports.getUserByUsername = (req, res) => {
  fetch(`http://localhost:3081/user/${req.params.username}`, {
    method: 'get',
  })
    .then(response => response.json())
    .then(data => res.send(data))
    .catch(err => {
      console.log(err);
      res.send(err);
    });
};

exports.getUsers = (req, res) => {
  fetch('http://localhost:3081/user', {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .then(data => res.send(data))
    .catch(err => {
      console.log(err);
      res.send(err);
    });
};
