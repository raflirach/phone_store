const router = require('express').Router()
const products = require('./products')
const login = require('./login')
const register = require('./register')
const users = require('./users')
const auth = require('../middlewares/auth')
const Controller = require('../controllers/userController')


router.use('/' , login)
router.use('/register', register)

router.use(auth)

router.get('/', Controller.showList)
router.use('/order', users)
router.use('/products' , products)

module.exports = router