const { ObjectId } = require("mongodb")
const purchaseSchema = require("../schemas/purchaseSchema")
const userSchema = require("../schemas/userSchema")

module.exports = class purchaseController{
    static async newPurchase(req, res){
        try{
            var {quantity} = req.body
            var value = 0
            if(res.user.userSubsidio){
                value = 2
                quantity = 1
            }else{
                value = quantity*13
            }
            const purchaseDoc = {
                _id: new ObjectId(),
                userId: res.user._id,
                quantity: quantity,
                value: value,
                purchaseDate: new Date(Date.now())
            }
            const purchase = await purchaseSchema.create(purchaseDoc)
            if(purchase){
                const user = await userSchema.findByIdAndUpdate(res.user._id, 
                    {$push: {"userPurchases": purchaseDoc._id}})
                return res.status(200).json({message: "Compra realizada com sucesso", purchase})
            }
        }
        catch(error){
            return res.status(400).json({message:error.message})
        }
    }
}