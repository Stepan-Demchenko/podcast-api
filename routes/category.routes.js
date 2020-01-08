const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validator');
const controller = require('../controllers/category.controller');
const { checkToken } = require('../middleware/jwt');
const { categorySchema } = require('../validators/category');

router.get('/', controller.getAll); // get all category
router.post('/', validate(categorySchema), checkToken, controller.create); //create
router.delete('/:id', checkToken, controller.delete); //delete category
router.patch('/:id', controller.update); //update category

module.exports = router;
