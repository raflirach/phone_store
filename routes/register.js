const Controller = require('../controllers/registerController')

const router = require('express').Router()

router.route('/')
    .get(Controller.showFormRegister)
    .post(Controller.register)

module.exports = router