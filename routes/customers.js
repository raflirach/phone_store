const Controller = require('../controllers/customerController')

const router = require('express').Router()

router.route('/')
    .get(Controller.showList)


module.exports = router