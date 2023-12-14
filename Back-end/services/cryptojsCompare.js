const CryptoJS = require('crypto-js')

async function passwordCompare(plainPassword, hashedPassword){
    const hash = CryptoJS.HmacSHA256(plainPassword, "secret");
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    return hashInBase64 === hashedPassword
}

module.exports = passwordCompare