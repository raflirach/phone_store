const { Product } = require('../models')
const upload = require('../helpers/multer')

class Controller {
    static showList(req,res){
        Product.findAll()
        .then( data => {
            data.map(e => {
                e.price = Product.formatPrice(e.price)
            })
            res.render('products/index', {data})
        })
        .catch(e => res.send(e))
        
    }

    static showFormAdd(req,res){
        let errors
        if(Object.keys(req.query).length > 0) errors = req.query
        res.render('products/add', {errors})
    }

    static add(req,res){
        let input
        upload(req,res, (err,data) => {
            if(err) res.redirect(`/products/add?${err}`)
            else{
                if(!req.file){
                    res.redirect(`/products/add?eImg=Please upload an image`)
                }else{
                    input = {
                        name: req.body.name ? req.body.name : null,
                        price: req.body.price ? +req.body.price : null,
                        stock: req.body.stock ? +req.body.stock : null,
                        desc: req.body.desc ? req.body.desc : null,
                        img: req.file.filename
                    }
                    Product.create(input)
                        .then(_=> res.redirect('/products'))
                        .catch(e=>{
                            let errors = e.errors.map(e => e.message).join('&')
                            res.redirect(`/products/add?${errors}`)
                        })
                }
            }
        })  
    }

    static showFormEdit(req,res){
        let id = req.params.id
        let errors
        if(Object.keys(req.query).length > 0) errors = req.query
        Product.findByPk(id)
        .then( data => res.render('products/edit', {data,errors}))
        .catch(e=>res.send(e))    
    }

    static edit(req,res){
        let input
        upload(req,res, (err,data) => {
            if(err) res.redirect(`/products/edit/${req.params.id}?${err}`)
            else{
                if(!req.file){
                    input = {
                        name: req.body.name ? req.body.name : null,
                        price: req.body.price ? +req.body.price : null,
                        stock: req.body.stock ? +req.body.stock : null,
                        desc: req.body.desc ? req.body.desc : null,    
                    }
                    Product.update(input,{where:{id:req.params.id}})
                    .then(_=> res.redirect('/products'))
                    .catch(e=>{
                            let errors = e.errors.map(e => e.message).join('&')
                            res.redirect(`/products/edit/${req.params.id}?${errors}`)
                        })
                }else{
                    input = {
                        name: req.body.name ? req.body.name : null,
                        price: req.body.price ? +req.body.price : null,
                        stock: req.body.stock ? +req.body.stock : null,
                        desc: req.body.desc ? req.body.desc : null,
                        img: req.file.filename
                    }
                    Product.update(input,{where:{id:req.params.id}})
                    .then(_=> res.redirect('/products'))
                    .catch(e=>{
                            let errors = e.errors.map(e => e.message).join('&')
                            res.redirect(`/products/edit/${req.params.id}?${errors}`)
                        })
                }
            }
        })  
    }

    static showOne(req,res){
        let id = req.params.id
        Product.findByPk(id)
        .then( data => res.render('detail', {data}))
        .catch(e=>res.send(e))
    }

    static delete(req,res){
        let id = req.params.id
        Product.destroy({where:{id}})
        .then( _=> res.redirect('/products'))
        .catch(e => res.send(e))
    }
}

module.exports = Controller