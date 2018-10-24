var express = require('express');
var router = express.Router();


var userDAO = require('../models/dao/userDAO');
var todoDAO = require('../models/dao/todoDAO');


router.get('/', function(req, res, next){
    todoDAO.list(req.user.no, function(err, result){
        if(err) return next(err)
        res.json({success:true, todos:result})
    })
})


router.post('/', function(req, res, next){
    if (!req.user || !req.body.content) return next(new Error('올바른 접근이 아닙니다.'))
    var params = {
        writer : req.user.no,
        content : req.body.content
    }
    todoDAO.add(params, function(err, result){
        if(err) return next(err)
        res.json({success:true, insertId : result.insertId})
    })
})

router.post('/done', function(req, res, next){
    todoDAO.done([req.body.done, req.body.no], function(err, result){
        if(err) return next(err)
        res.json({success:true})
    })
})


module.exports = router;