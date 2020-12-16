const multer = require('multer')
const path = require('path')

//set storage
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

//upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1e6 },
    fileFilter: function(req, file, cb){
        checkFileType(file,cb)
    }
}).single('img');

function checkFileType(file, cb){
    const filesType = /jpeg|jpg|png/;

    const extname = filesType.test(path.extname(file.originalname).toLowerCase())

    const mimetype = filesType.test(file.mimetype)

    if(mimetype && extname){
        return cb(null, true)
    }else{
        cb('Error : Image Only')
    }
}

module.exports = upload