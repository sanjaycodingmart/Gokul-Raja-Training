let jwt = require("jsonwebtoken");
let config = require("../config");
let middleware = require("../middleware");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "gokul",
  host: "localhost",
  database: "slack",
  password: "123",
  port: 5432
});
const logout = (request,response)=>{
  const email = request.body.email;
  pool.query("update chatusers set status='inactive' where email = $1",[email],(error,results)=>{
    if(error){
      throw error
    }
    response.status(200);
    console.log(email,"logged")
  })
}
const getUsers = (request, response) => {
  const email = request.query.email;
  const password = request.query.password;
  pool.query(
    "SELECT email,password,name FROM chatusers where email=$1 and password = $2",
    [email, password],
    (error, results) => {
      if (error) {
        throw error;
      }

      let reply = results.rows[0];
      let token = jwt.sign({ email: reply.email }, config.secret, {
        expiresIn: "24h" // expires in 24 hours
      });
      
      pool.query("update chatusers set status ='active' where email=$1",[email],(error,results)=>{
        if(error){
          throw error;
        }
        else{
          console.log(email,"LoggedIn")
        }
      })
      response.status(200).json({
        data: results.rows,
        token: token
      });
    }
  );
};
const getAllUsers = (request, response) => {
  const email = request.query.email;
  const password = request.query.password;
  pool.query("SELECT email,password,name,status FROM chatusers", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const geturl = (request, response) => {
const email = request.query.user;
console.log("Inside Url",email)
  pool.query("SELECT url FROM chatusers where email=$1",[email], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows[0]);
  });
};
const getAbout = (request, response) => {
  

  pool.query("SELECT url FROM chatusers", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const setAbout = (request, response) => {
  const {about,email} = request.body;

  pool.query("UPDATE chatusers set about =$1 where email =$2", [about,email], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200);
    console.log("About Added Successfully")
  });
};
const createUser = (request, response) => {
  console.log("RE",request.body)
  const { email, password, name ,url} = request.body.responseBody;
  const date = new Date();
  const updated_at = date;
  const created_at = date;
  const status = "active";
  pool.query(
    "INSERT INTO chatusers (email,password,name,created_at,updated_at,status,url) VALUES ($1, $2 ,$3,$4,$5,$6,$7)",
    [email, password, name, created_at, updated_at, status,url],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200);
      
      console.log("User Added to Database");
      return true;
    }
  );
};
// const updateUser = (request, response) => {
//   const id = parseInt(request.params.id)
//   const { name, email } = request.body

//   pool.query(
//     'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//     [name, email, id],
//     (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`User modified with ID: ${id}`)
//     }
//   )
// }

// const deleteUser = (request, response) => {
//   const id = parseInt(request.params.id)

//   pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`User deleted with ID: ${id}`)
//   })
// }
const getGroupMsg = (request, response) => {
  console.log("group called");
  pool.query("SELECT * FROM chatgroup", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const sendGroupMsg = (data) => {
  const email = data.email;
  const message = data.message;
  const date = new Date();
  const created_at = date;
  pool.query(
    "INSERT INTO chatgroup (email,message,created_at) VALUES ($1, $2 ,$3)",
    [email, message, created_at],
    (error, results) => {
      // if (error) {
      //   throw error;
      // }
      console.log("Group Message Added to Database");
    }
  );
};

const sendIndMsg = (data) => {
  console.log("Individual Messsage sent");
  console.log("Res",data)
  const { sender, receiver, message } = data;
  const date = new Date();
  const updated_at = date;
  const created_at = date;
  const status = "active";
  pool.query(
    "INSERT INTO chatdb (sender,receiver,message,created_at,updated_at,status) VALUES ($1, $2 ,$3,$4,$5,$6)",
    [sender, receiver, message, created_at, updated_at, status],
    (error, results) => {
      if (error) {
        throw error;
      }
      
    }
  );
};
const getChatMsg = (request, response) => {
  console.log("Receiving Chat Messages");
  const sender = request.query.sender;
  const receiver = request.query.receiver;
  pool.query(
    "select sender,receiver,message from chatdb where (sender= $1 and receiver=$2) or (receiver=$1 and sender=$2) ORDER BY created_at asc",
    [sender, receiver],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
module.exports = {
  getUsers,
  createUser,
  getAllUsers,
  getGroupMsg,
  sendGroupMsg,
  sendIndMsg,
  getChatMsg,
  logout,
  getAbout,
  setAbout,
  geturl
};
