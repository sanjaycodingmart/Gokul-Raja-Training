const express = require("express")
const http = require("http");
const bodyParser = require("body-parser");
const app = express()
const server =http.createServer(app)
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
const port = process.env.PORT || 4001;
server.listen(port, () => console.log(`Listening on port ${port}`));
app.post("/",(request,response)=>{
    console.log("hit!!!")
    response.send(request.query.challenge)
})