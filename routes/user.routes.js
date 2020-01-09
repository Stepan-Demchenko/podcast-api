const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validator');
const controller = require('../controllers/user.controller');
const { checkToken } = require('../middleware/jwt');
const { userSchema } = require('../validators/user');

router.get('/', checkToken, controller.getAll); //get all users
router.get('/:id',checkToken, controller.getById); // get user
router.post('/',checkToken, validate(userSchema), controller.create); //create user
router.delete('/:id',checkToken, controller.delete); //delete user
router.put('/:id',checkToken, validate(userSchema), controller.update); // update user
module.exports = router;
