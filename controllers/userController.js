const { Product, Order, OrderProduct } = require('../models')
const { Op } = require("sequelize");


class Controller {
    static showList(req,res){
        Product.findAll({
            where:{
                stock: {
                    [Op.gt]:0
                }
            }
        })
        .then( data => {
            data.map(e => e.price = Product.formatPrice(e.price))
            res.render('home', {data})
        })
        .catch(e => res.send(e))
    }

    static addToCart(req,res){
        let input = {
            CustomerId: req.session.account.CustomerId,
            order_date: "",
            status: "",
        }
        let ProductId = req.params.id
        Order.create(input)
        .then(data => {
            return OrderProduct.create({
                quantity: 1,
                OrderId: data.id,
                ProductId
            })
        })
        .then( _=> res.redirect('/order/cart'))
        .catch(e=>res.send(e))
    }

    static showCartList(req,res){
        let errors
        if(Object.keys(req.query).length > 0) errors = req.query
        Order.findAll({
            where:{
                [Op.and] : [{CustomerId:req.session.account.CustomerId},{status: 'Belum Bayar'}]
            },
            include: Product
        })
        .then(data=> {
            data.map(e => {
                e.Products[0].price = Product.formatPrice(e.Products[0].price)
            })
            res.render("cart", {data, errors})
        })
        .catch(e => res.send(e))
    }

    static buy(req,res){
        const { OrderId, ProductId } = req.params
        Order.update({status: 'Lunas'},{where:{id:OrderId}})
        .then( _=> {
            return Product.findOne({where:{id:ProductId}})
        })
        .then(data => {
            return Product.update({stock:data.stock-1},{where:{id:ProductId}})
        })
        .then( _=> res.redirect('/order/cart'))
        .catch(e=>res.redirect('/order/cart?err=stock habis'))
    }

    static delete(req,res){
        const { id } = req.params
        Order.destroy({where:{id}})
        .then( _=> res.redirect('/order/cart'))
        .catch(e => res.send(e))
    }
}

module.exports = Controller