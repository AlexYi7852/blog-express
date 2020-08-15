
const env = process.env.NODE_ENV // 环境变量

let MYSQL_CONFIG
let REDIS_CONFIG
if (env === 'dev') {
    // 开发环境配置
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'Alex001573',
        port: '3306',
        database: 'myBlog'
    }
    REDIS_CONFIG = {
        port: 6379,
        host: '127.0.0.1'
    }
}
if (env === 'prodution') {
    // 线上环境配置
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'Alex001573',
        port: '3306',
        database: 'myBlog'
    }
    REDIS_CONFIG = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = { MYSQL_CONFIG, REDIS_CONFIG }