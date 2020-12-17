const Controller = require('../controllers/orderController')

const router = require('express').Router()

router.route('/')
    .get(Controller.showList)

router.route('/CustomerId')
    .get(Controller.showOne)


module.exports = router