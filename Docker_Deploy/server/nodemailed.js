const nodemailer = require("nodemailer");
var fs = require("fs");
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gokulraja.sunairaja@codingmart.com",
    pass: "Gora@Coding3"
  }
});
const sendMail = (request, response) => {
if(request.body.group){
    fs.writeFile("test.txt", "EXPORTED CHAT IN GROUP "+request.body.group, function(err) {
        if (err) {
          console.log(err);
        }
      });
      request.body.chats.map((value)=>{
          
          let date=new Date(value.created_at).toDateString();
          let time = new Date(value.created_at).toLocaleTimeString();
          let string = date+"   "+ time+"    "+value.email +"    "+value.message
          fs.appendFile('test.txt', "\r\n"+string, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      })
}
else{
    fs.writeFile("test.txt", "EXPORTED CHAT WITH "+request.body.receiver, function(err) {
        if (err) {
          console.log(err);
        }
      });
      request.body.chats.map((value)=>{
          
          let date=new Date(value.created_at).toDateString();
          let time = new Date(value.created_at).toLocaleTimeString();
          let string = date+"   "+ time+"    "+value.sender +"    "+value.message
          fs.appendFile('test.txt', "\r\n"+string, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      })
}
 
  
  //   let file = fs.readFile("test.txt")
  let mailOptions = {
    from: "gokulraja.sunairaja@codingmart.com",
    to: request.body.email,
    subject: "Your Exported Chat",
    attachments: [
      {
        filename: "exportedChat.txt",
        path:"./test.txt"
      }
    ]
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  });
};
module.exports = {
  sendMail
};
