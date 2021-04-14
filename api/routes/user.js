const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

/* GET users listing. */
router.route('/:username').get(user.getUserByUsername);
router.route('/').get(user.getUsers);

module.exports = router;
