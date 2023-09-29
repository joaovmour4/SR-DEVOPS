const bcrypt = require('bcrypt')

async function passwordHash(password){
    hash = bcrypt.hash(password, 10)

    return hash
}

module.exports = passwordHash