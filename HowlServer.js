var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var os = require('os');
var interfaces = os.networkInterfaces();

var port = 3000

var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

console.log( "현재 서버주소 : "  +  addresses + ":" + port);

app.use(bodyParser.urlencoded({extended: false}))
app.route('/howl')
    .get((req, res) => {
        console.log(req.query)
        res.send({"result": "현재 호출한 부분은 Get"})
    })
    .post((req, res) => {
        console.log(req.body)
        res.send({"result": "현재 호출한 부분은 Post"})
    })

app.route('/howl/:id')
    .get((req, res) => {
        console.log("읽을 내용 PrimaryKey : " + req.params.id)
        res.send({"result": "현재 호출한 부분은 Get Param"})
    })
    .put((req, res) => {
        console.log("수정할 내용 PrimaryKey : " + req.params.id)
        console.log(req.body)
        res.send({"result": "현재 호출한 부분은 Update"})
    })
    .delete((req, res) => {
        console.log("삭제할 내용 PrimaryKey: " + req.params.id)
        res.send({"result": "현재 호출한 부분은 Delete"})
    })

app.listen(3000)