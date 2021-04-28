const express = require('express');
const router = express.Router();

const controller = require('../controllers/response');

/* GET group listing. */
router.route('/:id').get(controller.getById);
router
  .route('/')
  .get(controller.getAll)
  .post(controller.create)
  .delete(controller.delete);

module.exports = router;
