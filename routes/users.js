const Controller = require('../controllers/userController')

const router = require('express').Router()

router.get('/cart',Controller.showCartList)

router.get('/delete/:id', Controller.delete)

router.get('/buy/:OrderId/:ProductId', Controller.buy)

router.route('/:id')
    .get(Controller.addToCart)


module.exports = router