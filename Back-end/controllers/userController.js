const { ObjectId } = require('mongodb')
const userSchema = require('../schemas/userSchema')
const purchaseSchema = require('../schemas/purchaseSchema')
// const passwordHash = require('../services/passwordHash')
// const passwordCompare = require('../services/passwordCompare')
const cryptojs = require('../services/cryptojs')
const cryptojsCompare = require('../services/cryptojsCompare')
const jwtAuth = require('../services/jwtAuth')
const fieldVerify = require('../services/fieldVerify')
const fieldReplace = require('../services/fieldReplace')
const sanitize = require('mongo-sanitize')

module.exports = class userController{
    static async newUser(req, res){
        try{
            // #swagger.tags = ['Usuário']

            const {userName, userEmail, userPassword} = req.body
            const userNameStr = String(userName)
            const userEmailStr = String(userEmail)
            const userPasswordStr = String(userPassword)
            
            if(await fieldVerify(userNameStr))
                return res.status(400).json({message: "O nome de usuário não pode conter caracteres especiais."})
                
            if(!await fieldVerify(userPasswordStr))
                return res.status(400).json({message: "A senha deve conter caracteres especiais"})

            const userData = {
                _id: new ObjectId(),
                userName:userNameStr,
                userEmail: userEmailStr,
                userPassword: await cryptojs(userPasswordStr),
                userSubsidio: false,
                userCargo: 'user'
            }

            if(await userSchema.findOne({userName:userNameStr}))
                return res.status(400).json({message: 'O nome de usuário já existe.'})
            const createdUser = await userSchema.create(userData)

            return res.status(200).json({message: 'Usuário cadastrado com sucesso.', createdUser})
        }
        catch(error){
            return res.status(400).json({message: error.message})
        }
    }

    static async getUsers(req, res){
        try{
            /* 
            #swagger.tags = ['Admin']
            #swagger.security = [{
            "bearerAuth": []
            }] */

            if(res.user.userCargo === 'user')
                return res.status(401).json({message: 'Unauthorized.'})
            
            const users = await userSchema.find()
            return res.status(200).json({message: users})
        }
        catch(error){
            return res.status(400).json({message: error.message})
        }
    }

    static async login(req, res){
        try{
            // #swagger.tags = ['Autenticação']
            const {userName, userPassword} = req.body

            const sanUserName = sanitize(userName)

            const userBD = await userSchema.findOne({userName:sanUserName})
            if(!userBD)
                return res.status(401).json({message: 'Usuário não encontrado.'})

            const compare = await cryptojsCompare(userPassword, userBD.userPassword)


            if(compare){
                const jwtToken = await jwtAuth(userBD)
                return res.status(200).json({
                    message: 'Login efetuado com sucesso.',
                    user: {
                    jwtToken: jwtToken
                }})
            }else{
                return res.status(401).json({message: 'Usuário ou senha incorretos.'})
            }



        }catch(error){
            return res.status(400).json({message: error.message})
        }
    }

    static async deleteUser(req, res){
        try{
            /* 
            #swagger.tags = ['Admin']
            #swagger.security = [{
            "bearerAuth": []
            }] */

            if(res.user.userCargo !== 'admin')
                return res.status(401).json({message: 'Unauthorized.'})

            const {id} = req.params
            const user = await userSchema.find({_id:id})

            if(user){
                const userDelete = await userSchema.deleteOne({_id:id})
                if(userDelete.deletedCount !== 0){
                    return res.status(200).json({message: 'O usuário foi deletado com sucesso.'})
                }else{
                    return res.status(400).json({message: 'Não foi possivel deletar o usuário.'})
                }
            }
        }
        catch(error){
            return res.status(400).json({message: error})
        }
    }

    static async modifyAnyUser(req, res){
        try{
            /* 
            #swagger.tags = ['Admin']
            #swagger.security = [{
            "bearerAuth": []
            }] */

            if(res.user.userCargo !== 'admin'){
                return res.status(401).json({message: 'Unauthorized.'})
            }
                
            const userId = String(req.params.id)


            const {userName, userEmail, userPassword, userSubsidio} = req.body

            if(await fieldVerify(userName))
                return res.status(400).json({message: "O nome de usuário não pode conter caracteres especiais."})

            const userNewData = {
                userName: userName,
                userEmail: userEmail,
                userPassword: await passwordHash(userPassword),
                userSubsidio: userSubsidio
            }
            const updateUser = await userSchema.updateOne({_id:userId}, userNewData)

            if(updateUser.modifiedCount !== 0){
                return res.status(200).json({message: 'Dados do usuário atualizados com sucesso.', updateUser})
            }else{
                return res.status(400).json({message: 'Não houve alterações nos dados', updateUser})
            }
        }   
        catch(error){
            return res.status(400).json({message: error.message})
        }
    }

    static async modifyCurrentUser(req, res){
        try{
            /* 
            #swagger.tags = ['Usuário']
            #swagger.security = [{
            "bearerAuth": []
            }] */

                
            const {userName, userEmail, userPassword} = req.body

            if(await fieldVerify(userName))
                return res.status(400).json({message: "O nome de usuário não pode conter caracteres especiais."})
            
            if(await userSchema.findOne({userName:String(userName)}) && userName !== res.user.userName)
                return res.status(400).json({message: 'O nome de usuário já existe.'})

            const userNewData = {
                userName: userName,
                userEmail: userEmail,
                userPassword: await passwordHash(userPassword)
            }
            const updateUser = await userSchema.updateOne({_id:res.user._id}, userNewData)

            if(updateUser.modifiedCount !== 0){
                return res.status(200).json({message: 'Dados do usuário atualizados com sucesso.', updateUser})
            }else{
                return res.status(400).json({message: 'Não houve alterações nos dados', updateUser})
            }
        }   
        catch(error){
            return res.status(400).json({message: error.message})
        }
    }

    static async currentUserPurchases(req, res){
        try{
            /* 
            #swagger.tags = ['Usuário']
            #swagger.security = [{
            "bearerAuth": []
            }] */
            
            const user = await userSchema.findById(res.user._id)
            const purchases = []

            for(let key in Object.keys(user.userPurchases)){
                let currentPurchase = await purchaseSchema.findById(user.userPurchases[key])
                purchases.push(currentPurchase)
            }
            return res.status(200).json({message: purchases})
        }
        catch(error){
            return res.status(400).json({message:error.message})
        }   
    }
}   