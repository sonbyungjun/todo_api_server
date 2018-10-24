var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

var userDAO = require('../models/dao/userDAO');

router.get('/me', (req, res, next)=>{
    console.log("ddddd")

    if(req.user) return res.json({success : true, user : req.user})
    else return res.json({success : false})
})

router.post('/login', (req, res, next)=>{
    console.log("ddddd")

    if(!req.body.id || !req.body.pw) return next(new Error ('값을 입력하세요.')); // 에러 객체를 만듬
    userDAO.login([req.body.id, req.body.pw], (err, user)=>{
        if(err) return next(err);
        if(!user) return res.json({success : false})

        jwt.sign(
            {
                user_id : user.id
            },
            req.app.get('jwt-secret'),  
            {
                expiresIn : '1y',
                issuer : 'byungjun.com',
                subject : 'user_id'
            },
            (err, token) => {
                if(req.body.keep){
                    res.cookie('token', token, {httpOnly: true, expires : new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 12)}); // 1. 키 2. 값 3. 옵션
                }else{
                    res.cookie('token', token, {httpOnly: true});
                }
                return res.json({success : true, token : token});

            }
        )

    });
})

module.exports = router;