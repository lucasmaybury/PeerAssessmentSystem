const express = require('express');
const router = express.Router();

const group = require('../controllers/group');

/* GET group listing. */
router.route('/:id').get(group.getGroupById);
router
  .route('/')
  .get(group.getGroups)
  .post(group.createGroup);

module.exports = router;
