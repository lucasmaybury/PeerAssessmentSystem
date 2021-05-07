const { Op } = require('sequelize');
const { Group, User, Assessment, Response } = require('../services/db');
const helper = require('./helper');

exports.getById = async (req, res) => {
  Group.findByPk(req.params.id, { include: [User, Assessment, Response] })
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
  Group.findAll({ include: [User, Assessment] })
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(helper.getSQLErrorMessage(err.original));
    });
};

async function getUserModels(group) {
  let ids = group['users'].map(user => user.id);
  let newUsers = await User.findAll({ where: { id: { [Op.in]: ids } } });
  return newUsers;
}

exports.create = async (req, res) => {
  let users = await getUserModels(req.body);
  if (!req.body.grade) delete req.body.grade;
  Group.create(req.body)
    .then(groupActual => groupActual.setUsers(users))
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
  let group = req.body;
  let newUsers = await getUserModels(req.body);
  console.log(newUsers);
  Group.findByPk(group['id'], { include: [{ model: User }] })
    .then(groupActual => {
      groupActual.update({
        name: group['name'],
        grade: group['grade'],
      });
      groupActual.save();
      groupActual.setUsers(newUsers);
    })
    .then(() => res.status(201).json({ message: 'updated' }))
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(helper.getSQLErrorMessage(err.original));
    });
};

exports.delete = async (req, res) => {
  let group = req.body;
  Group.findByPk(group['id'])
    .then(groupActual => groupActual.destroy())
    .then(() => res.status(201).json({ message: 'deleted' }))
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(helper.getSQLErrorMessage(err.original));
    });
};
