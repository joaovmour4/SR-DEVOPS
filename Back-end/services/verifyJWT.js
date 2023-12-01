const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')

async function verifyJWT(req, res, next){
    try{
        if(req.headers['authorization']){
            const token = req.headers['authorization'].split(' ')[1]
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
                if(err)
                    return res.status(500).json({message: 'Token expirado, realize o login novamente.'})
                
                res.user = {
                    _id: decoded._id,
                    userCargo: decoded.userCargo,
                    userSubsidio: decoded.userSubsidio
                }
                next()
            })

        }else{
            return res.status(401).json({message: 'Nenhum token de autenticação fornecido.'})
        }
    }catch(err){
        return res.status(400).json({message: err.message})
    }
}

module.exports = verifyJWT