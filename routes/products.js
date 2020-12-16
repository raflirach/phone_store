const Controller = require('../controllers/productController')

const router = require('express').Router()

router.route('/')
    .get(Controller.showList)

router.route('/edit/:id')
            .get(Controller.showFormEdit)
            .post(Controller.edit)

router.route('/add')
        .get(Controller.showFormAdd)
        .post(Controller.add)


router.route('/delete/:id')
            .get(Controller.delete)

router.route('/:id')
    .get(Controller.showOne)


module.exports = router