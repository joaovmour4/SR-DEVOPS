const { ObjectId } = require("mongodb")
const pratoSchema = require("../schemas/pratoSchema")
const fieldVerify = require("../services/fieldVerify")

module.exports = class pratoController{
    static async newPrato(req, res){
        try{
            /* 
            #swagger.tags = ['Prato']
            #swagger.security = [{
            "bearerAuth": []
            }] */

            if(res.user.userCargo !== 'admin')
                return res.status(401).json({message: 'Unauthorized'})
            
            const {prato, pratoType} = req.body

            if(await fieldVerify(userName))
                return res.status(400).json({message: "O nome de prato não pode conter caracteres especiais."})

            if(await pratoSchema.findOne({prato:prato}))
                return res.status(400).json({message: 'O prato já existe.'})

            const pratoDoc = {
                _id: new ObjectId(),
                prato: prato,
                pratoType: pratoType
            }

            const newPrato = await pratoSchema.create(pratoDoc)
            if(!newPrato)
                return res.status(400).json({message: 'Não foi possível inserir o prato.'})
            
            return res.status(200).json({message: 'Prato inserido com sucesso.', newPrato})

        }
        catch(error){
            return res.status(400).json({message:error.message})
        }
    }
    static async getPratos(req, res){
        try{
            /* 
            #swagger.tags = ['Prato']
            #swagger.security = [{
            "bearerAuth": []
            }] */

            if(res.user.userCargo !== 'admin')
                return res.status(401).json({message: 'Unauthorized'})
            
            const pratos = await pratoSchema.find()
            return res.status(200).json({message: pratos})

        }
        catch(error){
            return res.status(400).json({message:error.message})
        }
    }
}