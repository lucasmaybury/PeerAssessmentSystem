const { User, Group } = require('../services/db');
const helper = require('./helper');

exports.getGroupById = (req, res) => {
  Group.findByPk(req.params.username, { include: User })
    .then(data => {
      if (data.length === 0) {
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

exports.getGroups = (req, res) => {
  Group.findAll({ include: User })
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(helper.getSQLErrorMessage(err.original));
    });
};

exports.createGroup = (req, res) => {
  let user = req.body;
  Group.create(user)
    .then(data => {
      console.log(data);
      res.status(201).json({ message: 'success' });
    })
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(helper.getSQLErrorMessage(err.original));
    });
};
