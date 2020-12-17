const { Customer } = require('../models')

class Controller {
    static showList(req,res){
        Customer.findAll()
        .then(data => res.render('customers/index', {data}))
        .catch(e=>res.send(e))  
    }
}

module.exports = Controller