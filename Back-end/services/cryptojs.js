const CryptoJS = require('crypto-js')

async function passwordHash(password){
    const hash = CryptoJS.HmacSHA256(password, "secret");
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    return hashInBase64
}

module.exports = passwordHash