const jwt = require('jsonwebtoken')

async function jwtAuth(userID){
    try{
        const token = jwt.sign({ userID }, 'tokenPassword', {
            expiresIn: 1800 // expira em 30 minutos
        })

        return {auth: true, token: token}
    }catch(err){
        return err
    }
}



module.exports = jwtAuth