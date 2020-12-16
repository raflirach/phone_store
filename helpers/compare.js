const bcrypt = require('bcryptjs')

const compare = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = compare
