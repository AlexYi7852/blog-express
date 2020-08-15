

const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')
// 创立链接对象
const con = mysql.createConnection(MYSQL_CONFIG)
// 开始链接
con.connect()
// 统一执行 sql 语句的函数
function exec (sql) {
    return new Promise((reslove, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            reslove(result)
        })
    })
}

module.exports = { exec, escape: mysql.escape }