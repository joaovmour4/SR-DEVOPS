const bcrypt = require('bcrypt')

async function passwordCompare(plainPassword, hashPassword){
    bcrypt.compare(plainPassword, hashPassword, (err, res)=>{
        if(err)
            throw new Error(err)

        return res
    })
}

module.exports = passwordCompare