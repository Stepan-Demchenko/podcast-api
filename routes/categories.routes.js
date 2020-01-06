const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');
const checkToken = require('../middleware/jwt');

router.get('/categories', controller.getAll); // get all category
router.post('/categories', checkToken, controller.addCategory); //create
router.delete('/categories'); //delete category
router.patch('/categories'); //update category

module.exports = router;
