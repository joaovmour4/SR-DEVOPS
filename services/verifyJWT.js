const jwt = require('jsonwebtoken')

async function verifyJWT(token){
    try{
        if(!token)
        return {auth: false, message: 'No token provided'}

        const decoded = jwt.verify(token, 'tokenPassword')

        return {auth: true, decoded}
    }catch(err){
        return {auth: false}
    }
}


module.exports = verifyJWT