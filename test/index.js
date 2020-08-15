
const express = require('../lib/express/like-express')

const app = express()

app.use((req, res, next) => {
    console.log('请求开始', req.method, req.url)
    next()
})

app.use((req, res, next) => {
    res.cookie = {
        userId: 'abc123'
    }
    next()
})

app.use((req, res, next) => {
    setTimeout(() => {
        res.body = {
            a: 100,
            b: 200
        }
        next()
    });
})

app.use('/api', (req, res, next) => {
    console.log('处理 api 路由')
    next()
})

app.get('/api', (req, res, next) => {
    console.log('get api 路由')
    next()
})

// 模拟登陆成功
function loginValid(req, res, next) {
    console.log('模拟登陆失败')
    setTimeout(() => {
        res.json({
            ERR_NO: -1,
            msg: '模拟登陆失败'
        })
        // next()
    })
}

app.get('/api/get-cookie', loginValid, (req, res, next) => {
    console.log('get /api/get-cookie')
    res.json({
        ERR_NO: 0,
        data: res.cookie
    })
})

app.post('/api', (req, res, next) => {
    console.log('post api 路由')
    next()
})

app.post('/api/get-post-data', (req, res, next) => {
    console.log('post /get-post-datae')
    res.json({
        ERR_NO: 0,
        data: res.body
    })
})

app.use((req, res, next) => {
    console.log('处理 404')
    res.json({
        ERR_NO: -1,
        msg: '404 Not Found'
    })
})

app.listen(8000, () => {
    console.log('Server is running on port 8000')
})