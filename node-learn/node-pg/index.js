const db = require('./queries')
const multer = require('multer');
const express = require('express')
const middleware = require('./middleware')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router();
const assert = require('assert');

const port = 3005

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
  
)
app.use(function (req, res, next) {
  /*var err = new Error('Not Found');
   err.status = 404;
   next(err);*/

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })
  app.get('/active.png',(request,response)=>{
    response.json({
      image:"asd"
      
    })
  })


  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
  app.get('/users', db.getUsers)
  app.get('/group',middleware.checkToken,db.getGroupMsg)
  app.post('/createUser',db.createUser)
  app.post('/sendgroupmsg',middleware.checkToken,db.sendGroupMsg)
  app.post('/sendIndmsg',middleware.checkToken,db.sendIndMsg)
  app.get('/getchatmsg',middleware.checkToken,db.getChatMsg)
  app.get('/getall',middleware.checkToken,db.getAllUsers)
  app.post('/logout',middleware.checkToken,db.logout)
  app.get('/getabout',db.getAbout)

  

  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({storage: storage});
router.post('/fileUpload', upload.single('image'), (req, res, next) => {
        res.json({'message': 'File uploaded successfully'});
       
    
});
module.exports = router;
// var insertDocuments = function(db, filePath, callback) {
//     var collection = db.collection('user');
//     collection.insertOne({'imagePath' : filePath }, (err, result) => {
//         assert.equal(err, null);
//         callback(result);
//     });
// }