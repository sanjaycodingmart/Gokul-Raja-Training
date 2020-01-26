const express = require("express");
const db = require("./models/postgres");
const middleware = require("./middleware");
const http = require("http");
const bodyParser = require("body-parser");
const multer = require("multer");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const router = express.Router();
app.use(express.static("./public"));
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
router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});
io.origins("*:*")
let individualChat = io.of("/individual").on("connection",(socket)=>{
  
  socket.on("unique ,",(data)=>{
    socket.on(data,(msg)=>{
      console.log("Dataaa",data,msg)
      socket.broadcast.emit(data,msg)
      
    })
  })

})
var individualMessageSend = io.on("connection",function(socket){
  socket.on("send individual message",(data)=>{
    let req ={
      sender : data.sender,
      receiver : data.receiver,
      message : data.message
    }
    db.sendIndMsg(req)
  })
})
var chat = io.of("/group").on("connection", function(socket) {
    socket.on("send group message",(data)=>{
    let email = data.email;
    let message=data.message;
    let groupname=data.group;
    console.log("Email",email);
    console.log("Message",message);
    let req = {
      message:message,
      email:email,
      group:groupname
    }
    db.sendGroupMsg(req)
  })
  socket.on("group",(data)=>{
    socket.on(data,(msg)=>{
      console.log("Dataaa",data,msg)
      socket.broadcast.emit(data,msg)
      
    })
  })
  // chat.emit("a message", {
  //   everyone: "in",
  //   "/chat": "will get"
  // });
});
io.on("connection", socket => {
  console.log("New client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
  socket.emit("app", { hello: "app" });
  socket.emit("group", { Group: "called" });
});
const getgroup = val => {
  let grp = db.getGroupMsg();
  return grp;
};


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    console.log("File", file);
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  }
});
var upload = multer({ storage: storage });
app.post("/fileUpload", upload.single("image"),(req, res, next) => {
  console.log("Req", req.body, req.file.path);
  if (req.file) {
    res.json(req.file);
  }
});
server.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = router;




//Routes and Respective Queries
app.get("/users", db.getUsers);
app.get("/geturl", db.geturl);
app.get("/group", middleware.checkToken, db.getGroupMsg);
app.post("/addgroup", db.addNewGroup);
app.post("/createUser", db.createUser);
app.post("/addusergroup",db.addUserGroups);
app.post("/sendgroupmsg", middleware.checkToken, db.sendGroupMsg);
app.post("/sendIndmsg", middleware.checkToken, db.sendIndMsg);
app.get("/getchatmsg", middleware.checkToken, db.getChatMsg);
app.get("/getall", middleware.checkToken, db.getAllUsers);
app.post("/logout", middleware.checkToken, db.logout);
app.get("/getabout", db.getAbout);
app.post("/setabout",db.setAbout)
app.get("/getusergroups",db.getUserGroupName)