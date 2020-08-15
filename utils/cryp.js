
const cryp = require('crypto')

// 密匙
const SELECT_KEY = 'WJios___--7852#'
// md5 加密
function md5 (content) {
    let md5 = cryp.createHash('md5')
    return md5.update(content).digest('hex')
}
// 加密函数
function getPassword (password) {
    return md5(`password=${ password }&key=${ SELECT_KEY }`)
}

module.exports = { getPassword }