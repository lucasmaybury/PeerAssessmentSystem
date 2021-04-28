const { Op } = require('sequelize');
const { User, Group, Assessment } = require('../services/db');
const helper = require('./helper');

exports.getById = async (req, res) => {
  Assessment.findByPk(req.params.id, {
    include: [
      {
        association: Assessment.Group,
        include: Group.User,
      },
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
  Assessment.findAll({
    include: [
      {
        association: Assessment.Group,
        include: Group.User,
      },
    ],
  })
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(helper.getSQLErrorMessage(err.original));
    });
};

exports.create = async (req, res) => {
  let assessment = req.body;
  let ids = assessment['groups'].map(group => group.id);
  let newGroups = await Group.findAll({ where: { id: { [Op.in]: ids } } });
  Assessment.create(req.body)
    .then(assessmentActual => assessmentActual.setGroups(newGroups))
    .then(res.status(201).json({ message: 'created' }))
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(helper.getSQLErrorMessage(err.original));
    });
};

exports.update = async (req, res) => {
  let assessment = req.body;
  let ids = assessment['groups'].map(group => group.id);
  let newGroups = await Group.findAll({ where: { id: { [Op.in]: ids } } });
  Assessment.findByPk(assessment['id'])
    .then(assessmentActual => assessmentActual.update({ name: assessment['name'] }))
    .then(assessmentActual => assessmentActual.setGroups(newGroups))
    .then(() => res.status(201).json({ message: 'updated' }))
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(helper.getSQLErrorMessage(err.original));
    });
};

exports.delete = async (req, res) => {
  let assessment = req.body;
  Assessment.findByPk(assessment['id'])
    .then(assessmentActual => assessmentActual.destroy())
    .then(() => res.status(201).json({ message: 'deleted' }))
    .catch(err => {
      console.error(err);
      res.status(err.status || 500).send(helper.getSQLErrorMessage(err.original));
    });
};
