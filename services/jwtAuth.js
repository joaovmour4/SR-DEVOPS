const jwt = require('jsonwebtoken')

async function jwtAuth(user){
    try{
        const {_id, userCargo, userSubsidio} = user
        const token = jwt.sign({ _id, userCargo, userSubsidio}, 'tokenPassword', {
            expiresIn: 1800 // expira em 30 minutos
        })

        return {auth: true, token: token}
    }catch(err){
        return err
    }
}



module.exports = jwtAuth