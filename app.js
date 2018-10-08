var express = require('express');
var app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static("./publics"));

var todo = require("./routes/todo");
app.use("/api/todo", todo);

// error 처리...
// err 파라미터가 있으면 다른 미들웨어는 건너 뛰고 바로 이 미들웨어로 온다.
app.use(function (err, req, res, next) {
	res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"})
	console.error(err);
	res.end("<h1>오류!</h1>")
});

app.listen(3000, function () {
    console.log('3000번 포트 구동중...');
  });

