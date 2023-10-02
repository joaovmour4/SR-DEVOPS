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
            if(userBD.length === 0)
                return res.status(401).json({message: 'Usuário não encontrado.'})

            const compare = await passwordCompare(userPassword, userBD[0].userPassword)


            if(compare){
                return res.status(200).json({message: 'Login efetuado com sucesso.'})
            }else{
                return res.status(401).json({message: 'Usuário ou senha incorretos.'})
            }
        }catch(error){
            return res.status(400).json({message: error.message})
        }
    }

    static async deleteUser(req, res){
        try{
            const {_id} = req.body
            const user = await userSchema.find({_id:_id})

            if(user){
                const userDelete = await userSchema.deleteOne({_id:_id})
                if(userDelete.deletedCount !== 0){
                    return res.status(200).json({message:'O usuário foi deletado com sucesso.'})
                }else{
                    return res.status(400).json({message: 'Não foi possivel deletar o usuário.'})
                }
            }
        }
        catch(error){
            return res.status(400).json({message: error})
        }
    }

    static async updateUser(req, res){
        try{
            const {userName, userPassword} = req.body

            const userNewData = {
                userName: userName,
                userPassword: await passwordHash(userPassword)
            }
            const updateUser = await userSchema.updateOne(userNewData)

            return res.status(200).json({message: 'Dados do usuário atualizados com sucesso.', updateUser})
        }   
        catch(error){
            return res.status(400).json({message: error.message})
        }
    }
}   