const express = require('express');
const router = express.Router();

const user = require('../controllers/user');

/* GET user listing. */
router.route('/:username').get(user.getUserByUsername);

module.exports = router;
