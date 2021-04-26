const { User } = require('../services/db');
const helper = require('./helper');

exports.getById = async (req, res) => {
  User.findByPk(req.params.id)
    .then(data => {
      if (!data) {
        res.status(404).send('Not Found');
      } else {
        res.json(data);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(helper.getSQLErrorMessage(err.original));
    });
};

exports.getAll = async (req, res) => {
  User.findAll({})
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(helper.getSQLErrorMessage(err.original));
    });
};

exports.create = async (req, res) => {
  User.create(req.body)
    .then(data => {
      console.log(data);
      res.status(201).json({ message: 'created' });
    })
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(helper.getSQLErrorMessage(err.original));
    });
};

exports.update = async (req, res) => {
  let user = req.body;
  User.findByPk(user['id'])
    .then(userActual => {
      userActual.firstName = user['firstName'];
      userActual.lastName = user['lastName'];
      userActual.role = user['role'];
      userActual.save();
    })
    .then(() => res.status(201).json({ message: 'updated' }))
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(helper.getSQLErrorMessage(err.original));
    });
};

exports.delete = async (req, res) => {
  let user = req.body;
  User.findByPk(user['id'])
    .then(userActual => userActual.destroy())
    .then(() => res.status(201).json({ message: 'deleted' }))
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(helper.getSQLErrorMessage(err.original));
    });
};
