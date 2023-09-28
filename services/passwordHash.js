const bcrypt = require('bcrypt')

async function passwordHash(password){
    bcrypt.hash(password.toString(), 10, (err, hash)=>{
        if(err){
            throw new Error(err)
        }
        return hash
    })
}

module.exports = passwordHash