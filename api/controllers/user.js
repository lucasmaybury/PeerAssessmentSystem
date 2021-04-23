const fetch = require('node-fetch');

exports.getUserByUsername = (req, res) => {
  fetch(`http://localhost:3081/user/${req.params.username}`, {
    method: 'GET',
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
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.send(err);
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
    .then(response => response.json())
    .then(response => {
      if (response.status != 201) throw new Error(response.message);
      res.status(201).json({ message: response.message });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};
