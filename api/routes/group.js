const express = require('express');
const router = express.Router();
const group = require('../controllers/group');

/* GET groups listing. */
router.route('/:id').get(group.getById);
router
  .route('/')
  .get(group.getAll)
  .post(group.create)
  .put(group.update)
  .delete(group.delete);

module.exports = router;
