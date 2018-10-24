var express = require('express');
var app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var cookieParser = require('cookie-parser');
app.use(cookieParser());

const jwt = require('jsonwebtoken');
app.set('jwt-secret', 'flskjflsldkfj'); // 암호화 키



// 크로스 오리진 허용
app.use((req, res, next)=>{ 
    var allowOrigins = ['http://localhost']
    var origin = req.headers.origin;
    if(allowOrigins.indexOf(origin) !== -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', true);
    }
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With,x-access-token');
    res.header('Access-Control-Allow-Credentials', true);
    next();
})


app.use(express.static("./publics"));


var userDAO = require('./models/dao/userDAO')
app.use((req, res, next)=>{
    const token = req.cookies.token
    if(!token) return next();
                       // 암호화 방법 검증
    jwt.verify(token, req.app.get('jwt-secret'), (err, decoded)=>{
        if(err || !decoded) return next()
        userDAO.findOne(decoded.user_id, (err, user) => {
            if (err || !user) return next();
            delete user.pw;
            req.user = user;
            return next();
        })
    })
})

var user = require("./routes/user");
var todo = require("./routes/todo");
app.use("/api/user", user);
app.use("/api/todo", todo);


// error 처리...
// err 파라미터가 있으면 다른 미들웨어는 건너 뛰고 바로 이 미들웨어로 온다.
app.use(function (err, req, res, next) {
	res.writeHead(500, {"Content-Type" : "text/html; charset=utf-8"})
	console.error(err);
	res.json({
        success : false,
        messeage : err.messeage
    })
});

app.listen(3000, function () {
    console.log('3000번 포트 구동중...');
  });

