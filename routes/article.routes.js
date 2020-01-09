const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validator');
const controller = require('../controllers/article.controller');
const { checkToken } = require('../middleware/jwt');
const { articleSchema } = require('../validators/article');
// const upload = require('../middleware/upload');


router.get('/', controller.getAll); //get all articles
router.get('/:id', controller.getById); //get article by id
router.post('/', validate(articleSchema), controller.create); //create article
router.delete('/:id', controller.delete); // delete article
router.put('/:id', controller.update); //update article

module.exports = router;
