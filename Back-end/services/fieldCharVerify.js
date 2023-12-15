async function fieldCharVerify(field){
    return field.match(/[^\w\s]/g)
}

module.exports = fieldCharVerify