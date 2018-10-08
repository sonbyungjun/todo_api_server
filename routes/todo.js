var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next){
    var data = [
        {
            title : '장보기',
            regDate : '2018-10-08 13:00',
            do : {
                isDo : false,
                doDate : false
            },
            author : 1,
            address : '경기도 성남시 ㅇㅇㅇ ㅇㅇㅇ 마트',
            tags : [1, 3, 6],
            memo : 'ㅇㅇㅇ서 ㅇㅇㅇ랑 ㅇㅇㅇ장보기'
        },
        {
            title : '장보기',
            regDate : '2018-10-08 13:00',
            do : {
                isDo : false,
                doDate : false
            },
            author : 1,
            address : '경기도 성남시 ㅇㅇㅇ ㅇㅇㅇ 마트',
            tags : [1, 3, 6],
            memo : 'ㅇㅇㅇ서 ㅇㅇㅇ랑 ㅇㅇㅇ장보기'
        },
        {
            title : '장보기',
            regDate : '2018-10-08 13:00',
            do : {
                isDo : false,
                doDate : false
            },
            author : 1,
            address : '경기도 성남시 ㅇㅇㅇ ㅇㅇㅇ 마트',
            tags : [1, 3, 6],
            memo : 'ㅇㅇㅇ서 ㅇㅇㅇ랑 ㅇㅇㅇ장보기'
        }
    ]
    res.json(data)
})

module.exports = router;