const { ObjectId } = require('mongodb')
const userSchema = require('../schemas/userSchema')

module.exports = class userController{
    static async newUser(req, res){
        try{
            const {userName, userPassword} = req.body

            const userData = {
                userName:userName,
                userPassword:userPassword,
                _id: new ObjectId()
            }

            const createdUser = await userSchema.create(userData)

            return res.status(200).json({message: 'Usuário cadastrado com sucesso.', createdUser})
        }
        catch(error){
            return res.status(400).json({message: error.message})
        }
    }

    static async getUser(req, res){
        try{
            const {id} = req.params

            const user = await userSchema.findById(id)

            return res.status(200).json({message: user})
        }
        catch(error){
            return res.status(400).json({message: error.message})
        }
    }
}