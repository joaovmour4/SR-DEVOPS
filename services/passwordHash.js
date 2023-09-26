const bcrypt = require('bcrypt')

function passwordHash(password){
    const hash = bcrypt.hash(password.toString(), 10)
    return hash
}

module.exports = passwordHash