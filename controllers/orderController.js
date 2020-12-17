const { Order, Customer , Product } = require('../models')

class Controller {
    static showList(req,res){
        Order.findAll({include:[Customer,Product]})
        .then(data => res.render('orders/index',{data}))
        .catch(e=>res.send(e))
    }

    static showOne(req,res){
        const { CustomerId } = req.params
        Order.findAll({
            where: { CustomerId },
            include:[Customer,Product]
        })
        .then(data => res.render('orders/showOne',{data}))
        .catch(e=>res.send(e))
    }
}

module.exports = Controller