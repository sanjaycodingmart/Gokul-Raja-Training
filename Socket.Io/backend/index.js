const db = require("./queries");
const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const multer = require("multer");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const middleware = require("./middleware");
const bodyParser = require("body-parser");
const router = express.Router();
const assert = require("assert");
const PORT = process.env.PORT || 3005;
io.origins("*:*");
app.set("port", process.env.PORT || 8080);
router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});
io.on("connection", socket => {
  console.log("New client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});
io.on("group", socket => {
  console.log("Group Connected");
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static("./public"));
app.use(function(req, res, next) {
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
  );

  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});





app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});

app.get("/users", db.getUsers);
app.get("/geturl", db.geturl);
app.get("/group", middleware.checkToken, db.getGroupMsg);
app.post("/createUser", db.createUser);
app.post("/sendgroupmsg", middleware.checkToken, db.sendGroupMsg);
app.post("/sendIndmsg", middleware.checkToken, db.sendIndMsg);
app.get("/getchatmsg", middleware.checkToken, db.getChatMsg);
app.get("/getall", middleware.checkToken, db.getAllUsers);
app.post("/logout", middleware.checkToken, db.logout);
app.get("/getabout", db.getAbout);

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
module.exports = router;
