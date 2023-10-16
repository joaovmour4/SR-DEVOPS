const jwt = require('jsonwebtoken')

async function verifyJWT(req, res, next){
    try{
        if(req.headers['authorization']){
            const token = req.headers['authorization'].split(' ')[1]
            const decoded = jwt.verify(token, 'tokenPassword')

            if(decoded.userID){
                res.userID = decoded.userID
                next()
            }
            else
                return res.status(401).json({message: 'A autenticação falhou.'})
        }else{
            return res.status(401).json({message: 'Nenhum token de autenticação fornecido.'})
        }
    }catch(err){
        return res.status(400).json({message: err.message})
    }
}

module.exports = verifyJWT