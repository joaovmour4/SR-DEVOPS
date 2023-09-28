const { ObjectId } = require('mongodb')
const userSchema = require('../schemas/userSchema')
const passwordHash = require('../services/passwordHash')
const passwordCompare = require('../services/passwordCompare')

module.exports = class userController{
    static async newUser(req, res){
        try{
            const {userName, userPassword} = req.body

            const userData = {
                _id: new ObjectId(),
                userName:userName,
                userPassword: await passwordHash(userPassword)
            }

            const createdUser = await userSchema.create(userData)

            return res.status(200).json({message: 'Usuário cadastrado com sucesso.', createdUser})
        }
        catch(error){
            return res.status(400).json({message: error.message})
        }
    }

    static async getUsers(req, res){
        try{
            const user = await userSchema.find()

            return res.status(200).json({message: user})
        }
        catch(error){
            return res.status(400).json({message: error.message})
        }
    }

    static async loginUser(req, res){
        try{
            const {userName, userPassword} = req.body

            const userBD = await userSchema.find({userName:userName})
            const data = JSON.parse(userBD)

            const compare = await passwordCompare(userPassword, data.userPassword)

            if(compare){
                return res.status(200).json({message: 'Login efetuado com sucesso.', compare})
            }else{
                return res.status(300).json({message: 'Usuário ou senha incorretos.'})
            }
        }catch(error){
            return res.status(400).json({message: error.message})
        }
    }
}