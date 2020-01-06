const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');
const { checkToken } = require('../middleware/jwt');

router.get('/', controller.getAll); // get all category
router.post('/', checkToken, controller.create); //create
router.delete('/:id', checkToken, controller.delete); //delete category
router.patch('/:id', controller.update); //update category

module.exports = router;
