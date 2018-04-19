const express = require('express');
const router = express.Router();
const checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin 登陆页
router.get('/', checkNotLogin, function (req, res, next) {
   res.send('登陆页')
});

// POST /signin 用户登陆
router.post('/', checkNotLogin, function(req, res, next){
   res.send('登陆')
});

module.exports = router;