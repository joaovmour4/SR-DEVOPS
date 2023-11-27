const { ObjectId } = require("mongodb")
const pratoSchema = require("../schemas/pratoSchema")

module.exports = class pratoController{
    static async newPrato(req, res){
        try{
            /* 
            #swagger.tags = ['Prato']
            #swagger.security = [{
            "bearerAuth": []
            }] */

            if(res.user !== 'admin')
                return res.status(401).json({message: 'Unauthorized'})
            
            const {prato, pratoType} = req.body

            const pratoDoc = {
                prato: prato,
                pratoType: pratoType
            }

            const newPrato = await pratoSchema.create(pratoDoc)

        }
        catch(error){
            return res.status(400).json({message:error.message})
        }
    }
}