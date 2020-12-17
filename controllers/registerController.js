const { Account, Customer } = require('../models');

class Controller {
    static showFormRegister(req,res){
        let errors
        if(Object.keys(req.query).length > 0) errors = req.query
        res.render('register',{errors})
    }

    static register(req,res){
        const input = {
            first_name : req.body.first_name ? req.body.first_name : null,
            last_name : req.body.last_name ? req.body.last_name : null,
            phone_number : req.body.phone_number ? req.body.phone_number : null,
            address : req.body.address ? req.body.address : null,
            username : req.body.username ? req.body.username : null,
            password : req.body.password ? req.body.password : null,
        }
        Customer.create(input)
        .then( data => {
            console.log(data);
            return Account.create({
                username: input.username,
                password: input.password,
                role : 'customer',
                CustomerId: data.id
            })
        })
        .then( _=> res.redirect('/login'))
        .catch(e=>{
            let errors = e.errors.map(e => e.message).join('&')
            res.redirect(`/register?${errors}`)
        })
    }
}

module.exports = Controller