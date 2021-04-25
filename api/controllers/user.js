const fetch = require('node-fetch');
const helper = require('./helper.js');

exports.getUserByUsername = (req, res) => {
  fetch(`http://localhost:3081/user/${req.params.username}`, {
    method: 'GET',
  })
    .then(helper.checkStatus)
    .then(data => res.send(data[0]))
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(err.message);
    });
};

exports.getUsers = (req, res) => {
  fetch('http://localhost:3081/user', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(helper.checkStatus)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(err.message);
    });
};

exports.createUser = (req, res) => {
  console.log('creating user:');
  console.log(req.body);
  fetch('http://localhost:3081/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'user-agent': 'localhost:3080',
    },
    body: JSON.stringify(req.body),
  })
    .then(helper.checkStatus)
    .then(response => res.status(201).json({ message: response.message }))
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(err.message);
    });
};
