const { ObjectId } = require("mongodb")
const pratoSchema = require("../schemas/pratoSchema")
const fieldCharVerify = require("../services/fieldCharVerify")

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
            
            const prato = String(req.body.prato)
            const pratoType = String(req.body.pratoType)

            if(await fieldCharVerify(prato) || await fieldCharVerify(pratoType))
                return res.status(401).json({message: "O nome do prato não pode conter caracteres especiais"})

            if(await pratoSchema.findOne({prato:prato}))
                return res.status(401).json({message: 'O prato já existe.'})

            const newPrato = await pratoSchema.create({
                _id: new ObjectId(),
                prato: prato,
                pratoType: pratoType
            })
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

            if(res.user.userCargo === 'user')
                return res.status(401).json({message: 'Unauthorized'})
            
            const pratos = await pratoSchema.find()
            return res.status(200).json({message: pratos})

        }
        catch(error){
            return res.status(400).json({message:error.message})
        }
    }

    static async modifyPrato(req, res){
        try{
            /* 
            #swagger.tags = ['Prato']
            #swagger.security = [{
            "bearerAuth": []
            }] */

            if(res.user.userCargo === 'user'){
                return res.status(401).json({message: 'Unauthorized.'})
            }
                
            const pratoId = String(req.params.id)


            const {prato, pratoType} = req.body

            if(await fieldCharVerify(prato) || await fieldCharVerify(pratoType))
                return res.status(401).json({message: "O nome do prato não pode conter caracteres especiais"})

            if(await pratoSchema.findOne({prato: String(prato)}))
                return res.status(401).json({message: 'Este prato já existe.'})

            const pratoNewData = {
                prato: prato,
                pratoType: pratoType
            }
            const updatePrato = await pratoSchema.findByIdAndUpdate(String(pratoId), pratoNewData)

            if(updatePrato)
                return res.status(200).json({message: 'Dados do prato atualizados com sucesso.', updatePrato})
            else
                return res.status(400).json({message: 'Não houve alterações nos dados'})
            
        }   
        catch(error){
            return res.status(400).json({message: error.message})
        }
    }

    static async deletePrato(req, res){
        try{
            /* 
            #swagger.tags = ['Prato']
            #swagger.security = [{
            "bearerAuth": []
            }] */

            if(res.user.userCargo === 'user')
                return res.status(401).json({message: 'Unauthorized.'})

            const {id} = req.params

            const deletedPrato = await pratoSchema.findByIdAndRemove(String(id))

            if(deletedPrato)
                return res.status(200).json({message: "Prato removido com sucesso.", deletedPrato})
            return res.status(400).json({message: 'O prato não foi encontrado.'})
        }catch(err){
            return res.status(500).json({message: err.message})
        }
    }
}