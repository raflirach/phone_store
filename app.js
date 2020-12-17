const express = require('express')

const router = require('./routes')
const app = express()
const PORT = process.env.PORT || 4000

const session = require('express-session')


app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'phonestore',
    resave: false,
    saveUninitialized: true
}))

app.use('/',router)

app.listen(PORT, ()=> {
    console.log(`This app listen in port: http://localhost:${PORT}`);
})