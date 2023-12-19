const menuSchema = require('../schemas/menuSchema')
const pratoSchema = require('../schemas/pratoSchema')
const { ObjectId } = require("mongodb")
const fieldCharVerify = require("../services/fieldCharVerify")

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

            if(await fieldCharVerify(diaSemana) || await fieldCharVerify(pratoComum) || await fieldCharVerify(pratoVegetariano))
                return res.status(401).json({message: "Os campos não podem conter caracteres especiais"})

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

    static async getMenu(req, res){
        try{
            /* 
            #swagger.tags = ['Cardápio']
            }] */

            const {diaSemana} = req.params
            if(await fieldCharVerify(diaSemana))
                return res.status(401).json({message: "Os campos não podem conter caracteres especiais"})

            const acomps = []
            const menu = await menuSchema.findOne({diaSemana:String(diaSemana)})
            if(menu){
                for(let key in Object.keys(menu.acompanhamentos)){
                    acomps.push(await pratoSchema.findById(menu.acompanhamentos[key]))
                }
                const menuDoc = {
                    _id: menu._id,
                    diaSemana: menu.diaSemana,
                    pratoComum: await pratoSchema.findById(menu.pratoComum),
                    pratoVegetariano: await pratoSchema.findById(menu.pratoVegetariano),
                    acompanhamentos: acomps
                }

                return res.status(200).json({message: menuDoc})
            }
        }catch(err){
            return res.status(500).json({message: err.message})
        }
    }

    static async updateMenu(req, res){
        try{
            /* 
            #swagger.tags = ['Cardápio']
            #swagger.security = [{
            "bearerAuth": []
            }] */

            if(res.user.userCargo === 'user')
                return res.status(401).json({message: 'Unauthorized'})

            const {diaSemana} = req.params
            const {pratoComum, pratoVegetariano} = req.body
            const acompanhamentos = req.body.acompanhamentos?.replace(/[\[\]\s]/g, "").split(',')

            if(await fieldCharVerify(diaSemana))
                return res.status(401).json({message: "Os campos não podem conter caracteres especiais"})

            if(!diaSemana)
                return res.status(400).json({message: 'Dia inválido'})

            const menu = await menuSchema.findOne({diaSemana:diaSemana})
            const menuUpdate = await menuSchema.findOneAndUpdate({diaSemana: diaSemana}, {
                pratoComum: pratoComum ? pratoComum:menu.pratoComum,
                pratoVegetariano: pratoVegetariano ? pratoVegetariano:menu.pratoVegetariano,
                acompanhamentos: acompanhamentos ? acompanhamentos:menu.acompanhamentos
            })

            if(menuUpdate)
                return res.status(200).json({message: 'Dados inseridos com sucesso.', menuUpdate})
            return res.status(400).json({message: 'Houve um erro na requisição.'})
        }catch(err){
            return res.status(500).json({message: err.message})
        }
    }
}