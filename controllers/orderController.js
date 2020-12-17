const { Order, Customer , Product } = require('../models')

class Controller {
    static showList(req,res){
        Order.findAll({include:[Customer,Product]})
        .then(data => res.render('orders/index',{data}))
        .catch(e=>res.send(e))
    }

    static showOne(req,res){
        
    }
}

module.exports = Controller