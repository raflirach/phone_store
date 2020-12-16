const auth = (req, res, next) => {
    if(req.session.account){
        next()
    }else{
        res.redirect('/login')
    }
}

module.exports = auth