const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validator');
const controller = require('../controllers/article.controller');
const { checkToken } = require('../middleware/jwt');
const { articleSchema } = require('../validators/article');

router.get('/', checkToken, controller.getAll); //get all articles
router.get('/:id', checkToken, controller.getById); //get article by id
router.post('/', checkToken, validate(articleSchema), controller.create); //create article
router.delete('/:id', checkToken, controller.delete); // delete article
router.put('/:id', checkToken, controller.update); //update article
