const fetch = require('node-fetch');
const helper = require('./helper.js');
const groupController = require('./group.js');

exports.getById = (req, res) => {
  console.log('getting response: ' + req.params.id);
  fetch(`http://localhost:3081/response/${req.params.id}`, {
    method: 'GET',
  })
    .then(helper.checkStatus)
    .then(data => res.send(data))
    .catch(err => res.status(err.status || 500).send(err.message));
};

exports.getAll = (req, res) => {
  console.log('getting responses');
  fetch('http://localhost:3081/response', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(helper.checkStatus)
    .then(data => res.send(data))
    .catch(err => res.status(err.status || 500).send(err.message));
};

exports.respond = async (req, res) => {
  let requests = [];
  req.body.scores.forEach(scoring => {
    requests.push(
      create({
        userId: req.body.userId,
        recipientId: scoring.recipientId,
        groupId: req.body.groupId,
        score: scoring.score,
      })
    );
  });
  Promise.all(requests)
    .then(response => res.status(201).json({ message: response.message }))
    .catch(err => res.status(err.status || 500).send(err.message));
};

let create = function(score) {
  return new Promise((resolve, reject) => {
    console.log('creating response:');
    console.log(score);
    fetch('http://localhost:3081/response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-agent': 'localhost:3080',
      },
      body: JSON.stringify(score),
    })
      .then(helper.checkStatus)
      .then(resolve)
      .catch(reject);
  });
};

exports.delete = (req, res) => {
  console.log('deleting response:');
  console.log(req.body);
  fetch('http://localhost:3081/response', {
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
