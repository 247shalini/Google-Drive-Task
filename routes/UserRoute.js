const express = require('express');
const router = express.Router();
const { UserModel } = require("../models");
const { UserController } = require('../controllers')
const { Validations } = require("../middlewares");
const uploadImage = require("../middlewares/multer");
const { UserValidations } = require("../validations");

router.get('/', UserController.home)
router.post(
    '/',
    UserValidations.SignupValidations,
    Validations.handleValidationErrors,
    UserController.register
)
router.post('/login', UserController.login)
router.put('/:id', UserController.update)
router.delete('/', UserController.destroy)

module.exports = router