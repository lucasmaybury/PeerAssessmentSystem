const express = require('express');
const router = express.Router();

const user = require('../controllers/user');

/* GET user listing. */
router.route('/:username').get(user.getUserByUsername);
router
  .route('/')
  .get(user.getUsers)
  .post(user.createUser);

module.exports = router;
