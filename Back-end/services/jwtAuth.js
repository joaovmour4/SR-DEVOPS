const jwt = require('jsonwebtoken')

async function jwtAuth(user){
    try{
        const userInfo = {
            _id: user._id, 
            userCargo: user.userCargo, 
            userSubsidio: user.userSubsidio
        }

        const token = jwt.sign(userInfo, 'tokenPassword', {
            expiresIn: '15m' // expira em 1 minutos
        })

        return {auth: true, token: token}
    }catch(err){
        return err
    }
}



module.exports = jwtAuth