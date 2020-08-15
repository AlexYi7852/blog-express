const express = require('express');
const router = express.Router();
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', function(req, res, next) {
    const { username, password } = req.body
    const result = login(username, password)
    return result.then(row => {
        if (row.username) {
            // 设置 session
            req.session.username = row.username
            req.session.realname = row.realname
            res.json(new SuccessModel())
            return
        }
        res.json(new ErrorModel('登陆失败'))
    })
});

module.exports = router;
