async function fieldVerify(field){
    try{
        if(field.match(/[^a-zA-Z0-9]/g))
            return true
        return false
    }catch(err){
        return err
    }
}

module.exports = fieldVerify