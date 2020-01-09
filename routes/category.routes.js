const express = require('express');
const router = express.Router();

const { validate } = require('../middleware/validator');
const controller = require('../controllers/category.controller');
const { checkToken } = require('../middleware/jwt');
const { categorySchema } = require('../validators/category');

router.get('/',checkToken, controller.getAll); // get all category
router.get('/:id',checkToken, controller.getById); // get all category
router.post('/',checkToken, validate(categorySchema), controller.create); //create
router.delete('/:id',checkToken, controller.delete); //delete category
router.patch('/:id',checkToken, controller.update); //update category

module.exports = router;
