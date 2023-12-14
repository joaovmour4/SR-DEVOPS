const menuSchema = require('../schemas/menuSchema')
const { ObjectId } = require("mongodb")

module.exports = class{
    static async newMenu(req, res){
        try{
            /* 
            #swagger.tags = ['Cardápio']
            #swagger.security = [{
            "bearerAuth": []
            }] */

            if(res.user.userCargo === 'user')
                return res.status(401).json({message: 'Unauthorized'})

            const diaSemana = String(req.body.diaSemana)
            const pratoComum = String(req.body.pratoComum)
            const pratoVegetariano = String(req.body.pratoVegetariano)
            const acompanhamentos = req.body.acompanhamentos.replace(/[\[\]\s]/g, "").split(',')

            if(await menuSchema.findOne({diaSemana: diaSemana}))
                return res.status(400).json({message: 'Já existe um cadastro para este dia.'})

            const menu = await menuSchema.create({
                _id: new ObjectId(),
                diaSemana: diaSemana,
                pratoComum: pratoComum,
                pratoVegetariano: pratoVegetariano,
            })

            if(menu){
                for(let key in Object.keys(acompanhamentos)){
                    await menuSchema.findByIdAndUpdate(menu._id, {$push: {acompanhamentos: acompanhamentos[key]}})
                }
                return res.status(201).json({message: 'Cardápio inserido com sucesso.'})
            }
            return res.status(400).json({message: 'Ocorreu um erro ao inserir o cardápio.'})

        }catch(err){
            return res.status(500).json({message: err.message})
        }
    }
}