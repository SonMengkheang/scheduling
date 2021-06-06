import CryptoAES from 'crypto-js/aes'
import CryptoENC from 'crypto-js/enc-utf8'

const SECRET_KEY = "qwmxflyfhrelssaaaxxxzzryrqwwe==wwwww"

const encryptPayload = token => {
    let cipherText = CryptoAES.encrypt(token, SECRET_KEY)
    return cipherText.toString()
}

const decryptPayload = encryptToken => {
    if (encryptToken) {
        let _cipherText = CryptoAES.decrypt(encryptToken.toString(), SECRET_KEY)
        return _cipherText.toString(CryptoENC)
    }
}
  
export {
    encryptPayload,
    decryptPayload
}