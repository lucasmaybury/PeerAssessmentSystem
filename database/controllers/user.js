const { User } = require('../services/db');

exports.getUserByUsername = (req, res) => {
  User.findByPk(req.params.username)
    .then(data => {
      if (!data) {
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
  User.findAll({})
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(err.message);
    });
};

exports.createUser = (req, res) => {
  let user = req.body;
  User.create(user)
    .then(data => {
      console.log(data);
      res.status(201).json({ message: 'success' });
    })
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(err.message);
    });
};
