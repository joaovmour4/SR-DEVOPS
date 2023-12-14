async function fieldReplace(field){
    try{
        return field.replace(/[^a-zA-Z0-9]/g, "")
    }catch(err){
        return err
    }
}

module.exports = fieldReplace