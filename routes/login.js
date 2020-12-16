const Controller = require('../controllers/loginController')

const router = require('express').Router()

router.route('/login')
    .get(Controller.showFormLogin)
    .post(Controller.login)

router.route('/logout')
    .get(Controller.logout)

module.exports = router