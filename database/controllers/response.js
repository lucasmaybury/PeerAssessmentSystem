const { Op } = require('sequelize');
const { User, Group, Assessment, Response } = require('../services/db');
const helper = require('./helper');

exports.getById = async (req, res) => {
  Response.findByPk(req.params.id, {
    include: [
      { association: Response.User },
      { association: Response.Recipient },
      { model: Group, include: [Assessment] },
    ],
  })
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
  Response.findAll({
    include: [
      { association: Response.User },
      { association: Response.Recipient },
      { model: Group, include: [Assessment] },
    ],
  })
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(helper.getSQLErrorMessage(err.original));
    });
};

exports.create = async (req, res) => {
  Response.create(req.body)
    .then(data => {
      console.log(data);
      res.status(201).json({ message: 'created' });
    })
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
