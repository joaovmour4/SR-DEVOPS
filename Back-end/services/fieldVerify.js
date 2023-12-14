async function fieldVerify(field){
    try{
        return field.match(/[^a-zA-Z0-9]/g)
    }catch(err){
        return err
    }
}

module.exports = fieldVerify