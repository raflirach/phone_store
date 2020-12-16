const compare = require('../helpers/compare');
const { Account } = require('../models');

class Controller {
    static showFormLogin(req,res){
        if(req.session.account) res.redirect('/')
        else res.render('login')
    }

    static login(req,res){
        const { username, password } = req.body
        Account.findOne({where:{username}})
        .then( data => {
            if(data && compare(password, data.password)){
                req.session.account = data
                if(data.role === 'admin') res.redirect('/products')
                else res.redirect('/')
            } else {
                res.redirect('/login?err=username/password salah')
            }
        })
        .catch(e => res.redirect(`/login?${e}`))
    }

    static logout(req,res){
        delete req.session.account
        res.redirect('/')
    }
}

module.exports = Controller