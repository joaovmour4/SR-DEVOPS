const bcrypt = require('bcrypt')

async function passwordCompare(plainPassword, hashPassword){
    if(hashPassword){
        compare = bcrypt.compare(plainPassword, hashPassword)
        return compare
    }else
        return false
}

module.exports = passwordCompare