const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

/* GET users listing. */
router.route('/:id').get(user.getById);
router
  .route('/')
  .get(user.getAll)
  .post(user.create)
  .put(user.update)
  .delete(user.delete);

module.exports = router;
