const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

const hasPassword = (password) => {
    return bcrypt.hashSync(password, salt)
}

module.exports = hasPassword