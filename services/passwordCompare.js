const bcrypt = require('bcrypt')

function passwordCompare(plainPassword, hashPassword){
    return bcrypt.compare(plainPassword, hashPassword, (err, res)=>{
        if (err) return err;
        if (!res) return null;

        return true
    })
}

module.exports = passwordCompare