var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {
  res.json({
      ERR_NO: 0,
      data: [1, 2, 3]
  })
});

router.get('/detail', function(req, res, next) {
    res.json({
        ERR_NO: 0,
        data: 'detail'
    })
  });

module.exports = router;
