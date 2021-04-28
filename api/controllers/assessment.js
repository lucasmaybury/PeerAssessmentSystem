const fetch = require('node-fetch');
const helper = require('./helper.js');

exports.getById = (req, res) => {
  console.log('getting assessment: ' + req.params.id);
  fetch(`http://localhost:3081/assessment/${req.params.id}`, {
    method: 'GET',
  })
    .then(helper.checkStatus)
    .then(data => res.send(data))
    .catch(err => res.status(err.status || 500).send(err.message));
};

exports.getAll = (req, res) => {
  console.log('getting assessments');
  fetch('http://localhost:3081/assessment', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(helper.checkStatus)
    .then(data => res.send(data))
    .catch(err => res.status(err.status || 500).send(err.message));
};

exports.create = (req, res) => {
  console.log('creating assessment:');
  console.log(req.body);
  fetch('http://localhost:3081/assessment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'user-agent': 'localhost:3080',
    },
    body: JSON.stringify(req.body),
  })
    .then(helper.checkStatus)
    .then(response => res.status(201).json({ message: response.message }))
    .catch(err => res.status(err.status || 500).send(err.message));
};

exports.update = (req, res) => {
  console.log('updating assessment:');
  console.log(req.body);
  fetch('http://localhost:3081/assessment', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'user-agent': 'localhost:3080',
    },
    body: JSON.stringify(req.body),
  })
    .then(helper.checkStatus)
    .then(response => res.status(201).json({ message: response.message }))
    .catch(err => res.status(err.status || 500).send(err.message));
};

exports.delete = (req, res) => {
  console.log('deleting assessment:');
  console.log(req.body);
  fetch('http://localhost:3081/assessment', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'user-agent': 'localhost:3080',
    },
    body: JSON.stringify(req.body),
  })
    .then(helper.checkStatus)
    .then(response => res.status(201).json({ message: response.message }))
    .catch(err => res.status(err.status || 500).send(err.message));
};
