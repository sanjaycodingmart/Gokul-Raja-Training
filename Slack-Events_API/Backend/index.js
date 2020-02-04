const express = require("express")
const http = require("http");
var cors = require('cors')
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const app = express()
app.use(cors())
const server =http.createServer(app)
const io = socketIo(server);
io.origins("*:*")
app.io = io


app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
    );
    next();
  });
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
const port = process.env.PORT || 4001;
server.listen(port, () => console.log(`Listening on port ${port}`));
app.post("/",(request,response)=>{
    console.log(request.body.event.channel)
    let message=request.body.event.text;
    
      request.app.io.emit(request.body.event.channel,request.body.event)
    response.send({
        "challenge":request.body.challenge
    })
        console.log(request.body.event)
       
  })
