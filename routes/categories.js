const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.get('/category'); // get all category
router.post('/category'); //create
router.delete('/category'); //delete category
router.patch('/category'); //update category

module.exports = router;
